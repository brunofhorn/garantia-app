import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedEntrance } from '../components/AnimatedEntrance';

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

const critical: CriticalItem[] = [
  { id: '1', title: 'MacBook Pro M2', subtitle: 'Apple Care+', tag: 'Vence em 2 dias', icon: 'alert-circle', iconColor: '#FF6B6B', badgeBg: '#2B1C2B', badgeText: '#FF6B6B' },
  { id: '2', title: 'PlayStation 5', subtitle: 'Sony Br', tag: 'Vence em 5 dias', icon: 'alert-triangle', iconColor: '#FFC93D', badgeBg: '#2B2A1C', badgeText: '#F7C948' },
];

const stats: StatItem[] = [
  { id: '1', title: 'TOTAL', value: '24', icon: 'archive', iconColor: '#22D3EE' },
  { id: '2', title: 'GARANTIA', value: '18', icon: 'check-circle', iconColor: '#00D4FF' },
  { id: '3', title: 'EXPIRADAS', value: '04', icon: 'clock', iconColor: '#FF6B6B' },
  { id: '4', title: 'EM BREVE', value: '02', icon: 'corner-down-right', iconColor: '#F7C948' },
];

const upcoming: UpcomingItem[] = [
  { id: '1', title: 'Cafeteira Expressa', subtitle: 'Expira em 2 dias • Cozinha', date: '28 MAR', dot: '#FF5D5D' },
  { id: '2', title: 'Headset Wireless Pro', subtitle: 'Expira em 5 dias • Acessórios', date: '31 MAR', dot: '#F5B221' },
  { id: '3', title: 'Licença Office 365', subtitle: 'Expira em 7 dias • Software', date: '02 ABR', dot: '#7C8DA6' },
];

function CriticalCard({ item }: { item: CriticalItem }) {
  return (
    <View className="mr-3 w-[220px] rounded-xl border border-[#26324A] bg-[#111C31] p-3.5">
      <View className="flex-row items-center justify-between">
        <Feather name={item.icon} size={18} color={item.iconColor} />
        <View className="rounded-md px-2 py-1" style={{ backgroundColor: item.badgeBg }}>
          <Text className="text-[11px] font-semibold" style={{ color: item.badgeText }}>{item.tag}</Text>
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
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#060D1A]">
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
              <TouchableOpacity className="h-10 w-10 items-center justify-center"><Feather name="search" size={24} color="#8FA3C0" /></TouchableOpacity>
              <TouchableOpacity className="relative h-10 w-10 items-center justify-center">
                <Feather name="bell" size={24} color="#8FA3C0" />
                <View className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#22D3EE]" />
                <View className="absolute right-1 top-1 h-4 w-4 rounded-full bg-[#22D3EE]/20" />
              </TouchableOpacity>
              <TouchableOpacity className="h-10 w-10 items-center justify-center" onPress={() => navigation.navigate('Settings')}><Feather name="settings" size={24} color="#8FA3C0" /></TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="h-px bg-[#1A2740]" />
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <AnimatedEntrance delay={40}>
          <View className="mt-5 flex-row items-center justify-between">
            <Text className="text-[16px] font-bold tracking-[1.5px] text-[#FF6B6B]">ALERTAS CRÍTICOS</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: 8, paddingBottom: 2 }}>
            {critical.map((item) => <CriticalCard key={item.id} item={item} />)}
          </ScrollView>
        </AnimatedEntrance>

        <AnimatedEntrance delay={90}>
          <View className="mt-5 flex-row flex-wrap justify-between">
            {stats.map((item) => <StatCard key={item.id} item={item} />)}
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={130}>
          <View className="mt-2 rounded-xl border border-[#2A3550] bg-[#121D32] p-5">
            <Text className="text-[13px] tracking-[2px] text-[#7D8FA8]">INVESTIMENTO MENSAL</Text>
            <View className="mt-2 flex-row items-end justify-between">
              <Text className="text-[34px] font-semibold text-[#F8FAFC]">R$ 14.820,00</Text>
              <Text className="text-[14px] font-semibold text-[#19D6FF]">+12%</Text>
            </View>
            <View className="mt-7 flex-row justify-between px-1">
              {['JAN', 'FEV', 'MAR', 'ABR', 'MAI'].map((m) => (
                <Text key={m} className={`text-[12px] tracking-[1px] ${m === 'MAR' ? 'text-[#19D6FF]' : 'text-[#5F708B]'}`}>{m}</Text>
              ))}
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={170}>
          <View className="mt-7 flex-row items-center justify-between">
            <Text className="text-[16px] font-bold tracking-[1.5px] text-[#9EB0C9]">ATIVOS RECENTES</Text>
            <TouchableOpacity activeOpacity={0.8}><Text className="text-[15px] font-semibold text-[#19D6FF]">Ver todos</Text></TouchableOpacity>
          </View>

          <View className="mt-3 rounded-xl border border-[#2A3550] bg-[#121D32] p-3">
            <View className="flex-row items-center">
              <View className="h-16 w-16 rounded-lg bg-[#2A3550]" />
              <View className="ml-3 flex-1">
                <Text className="text-[17px] font-bold text-[#F8FAFC]">Smart TV 4K Ultra</Text>
                <Text className="text-[13px] text-[#7D8FA8]">Expira em 14 meses</Text>
              </View>
              <View className="items-end">
                <Text className="text-[16px] font-semibold text-[#AFC0D8]">R$ 4.299</Text>
                <View className="mt-1 rounded-md bg-[#26324A] px-2 py-1"><Text className="text-[11px] tracking-[1px] text-[#8FA2BD]">ELETRÔNICOS</Text></View>
              </View>
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={210}>
          <Text className="mt-7 text-[16px] font-bold tracking-[1.5px] text-[#9EB0C9]">PRÓXIMOS DESTA SEMANA</Text>

          <View className="mt-3 rounded-xl border border-[#2A3550] bg-[#121D32] p-3">
            {upcoming.map((item, index) => (
              <View key={item.id} className={`flex-row items-center py-3 ${index < upcoming.length - 1 ? 'border-b border-[#25334D]' : ''}`}>
                <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.dot }} />
                <View className="ml-3 flex-1">
                  <Text className="text-[16px] font-semibold text-[#F8FAFC]">{item.title}</Text>
                  <Text className="text-[13px] text-[#7D8FA8]">{item.subtitle}</Text>
                </View>
                <Text className="text-[13px] font-semibold text-[#F8FAFC]">{item.date}</Text>
              </View>
            ))}
          </View>
        </AnimatedEntrance>
      </ScrollView>
    </SafeAreaView>
  );
}
