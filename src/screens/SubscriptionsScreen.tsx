import { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { ApiError, Item, itemsApi } from '../services';
import { daysUntil, formatDatePtBr } from '../utils/date';

type DueItem = {
  id: string;
  name: string;
  dueIn: string;
  amount: string;
  icon: keyof typeof Feather.glyphMap;
  iconBg: string;
  iconColor: string;
};

type ServiceItem = {
  id: string;
  name: string;
  renewal: string;
  amount: string;
  icon: keyof typeof Feather.glyphMap;
  iconBg: string;
  iconColor: string;
  borderColor: string;
};

function toRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as Record<string, unknown>;
}

function readString(record: Record<string, unknown> | null, key: string): string | null {
  if (!record) {
    return null;
  }

  const value = record[key];
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function formatCurrency(value?: number | null, currency: string = 'BRL'): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 'R$ 0,00';
  }

  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `R$ ${value.toFixed(2)}`;
  }
}

function normalizeToMonthlyAmount(item: Item): number {
  const amount = item.amount ?? 0;
  const metadata = toRecord(item.metadata);
  const frequency = (readString(metadata, 'frequency') ?? 'mensal').toLowerCase();

  if (frequency.includes('anual')) {
    return amount / 12;
  }

  if (frequency.includes('semanal')) {
    return amount * 4.345;
  }

  if (frequency.includes('trimestral')) {
    return amount / 3;
  }

  return amount;
}

function resolveSubscriptionVisual(item: Item): { icon: keyof typeof Feather.glyphMap; iconBg: string; iconColor: string } {
  const name = item.title.toLowerCase();

  if (name.includes('netflix') || name.includes('prime') || name.includes('youtube')) {
    return { icon: 'play-circle', iconBg: '#3A1219', iconColor: '#EF4444' };
  }

  if (name.includes('spotify') || name.includes('music')) {
    return { icon: 'radio', iconBg: '#113323', iconColor: '#22C55E' };
  }

  if (name.includes('icloud') || name.includes('cloud') || name.includes('drive')) {
    return { icon: 'cloud', iconBg: '#132746', iconColor: '#60A5FA' };
  }

  return { icon: 'credit-card', iconBg: '#1D2437', iconColor: '#AAB8D0' };
}

function mapDueItem(item: Item): DueItem {
  const visual = resolveSubscriptionVisual(item);
  const diff = daysUntil(item.expiryDate);

  let dueIn = 'Sem data';
  if (diff !== null) {
    if (diff <= 0) {
      dueIn = 'Hoje';
    } else if (diff === 1) {
      dueIn = 'Amanhã';
    } else {
      dueIn = `Em ${diff} dias`;
    }
  }

  return {
    id: item.id,
    name: item.title,
    dueIn,
    amount: formatCurrency(item.amount, item.currency ?? 'BRL'),
    ...visual,
  };
}

function mapServiceItem(item: Item): ServiceItem {
  const visual = resolveSubscriptionVisual(item);
  const isExpired = item.status === 'EXPIRED' || (daysUntil(item.expiryDate) ?? 0) < 0;
  const isSoon = item.status === 'EXPIRING_SOON';

  let borderColor = '#24354F';
  if (isExpired) {
    borderColor = '#DC2626';
  } else if (isSoon) {
    borderColor = '#F59E0B';
  } else {
    borderColor = '#22C55E';
  }

  return {
    id: item.id,
    name: item.title,
    renewal: `Renovação: ${formatDatePtBr(item.expiryDate)}`,
    amount: formatCurrency(item.amount, item.currency ?? 'BRL'),
    ...visual,
    borderColor,
  };
}

function DueCard({ item }: { item: DueItem }) {
  return (
    <View className="mr-3 w-[170px] rounded-xl border border-[#1F2C45] bg-[#0F1A2E] p-3">
      <View className="h-10 w-10 items-center justify-center rounded-md" style={{ backgroundColor: item.iconBg }}>
        <Feather name={item.icon} size={20} color={item.iconColor} />
      </View>
      <Text className="mt-3 text-[15px] font-bold text-[#EAF0F8]" numberOfLines={1}>
        {item.name}
      </Text>
      <Text className="mt-1 text-[14px] text-[#9DB0C8]">{item.dueIn}</Text>
      <Text className="mt-0.5 text-[17px] font-bold text-[#EAF0F8]">{item.amount}</Text>
    </View>
  );
}

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <TouchableOpacity activeOpacity={0.88} className="mb-3 rounded-xl border bg-[#0F1A2E] p-3" style={{ borderColor: item.borderColor }}>
      <View className="flex-row items-center">
        <View className="h-12 w-12 items-center justify-center rounded-md" style={{ backgroundColor: item.iconBg }}>
          <Feather name={item.icon} size={22} color={item.iconColor} />
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-[16px] font-bold text-[#EAF0F8]">{item.name}</Text>
          <Text className="text-[14px] text-[#7E8FA8]">{item.renewal}</Text>
        </View>

        <View className="items-end">
          <Text className="text-[16px] font-bold text-[#4FA0FF]">{item.amount}</Text>
          <Text className="mt-1 text-[13px] font-semibold tracking-[0.8px] text-[#7E8FA8]">GERENCIAR</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function SubscriptionsScreen({ navigation }: { navigation: any }) {
  const [subscriptions, setSubscriptions] = useState<Item[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  const loadSubscriptions = useCallback(async () => {
    try {
      const result = await itemsApi.list(
        {
          type: 'SUBSCRIPTION',
          sortBy: 'expiryDate',
          sortOrder: 'asc',
          pageSize: 100,
        },
        {
          retry: { enabled: true, retries: 1 },
        }
      );

      setSubscriptions(result.items);
      setApiError(null);
    } catch (error) {
      if (error instanceof ApiError) {
        setApiError(error.message);
      } else {
        setApiError('Falha ao carregar assinaturas.');
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadSubscriptions();
    }, [loadSubscriptions])
  );

  const monthlyTotal = useMemo(
    () => subscriptions.reduce((acc, item) => acc + normalizeToMonthlyAmount(item), 0),
    [subscriptions]
  );

  const dueSoonItems = useMemo(
    () =>
      subscriptions
        .filter((item) => item.status !== 'EXPIRED' && (daysUntil(item.expiryDate) ?? 9999) >= 0)
        .slice(0, 5)
        .map(mapDueItem),
    [subscriptions]
  );

  const serviceItems = useMemo(() => subscriptions.map(mapServiceItem), [subscriptions]);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#060D1A]">
      <View className="mx-3 mt-2 overflow-hidden rounded-t-3xl border border-[#1A2740] bg-[#0A1222]">
        <View className="px-5 py-5">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('UserProfile')} className="flex-row items-center">
              <View className="h-12 w-12 items-center justify-center rounded-full border border-[#1DE2FF]/60 bg-[#0E243D]">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-[#112C4A]">
                  <Feather name="user" size={20} color="#8BD9FF" />
                </View>
              </View>
              <View className="ml-4">
                <Text className="text-[11px] font-semibold tracking-[1.2px] text-[#5F7391]">BEM-VINDO</Text>
                <Text className="text-[18px] font-bold text-[#F8FAFC]">Assinaturas</Text>
              </View>
            </TouchableOpacity>

            <View className="flex-row items-center gap-3">
              <TouchableOpacity className="h-10 w-10 items-center justify-center">
                <Feather name="search" size={24} color="#8FA3C0" />
              </TouchableOpacity>
              <TouchableOpacity className="relative h-10 w-10 items-center justify-center">
                <Feather name="bell" size={24} color="#8FA3C0" />
                <View className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#22D3EE]" />
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

        <AnimatedEntrance delay={35}>
          <View className="mt-5 rounded-xl bg-[#2A4EB2] px-4 py-4">
            <Text className="text-[16px] font-semibold text-[#B4C8FF]">Gasto Mensal Total</Text>
            <View className="mt-1 flex-row items-end">
              <Text className="text-[44px] font-bold text-[#F8FAFC]">{formatCurrency(monthlyTotal)}</Text>
              <Text className="mb-1 ml-2 text-[14px] font-semibold text-[#AFC4FF]">
                {subscriptions.length} {subscriptions.length === 1 ? 'assinatura' : 'assinaturas'}
              </Text>
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={70}>
          <View className="mt-6 flex-row items-center justify-between">
            <Text className="text-[15px] font-bold tracking-[1.5px] text-[#8FA3C0]">PRÓXIMAS COBRANÇAS</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text className="text-[15px] font-semibold text-[#2A8CFF]">Ver todas</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10, paddingBottom: 3 }}>
            {dueSoonItems.map((item) => (
              <DueCard key={item.id} item={item} />
            ))}
            {dueSoonItems.length === 0 ? (
              <View className="rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-4 py-5">
                <Text className="text-[14px] text-[#91A3BE]">Nenhuma cobrança próxima.</Text>
              </View>
            ) : null}
          </ScrollView>
        </AnimatedEntrance>

        <AnimatedEntrance delay={110}>
          <Text className="mt-5 text-[15px] font-bold tracking-[1.5px] text-[#8FA3C0]">MEUS SERVIÇOS</Text>

          <View className="mt-3">
            {serviceItems.map((item) => (
              <ServiceCard key={item.id} item={item} />
            ))}
            {serviceItems.length === 0 ? (
              <View className="rounded-xl border border-[#1F2C45] bg-[#0F1A2E] p-4">
                <Text className="text-[15px] text-[#90A3BF]">Nenhuma assinatura cadastrada.</Text>
              </View>
            ) : null}
          </View>
        </AnimatedEntrance>
      </ScrollView>
    </SafeAreaView>
  );
}
