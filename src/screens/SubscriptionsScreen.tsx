import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedEntrance } from '../components/AnimatedEntrance';

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

const dueSoon: DueItem[] = [
  {
    id: '1',
    name: 'Netflix',
    dueIn: 'Amanhã',
    amount: 'R$ 55,90',
    icon: 'play-circle',
    iconBg: '#3A1219',
    iconColor: '#EF4444',
  },
  {
    id: '2',
    name: 'Spotify',
    dueIn: 'Em 3 dias',
    amount: 'R$ 34,90',
    icon: 'radio',
    iconBg: '#113323',
    iconColor: '#22C55E',
  },
  {
    id: '3',
    name: 'iCloud+',
    dueIn: 'Em 5 dias',
    amount: 'R$ 49,90',
    icon: 'cloud',
    iconBg: '#132746',
    iconColor: '#60A5FA',
  },
];

const services: ServiceItem[] = [
  {
    id: '1',
    name: 'Netflix',
    renewal: 'Renovação: 12 Out',
    amount: 'R$ 55,90',
    icon: 'play-circle',
    iconBg: '#101522',
    iconColor: '#EF4444',
    borderColor: '#DC2626',
  },
  {
    id: '2',
    name: 'Spotify Family',
    renewal: 'Renovação: 15 Out',
    amount: 'R$ 34,90',
    icon: 'radio',
    iconBg: '#101E1A',
    iconColor: '#22C55E',
    borderColor: '#22C55E',
  },
  {
    id: '3',
    name: 'iCloud+ 2TB',
    renewal: 'Renovação: 18 Out',
    amount: 'R$ 49,90',
    icon: 'cloud',
    iconBg: '#102039',
    iconColor: '#60A5FA',
    borderColor: '#3B82F6',
  },
  {
    id: '4',
    name: 'YT Premium',
    renewal: 'Renovação: 22 Out',
    amount: 'R$ 24,90',
    icon: 'youtube',
    iconBg: '#2A1B15',
    iconColor: '#F97316',
    borderColor: '#EF4444',
  },
];

function DueCard({ item }: { item: DueItem }) {
  return (
    <View className="mr-3 w-[155px] rounded-xl border border-[#1F2C45] bg-[#0F1A2E] p-3">
      <View className="h-10 w-10 items-center justify-center rounded-md" style={{ backgroundColor: item.iconBg }}>
        <Feather name={item.icon} size={20} color={item.iconColor} />
      </View>
      <Text className="mt-4 text-[15px] font-semibold text-[#9DB0C8]">{item.dueIn}</Text>
      <Text className="mt-0.5 text-[17px] font-bold text-[#EAF0F8]">{item.amount}</Text>
    </View>
  );
}

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      className="mb-3 rounded-xl border bg-[#0F1A2E] p-3"
      style={{ borderColor: item.borderColor }}
    >
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
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#060D1A]">
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
              <TouchableOpacity className="h-10 w-10 items-center justify-center"><Feather name="search" size={24} color="#8FA3C0" /></TouchableOpacity>
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
        <AnimatedEntrance delay={35}>
          <View className="mt-5 rounded-xl bg-[#2A4EB2] px-4 py-4">
            <Text className="text-[16px] font-semibold text-[#B4C8FF]">Gasto Mensal Total</Text>
            <View className="mt-1 flex-row items-end">
              <Text className="text-[44px] font-bold text-[#F8FAFC]">R$ 245,90</Text>
              <Text className="mb-1 ml-2 text-[14px] font-semibold text-[#AFC4FF]">+12% vs mês anterior</Text>
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={70}>
          <View className="mt-6 flex-row items-center justify-between">
            <Text className="text-[15px] font-bold tracking-[1.5px] text-[#8FA3C0]">PRÓXIMAS COBRANÇAS</Text>
            <TouchableOpacity activeOpacity={0.8}><Text className="text-[15px] font-semibold text-[#2A8CFF]">Ver todas</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10, paddingBottom: 3 }}>
            {dueSoon.map((item) => (
              <DueCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </AnimatedEntrance>

        <AnimatedEntrance delay={110}>
          <Text className="mt-5 text-[15px] font-bold tracking-[1.5px] text-[#8FA3C0]">MEUS SERVIÇOS</Text>

          <View className="mt-3">
            {services.map((item) => (
              <ServiceCard key={item.id} item={item} />
            ))}
          </View>
        </AnimatedEntrance>
      </ScrollView>
    </SafeAreaView>
  );
}
