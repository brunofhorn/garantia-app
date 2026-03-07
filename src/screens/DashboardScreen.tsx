import { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { ApiError, DashboardSummary, Item, dashboardApi, itemsApi } from '../services';
import { daysUntil, parseDate } from '../utils/date';

type CriticalItem = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: keyof typeof Feather.glyphMap;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
};

type StatItem = {
  id: string;
  title: string;
  value: string;
  icon: keyof typeof Feather.glyphMap;
  iconColor: string;
};

type UpcomingItem = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  dot: string;
};

function formatShortDate(value?: string): string {
  const parsed = parseDate(value);
  if (!parsed) {
    return '--';
  }

  return parsed.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '').toUpperCase();
}

function getStatusTag(item: Item): string {
  const diff = daysUntil(item.expiryDate);

  if (diff === null) {
    return 'Sem data';
  }

  if (diff < 0 || item.status === 'EXPIRED') {
    return 'Expirado';
  }

  if (diff === 0) {
    return 'Vence hoje';
  }

  if (diff === 1) {
    return 'Vence em 1 dia';
  }

  return `Vence em ${diff} dias`;
}

function mapCriticalItem(item: Item): CriticalItem {
  const isExpired = item.status === 'EXPIRED' || (daysUntil(item.expiryDate) ?? 0) < 0;
  const isSoon = item.status === 'EXPIRING_SOON';

  return {
    id: item.id,
    title: item.title,
    subtitle: item.providerName ?? item.type,
    tag: getStatusTag(item),
    icon: isExpired ? 'alert-circle' : isSoon ? 'alert-triangle' : 'bell',
    iconColor: isExpired ? '#FF6B6B' : isSoon ? '#FFC93D' : '#19D6FF',
    badgeBg: isExpired ? '#2B1C2B' : isSoon ? '#2B2A1C' : '#122743',
    badgeText: isExpired ? '#FF6B6B' : isSoon ? '#F7C948' : '#19D6FF',
  };
}

function mapUpcomingItem(item: Item): UpcomingItem {
  const diff = daysUntil(item.expiryDate);
  const isExpired = item.status === 'EXPIRED' || (diff ?? 0) < 0;
  const isSoon = item.status === 'EXPIRING_SOON';

  return {
    id: item.id,
    title: item.title,
    subtitle: `${getStatusTag(item)} • ${item.type}`,
    date: formatShortDate(item.expiryDate),
    dot: isExpired ? '#FF5D5D' : isSoon ? '#F5B221' : '#7C8DA6',
  };
}

function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `R$ ${amount.toFixed(2)}`;
  }
}

function toStatItems(summary: DashboardSummary): StatItem[] {
  const total = summary.total ?? summary.totals?.total ?? 0;
  const active = summary.active ?? summary.totals?.active ?? 0;
  const expired = summary.expired ?? summary.totals?.expired ?? 0;
  const expiringSoon = summary.expiringSoon ?? summary.totals?.expiringSoon ?? 0;

  return [
    { id: 'api-total', title: 'TOTAL', value: String(total), icon: 'archive', iconColor: '#22D3EE' },
    { id: 'api-active', title: 'GARANTIA', value: String(active), icon: 'check-circle', iconColor: '#00D4FF' },
    { id: 'api-expired', title: 'EXPIRADAS', value: String(expired).padStart(2, '0'), icon: 'clock', iconColor: '#FF6B6B' },
    {
      id: 'api-expiring',
      title: 'EM BREVE',
      value: String(expiringSoon).padStart(2, '0'),
      icon: 'corner-down-right',
      iconColor: '#F7C948',
    },
  ];
}

function CriticalCard({ item }: { item: CriticalItem }) {
  return (
    <View className="mr-3 w-[220px] rounded-xl border border-[#26324A] bg-[#111C31] p-3.5">
      <View className="flex-row items-center justify-between">
        <Feather name={item.icon} size={18} color={item.iconColor} />
        <View className="rounded-md px-2 py-1" style={{ backgroundColor: item.badgeBg }}>
          <Text className="text-[11px] font-semibold" style={{ color: item.badgeText }}>
            {item.tag}
          </Text>
        </View>
      </View>
      <Text className="mt-3 text-[16px] font-bold text-[#F8FAFC]">{item.title}</Text>
      <Text className="mt-0.5 text-[13px] text-[#7D8FA8]">{item.subtitle}</Text>
    </View>
  );
}

function StatCard({ item }: { item: StatItem }) {
  return (
    <View className="mb-3 w-[48.5%] rounded-xl border border-[#26324A] bg-[#111C31] p-4">
      <Feather name={item.icon} size={19} color={item.iconColor} />
      <Text className="mt-3 text-[13px] tracking-[1.2px] text-[#7D8FA8]">{item.title}</Text>
      <Text className="mt-0.5 text-[28px] font-semibold text-[#F8FAFC]">{item.value}</Text>
    </View>
  );
}

export function DashboardScreen({ navigation }: { navigation: any }) {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [upcoming, setUpcoming] = useState<Item[]>([]);
  const [recentItem, setRecentItem] = useState<Item | null>(null);
  const [monthlyInvestment, setMonthlyInvestment] = useState('R$ 0,00');
  const [apiError, setApiError] = useState<string | null>(null);

  const loadDashboardData = useCallback(async () => {
    try {
      const [summaryResponse, upcomingResponse, recentResponse] = await Promise.all([
        dashboardApi.summary({
          retry: { enabled: true, retries: 1 },
        }),
        dashboardApi.upcoming(
          { limit: 8 },
          {
            retry: { enabled: true, retries: 1 },
          }
        ),
        itemsApi.list(
          {
            sortBy: 'updatedAt',
            sortOrder: 'desc',
            pageSize: 1,
          },
          {
            retry: { enabled: true, retries: 1 },
          }
        ),
      ]);

      setSummary(summaryResponse);
      setUpcoming(upcomingResponse.items.length ? upcomingResponse.items : summaryResponse.upcoming ?? []);
      setRecentItem(recentResponse.items[0] ?? null);

      const monthly = summaryResponse.monthlySubscriptionsEstimate ?? summaryResponse.subscriptions?.monthlyEstimate ?? 0;
      const currency = summaryResponse.currency ?? summaryResponse.subscriptions?.currency ?? 'BRL';
      setMonthlyInvestment(formatMoney(monthly, currency));
      setApiError(null);
    } catch (error) {
      if (error instanceof ApiError) {
        setApiError(error.message);
        return;
      }

      setApiError('Falha ao carregar dados do dashboard.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadDashboardData();
    }, [loadDashboardData])
  );

  const statsItems = useMemo(() => toStatItems(summary ?? {}), [summary]);
  const criticalItems = useMemo(() => upcoming.slice(0, 2).map(mapCriticalItem), [upcoming]);
  const upcomingItems = useMemo(() => upcoming.slice(0, 3).map(mapUpcomingItem), [upcoming]);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#060D1A]">
      <View className="mx-3 mt-2 overflow-hidden rounded-t-3xl border border-[#1A2740] bg-[#0A1222]">
        <View className="px-5 py-5">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('UserProfile')} className="flex-row items-center">
              <View className="h-14 w-14 items-center justify-center rounded-full border border-[#1DE2FF]/60 bg-[#0E243D]">
                <View className="h-11 w-11 items-center justify-center rounded-full bg-[#112C4A]">
                  <Feather name="user" size={22} color="#8BD9FF" />
                </View>
              </View>
              <View className="ml-4">
                <Text className="text-[11px] font-semibold tracking-[1.2px] text-[#5F7391]">BEM-VINDO</Text>
                <Text className="text-[18px] font-bold text-[#F8FAFC]">Olá, João</Text>
              </View>
            </TouchableOpacity>

            <View className="flex-row items-center gap-3">
              <TouchableOpacity className="h-10 w-10 items-center justify-center">
                <Feather name="search" size={24} color="#8FA3C0" />
              </TouchableOpacity>
              <TouchableOpacity className="relative h-10 w-10 items-center justify-center">
                <Feather name="bell" size={24} color="#8FA3C0" />
                <View className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#22D3EE]" />
                <View className="absolute right-1 top-1 h-4 w-4 rounded-full bg-[#22D3EE]/20" />
              </TouchableOpacity>
              <TouchableOpacity className="h-10 w-10 items-center justify-center" onPress={() => navigation.navigate('Settings')}>
                <Feather name="settings" size={24} color="#8FA3C0" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="h-px bg-[#1A2740]" />
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {apiError ? (
          <View className="mt-4 rounded-lg border border-[#3A2431] bg-[#25131C] p-3">
            <Text className="text-[13px] text-[#FF8899]">API: {apiError}</Text>
          </View>
        ) : null}

        <AnimatedEntrance delay={40}>
          <View className="mt-5 flex-row items-center justify-between">
            <Text className="text-[16px] font-bold tracking-[1.5px] text-[#FF6B6B]">ALERTAS CRÍTICOS</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: 8, paddingBottom: 2 }}>
            {criticalItems.map((item) => (
              <CriticalCard key={item.id} item={item} />
            ))}
            {criticalItems.length === 0 ? (
              <View className="rounded-xl border border-[#26324A] bg-[#111C31] px-4 py-5">
                <Text className="text-[14px] text-[#8FA2BD]">Sem alertas críticos no momento.</Text>
              </View>
            ) : null}
          </ScrollView>
        </AnimatedEntrance>

        <AnimatedEntrance delay={90}>
          <View className="mt-5 flex-row flex-wrap justify-between">
            {statsItems.map((item) => (
              <StatCard key={item.id} item={item} />
            ))}
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={130}>
          <View className="mt-2 rounded-xl border border-[#2A3550] bg-[#121D32] p-5">
            <Text className="text-[13px] tracking-[2px] text-[#7D8FA8]">INVESTIMENTO MENSAL</Text>
            <View className="mt-2 flex-row items-end justify-between">
              <Text className="text-[34px] font-semibold text-[#F8FAFC]">{monthlyInvestment}</Text>
              <Text className="text-[14px] font-semibold text-[#19D6FF]">Assinaturas</Text>
            </View>
            <View className="mt-7 flex-row justify-between px-1">
              {['JAN', 'FEV', 'MAR', 'ABR', 'MAI'].map((m) => (
                <Text key={m} className={`text-[12px] tracking-[1px] ${m === 'MAR' ? 'text-[#19D6FF]' : 'text-[#5F708B]'}`}>
                  {m}
                </Text>
              ))}
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={170}>
          <View className="mt-7 flex-row items-center justify-between">
            <Text className="text-[16px] font-bold tracking-[1.5px] text-[#9EB0C9]">ATIVOS RECENTES</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text className="text-[15px] font-semibold text-[#19D6FF]">Ver todos</Text>
            </TouchableOpacity>
          </View>

          {recentItem ? (
            <View className="mt-3 rounded-xl border border-[#2A3550] bg-[#121D32] p-3">
              <View className="flex-row items-center">
                <View className="h-16 w-16 rounded-lg bg-[#2A3550]" />
                <View className="ml-3 flex-1">
                  <Text className="text-[17px] font-bold text-[#F8FAFC]">{recentItem.title}</Text>
                  <Text className="text-[13px] text-[#7D8FA8]">{getStatusTag(recentItem)}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-[16px] font-semibold text-[#AFC0D8]">
                    {typeof recentItem.amount === 'number' ? formatMoney(recentItem.amount, recentItem.currency ?? 'BRL') : '--'}
                  </Text>
                  <View className="mt-1 rounded-md bg-[#26324A] px-2 py-1">
                    <Text className="text-[11px] tracking-[1px] text-[#8FA2BD]">{recentItem.type}</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View className="mt-3 rounded-xl border border-[#2A3550] bg-[#121D32] p-4">
              <Text className="text-[14px] text-[#8FA2BD]">Nenhum ativo encontrado.</Text>
            </View>
          )}
        </AnimatedEntrance>

        <AnimatedEntrance delay={210}>
          <Text className="mt-7 text-[16px] font-bold tracking-[1.5px] text-[#9EB0C9]">PRÓXIMOS DESTA SEMANA</Text>

          <View className="mt-3 rounded-xl border border-[#2A3550] bg-[#121D32] p-3">
            {upcomingItems.map((item, index) => (
              <View key={item.id} className={`flex-row items-center py-3 ${index < upcomingItems.length - 1 ? 'border-b border-[#25334D]' : ''}`}>
                <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.dot }} />
                <View className="ml-3 flex-1">
                  <Text className="text-[16px] font-semibold text-[#F8FAFC]">{item.title}</Text>
                  <Text className="text-[13px] text-[#7D8FA8]">{item.subtitle}</Text>
                </View>
                <Text className="text-[13px] font-semibold text-[#F8FAFC]">{item.date}</Text>
              </View>
            ))}
            {upcomingItems.length === 0 ? (
              <Text className="py-2 text-[14px] text-[#8FA2BD]">Sem vencimentos próximos.</Text>
            ) : null}
          </View>
        </AnimatedEntrance>
      </ScrollView>
    </SafeAreaView>
  );
}
