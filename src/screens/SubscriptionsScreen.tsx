import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { StandardPageHeader } from '../components/StandardPageHeader';

type BillingStatus = 'active' | 'pending' | 'expired';

type SubscriptionItem = {
  id: string;
  name: string;
  plan: string;
  nextBilling: string;
  price: string;
  status: BillingStatus;
  icon: keyof typeof Feather.glyphMap;
  nearDue?: boolean;
};

const subscriptions: SubscriptionItem[] = [
  { id: '1', name: 'Netflix', plan: 'Plano Premium 4K', nextBilling: '15/05/2026', price: 'R$ 55,90', status: 'active', icon: 'tv', nearDue: true },
  { id: '2', name: 'Spotify', plan: 'Plano Familiar', nextBilling: '18/05/2026', price: 'R$ 34,90', status: 'active', icon: 'music', nearDue: true },
  { id: '3', name: 'iCloud+', plan: '2TB Storage', nextBilling: '20/05/2026', price: 'R$ 49,90', status: 'pending', icon: 'cloud' },
  { id: '4', name: 'Amazon Prime', plan: 'Anual', nextBilling: '12/06/2026', price: 'R$ 14,90', status: 'active', icon: 'shopping-bag' },
];

const statusMap = {
  active: { label: 'ATIVA', bg: '#D1FAE5', text: '#0F9F6E' },
  pending: { label: 'PENDENTE', bg: '#FEF3C7', text: '#B45309' },
  expired: { label: 'VENCIDA', bg: '#FEE2E2', text: '#E11D48' },
} as const;

function StatCard({ title, value, accent }: { title: string; value: string; accent: string }) {
  return (
    <View className="w-[31.5%] rounded-xl border border-appBorder bg-white px-3 py-2.5">
      <Text className="text-[11px] font-semibold text-[#8B95A7]">{title}</Text>
      <Text className="mt-1 text-[28px] font-bold" style={{ color: accent }}>{value}</Text>
    </View>
  );
}

function SubscriptionCard({ item }: { item: SubscriptionItem }) {
  const status = statusMap[item.status];

  return (
    <View className="mb-3 rounded-xl border border-appBorder bg-white p-3">
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center">
          <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#F1F5F9]">
            <Feather name={item.icon} size={16} color="#2563EB" />
          </View>
          <View className="ml-3">
            <Text className="text-[18px] font-bold text-appText">{item.name}</Text>
            <Text className="text-[13px] text-[#8B95A7]">{item.plan}</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-1.5">
          <View className="rounded-md px-2 py-1" style={{ backgroundColor: status.bg }}>
            <Text className="text-[9px] font-bold" style={{ color: status.text }}>{status.label}</Text>
          </View>

          {item.nearDue ? (
            <View className="flex-row items-center rounded-md bg-[#FFEDD5] px-2 py-1">
              <Text className="mr-1 text-[9px] font-bold text-[#EA580C]">!</Text>
              <Text className="text-[9px] font-bold text-[#EA580C]">EM BREVE</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View className="mt-3 flex-row items-center justify-between border-t border-[#E9EDF3] pt-2.5">
        <Text className="text-[13px] text-[#7C879A]">Vence em: {item.nextBilling}</Text>
        <Text className="text-[18px] font-bold text-appText">{item.price}</Text>
      </View>
    </View>
  );
}

export function SubscriptionsScreen({ navigation }: { navigation: any }) {
  return (
    <View className="flex-1 bg-[#E5E7EB]">
      <StandardPageHeader title="Listagem de Assinaturas" navigation={navigation} />

      <View className="mx-3 flex-1 rounded-2xl border border-[#D7DCE4] bg-[#F4F6F9] p-3">
        <AnimatedEntrance delay={20}>
          <View className="mb-3 flex-row items-center justify-between rounded-xl border border-appBorder bg-white px-3 py-2.5">
            <Text className="text-[22px] font-bold text-appText">Minhas Assinaturas</Text>
            <TouchableOpacity className="h-8 w-8 items-center justify-center" activeOpacity={0.7}><Feather name="search" size={18} color="#334155" /></TouchableOpacity>
          </View>
        </AnimatedEntrance>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          <AnimatedEntrance delay={60}>
            <View className="flex-row justify-between">
              <StatCard title="Total Mensal" value="R$ 250,00" accent="#1D74D8" />
              <StatCard title="Ativas" value="8" accent="#0F172A" />
              <StatCard title="Próximas" value="2" accent="#F97316" />
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={90}>
            <View className="mt-3 h-11 flex-row items-center rounded-xl border border-appBorder bg-white px-3">
              <Feather name="search" size={17} color="#94A3B8" />
              <Text className="ml-2 text-[16px] text-[#A0A9B8]">Pesquisar assinaturas...</Text>
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={120}>
            <View className="mt-4 mb-2 flex-row items-center justify-between">
              <Text className="text-[14px] font-bold tracking-[1.1px] text-[#7C879A]">PRÓXIMOS VENCIMENTOS</Text>
              <TouchableOpacity activeOpacity={0.8}><Text className="text-[13px] font-semibold text-[#3B82F6]">Ver todas</Text></TouchableOpacity>
            </View>
          </AnimatedEntrance>

          {subscriptions.map((item, index) => (
            <AnimatedEntrance key={item.id} delay={160 + index * 45}><SubscriptionCard item={item} /></AnimatedEntrance>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
