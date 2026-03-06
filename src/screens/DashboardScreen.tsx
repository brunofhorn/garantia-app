import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { StandardPageHeader } from '../components/StandardPageHeader';

type AlertCard = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  kind: 'danger' | 'warning';
};

type OverviewCard = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: keyof typeof Feather.glyphMap;
};

type UpcomingItem = {
  id: string;
  day: string;
  date: string;
  title: string;
  subtitle: string;
  dotColor: string;
};

const criticalAlerts: AlertCard[] = [
  { id: '1', title: 'Garantia Vencendo', subtitle: 'iPhone 15 Pro Max', tag: 'EXPIRA AMANHÃ', kind: 'danger' },
  { id: '2', title: 'CNH Vencendo', subtitle: 'Documento Pessoal', tag: 'EM 3 DIAS', kind: 'warning' },
];

const overview: OverviewCard[] = [
  { id: '1', title: 'Garantias', value: '12', subtitle: '2 expirando em breve', icon: 'shield' },
  { id: '2', title: 'Documentos', value: '8', subtitle: '1 requer atualização', icon: 'file-text' },
  { id: '3', title: 'Assinaturas', value: '15', subtitle: 'R$ 142,50 / mês', icon: 'credit-card' },
];

const upcoming: UpcomingItem[] = [
  { id: '1', day: 'SEG', date: '22', title: 'Assinatura Netflix', subtitle: 'Renovação automática: R$ 55,90', dotColor: '#2563EB' },
  { id: '2', day: 'TER', date: '23', title: 'Fim de Garantia da TV', subtitle: 'Samsung Q55 OLED', dotColor: '#EF4444' },
  { id: '3', day: 'QUI', date: '25', title: 'Vencimento da CNH', subtitle: 'Renovação em andamento', dotColor: '#F59E0B' },
];

function AlertItem({ item }: { item: AlertCard }) {
  const colors =
    item.kind === 'danger'
      ? { bg: '#FEE2E2', title: '#B91C1C', subtitle: '#EF4444', tag: '#DC2626' }
      : { bg: '#FEF3C7', title: '#B45309', subtitle: '#D97706', tag: '#F59E0B' };

  return (
    <View className="mr-3 w-[235px] rounded-xl border border-[#E5E7EB] p-3" style={{ backgroundColor: colors.bg }}>
      <View className="flex-row items-center">
        <View className="mr-2 h-7 w-7 items-center justify-center rounded-md bg-white/60">
          <Feather name={item.kind === 'danger' ? 'alert-triangle' : 'briefcase'} size={14} color={colors.title} />
        </View>
        <View className="flex-1">
          <Text className="text-[14px] font-bold" style={{ color: colors.title }}>{item.title}</Text>
          <Text className="text-[12px]" style={{ color: colors.subtitle }}>{item.subtitle}</Text>
        </View>
      </View>
      <Text className="mt-2 text-[11px] font-bold" style={{ color: colors.tag }}>{item.tag}</Text>
    </View>
  );
}

function OverviewItem({ item }: { item: OverviewCard }) {
  return (
    <View className="mb-3 rounded-2xl border border-[#E3E7EE] bg-white p-4">
      <View className="flex-row items-start justify-between">
        <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
          <Feather name={item.icon} size={15} color="#1D74D8" />
        </View>
        <Text className="text-[30px] font-bold text-[#1E293B]">{item.value}</Text>
      </View>
      <Text className="mt-3 text-[16px] font-semibold text-[#334155]">{item.title}</Text>
      <Text className="mt-1 text-[12px] text-[#F97316]">{item.subtitle}</Text>
    </View>
  );
}

export function DashboardScreen({ navigation }: { navigation: any }) {
  return (
    <View className="flex-1 bg-[#E5E7EB]">
      <StandardPageHeader title="Dashboard Consolidado" navigation={navigation} />

      <View className="mx-3 flex-1 rounded-2xl border border-[#D7DCE4] bg-[#F4F6F9] p-3">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          <AnimatedEntrance delay={70}>
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="text-[22px] font-bold text-[#334155]">Alertas Críticos</Text>
              <TouchableOpacity activeOpacity={0.8}><Text className="text-[13px] font-semibold text-[#3B82F6]">Ver todos</Text></TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 4 }}>
              {criticalAlerts.map((item) => <AlertItem key={item.id} item={item} />)}
            </ScrollView>
          </AnimatedEntrance>

          <AnimatedEntrance delay={110}>
            <View className="mt-3 mb-2"><Text className="text-[22px] font-bold text-[#334155]">Visão Geral</Text></View>
            {overview.map((item) => <OverviewItem key={item.id} item={item} />)}
          </AnimatedEntrance>

          <AnimatedEntrance delay={150}>
            <View className="mb-4 mt-1 flex-row justify-between">
              <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('AddWarranty')} className="h-11 w-[48.5%] flex-row items-center justify-center rounded-xl bg-[#1D74D8]">
                <Feather name="plus-circle" size={17} color="#fff" />
                <Text className="ml-2 text-[16px] font-bold text-white">Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} className="h-11 w-[48.5%] flex-row items-center justify-center rounded-xl border border-[#D7DCE4] bg-white">
                <Feather name="search" size={16} color="#334155" />
                <Text className="ml-2 text-[16px] font-bold text-[#334155]">Buscar Tudo</Text>
              </TouchableOpacity>
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={190}>
            <View className="mb-2"><Text className="text-[22px] font-bold text-[#334155]">Próximos desta Semana</Text></View>
            <View className="rounded-2xl border border-[#E3E7EE] bg-white p-3">
              {upcoming.map((item, index) => (
                <View key={item.id} className={`flex-row items-center py-2 ${index < upcoming.length - 1 ? 'border-b border-[#EEF2F7]' : ''}`}>
                  <View className="w-12 items-center">
                    <Text className="text-[10px] font-bold text-[#9AA4B5]">{item.day}</Text>
                    <Text className="text-[24px] font-bold text-[#334155]">{item.date}</Text>
                  </View>
                  <View className="ml-2 mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: item.dotColor }} />
                  <View className="flex-1">
                    <Text className="text-[14px] font-bold text-[#1E293B]">{item.title}</Text>
                    <Text className="text-[12px] text-[#94A3B8]">{item.subtitle}</Text>
                  </View>
                </View>
              ))}
            </View>
          </AnimatedEntrance>
        </ScrollView>
      </View>
    </View>
  );
}
