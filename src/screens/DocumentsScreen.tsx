import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { StandardPageHeader } from '../components/StandardPageHeader';

type DocumentStatus = 'valid' | 'expiring' | 'expired' | 'permanent';

type DocumentItem = {
  id: string;
  name: string;
  issueDate: string;
  expiryDate: string;
  status: DocumentStatus;
  statusLabel: string;
  topBadge?: string;
  icon: keyof typeof Feather.glyphMap | 'passport';
};

const documents: DocumentItem[] = [
  { id: '1', name: 'CNH - Carteira de Habilitação', issueDate: '10/05/2019', expiryDate: '15/10/2023', status: 'expiring', statusLabel: 'Dentro da Validade', topBadge: 'EXPIRA EM 12 DIAS', icon: 'briefcase' },
  { id: '2', name: 'Passaporte', issueDate: '22/01/2013', expiryDate: '22/01/2023', status: 'expired', statusLabel: 'Vencido', topBadge: 'VENCIDO', icon: 'passport' },
  { id: '3', name: 'RG - Registro Geral', issueDate: '15/08/2010', expiryDate: 'Indeterminado', status: 'permanent', statusLabel: 'Dentro da Validade', topBadge: 'PERMANENTE', icon: 'file-text' },
  { id: '4', name: 'Procuração Judicial', issueDate: '01/01/2023', expiryDate: '01/01/2026', status: 'valid', statusLabel: 'Dentro da Validade', topBadge: '842 DIAS RESTANTES', icon: 'send' },
];

const statusColor = {
  valid: { badgeBg: '#D1FAE5', badgeText: '#0F9F6E', topBg: '#D1FAE5', topText: '#0F9F6E' },
  expiring: { badgeBg: '#D1FAE5', badgeText: '#0F9F6E', topBg: '#FEF3C7', topText: '#B45309' },
  expired: { badgeBg: '#FEE2E2', badgeText: '#E11D48', topBg: '#FFE4E6', topText: '#E11D48' },
  permanent: { badgeBg: '#D1FAE5', badgeText: '#0F9F6E', topBg: '#E5E7EB', topText: '#6B7280' },
} as const;

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <View className="w-[48.5%] rounded-xl border border-appBorder bg-white px-3 py-2.5">
      <Text className="text-[10px] font-bold tracking-[1px] text-[#8B95A7]">{title}</Text>
      <Text className="mt-1 text-[32px] font-bold text-appText">{value}</Text>
      <View className="mt-1 h-1 rounded-full bg-[#E8ECF2]"><View className="h-1 w-4/5 rounded-full" style={{ backgroundColor: color }} /></View>
    </View>
  );
}

function DocumentCard({ item }: { item: DocumentItem }) {
  const colors = statusColor[item.status];

  return (
    <View className="mb-3 rounded-xl border border-appBorder bg-white p-3">
      <View className="flex-row items-start justify-between">
        <View className="flex-row flex-1 pr-2">
          <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#EBF4FF]">
            {item.icon === 'passport' ? <MaterialCommunityIcons name="passport" size={18} color="#E11D48" /> : <Feather name={item.icon as keyof typeof Feather.glyphMap} size={16} color="#1D4ED8" />}
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-[17px] font-bold text-appText">{item.name}</Text>
            <View className="mt-2 flex-row items-center">
              <Feather name="calendar" size={13} color="#8B95A7" />
              <Text className="ml-1 text-[13px] text-[#8B95A7]">{item.issueDate}</Text>
              <Feather name="arrow-right" size={13} color="#9CA3AF" style={{ marginHorizontal: 6 }} />
              <Feather name="calendar" size={13} color={item.status === 'expired' ? '#E11D48' : '#8B95A7'} />
              <Text className={`ml-1 text-[13px] ${item.status === 'expired' ? 'text-[#E11D48] font-semibold' : 'text-[#8B95A7]'}`}>{item.expiryDate}</Text>
            </View>
          </View>
        </View>

        {item.topBadge ? (
          <View className="rounded-md px-2 py-1" style={{ backgroundColor: colors.topBg }}>
            <Text className="text-[9px] font-bold" style={{ color: colors.topText }}>{item.topBadge}</Text>
          </View>
        ) : null}
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <View className="rounded-full px-3 py-1 flex-row items-center" style={{ backgroundColor: colors.badgeBg }}>
          <View className="h-2 w-2 rounded-full mr-1.5" style={{ backgroundColor: colors.badgeText }} />
          <Text className="text-[12px] font-semibold" style={{ color: colors.badgeText }}>{item.statusLabel}</Text>
        </View>
        <TouchableOpacity className="h-7 w-7 items-center justify-center" activeOpacity={0.7}><Feather name="more-vertical" size={16} color="#94A3B8" /></TouchableOpacity>
      </View>
    </View>
  );
}

export function DocumentsScreen({ navigation }: { navigation: any }) {
  return (
    <View className="flex-1 bg-[#E5E7EB]">
      <StandardPageHeader title="Listagem de Documentos" navigation={navigation} />

      <View className="mx-3 flex-1 rounded-2xl border border-[#D7DCE4] bg-[#F4F6F9] p-3">
        <AnimatedEntrance delay={20}>
          <View className="mb-3 flex-row items-center justify-between rounded-xl border border-appBorder bg-white px-3 py-2.5">
            <View className="flex-row items-center">
              <View className="h-9 w-9 items-center justify-center rounded-lg bg-[#E8F1FF]"><Feather name="shield" size={17} color="#1D74D8" /></View>
              <Text className="ml-3 text-[20px] font-bold text-appText">Meus Documentos</Text>
            </View>
            <TouchableOpacity className="h-8 w-8 items-center justify-center" activeOpacity={0.7}><Feather name="search" size={18} color="#334155" /></TouchableOpacity>
          </View>
        </AnimatedEntrance>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          <AnimatedEntrance delay={60}>
            <View className="flex-row flex-wrap justify-between gap-y-3">
              <StatCard title="TOTAL" value="24" color="#3B82F6" />
              <StatCard title="VÁLIDOS" value="18" color="#10B981" />
              <StatCard title="VENCIDOS" value="2" color="#F43F5E" />
              <StatCard title="PRÓXIMOS" value="4" color="#F59E0B" />
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={90}>
            <View className="mt-3 h-11 flex-row items-center rounded-xl border border-appBorder bg-white px-3">
              <Feather name="search" size={17} color="#94A3B8" />
              <Text className="ml-2 text-[16px] text-[#A0A9B8]">Pesquisar por nome ou tipo de documento</Text>
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={120}>
            <View className="mt-4 mb-2 flex-row items-center justify-between">
              <Text className="text-[14px] font-bold tracking-[1.3px] text-[#7C879A]">DOCUMENTOS RECENTES</Text>
              <TouchableOpacity className="flex-row items-center" activeOpacity={0.8}>
                <Text className="text-[13px] font-semibold text-[#3B82F6]">Ordenar por vencimento</Text>
                <Feather name="filter" size={13} color="#3B82F6" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
          </AnimatedEntrance>

          {documents.map((item, index) => (
            <AnimatedEntrance key={item.id} delay={160 + index * 45}><DocumentCard item={item} /></AnimatedEntrance>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
