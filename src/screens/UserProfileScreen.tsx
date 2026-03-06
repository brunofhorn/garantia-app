import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StandardPageHeader } from '../components/StandardPageHeader';

function ProfileRow({ icon, title, subtitle }: { icon: keyof typeof Feather.glyphMap; title: string; subtitle: string }) {
  return (
    <TouchableOpacity activeOpacity={0.85} className="mb-2 flex-row items-center rounded-xl bg-white px-3 py-3 border border-[#E3E8F0]">
      <View className="h-10 w-10 items-center justify-center rounded-lg bg-[#EAF2FF]">
        <Feather name={icon} size={18} color="#1D74D8" />
      </View>
      <View className="ml-3 flex-1">
        <Text className="text-[17px] font-semibold text-[#1E293B]">{title}</Text>
        <Text className="text-[13px] text-[#64748B]">{subtitle}</Text>
      </View>
      <Feather name="chevron-right" size={18} color="#94A3B8" />
    </TouchableOpacity>
  );
}

export function UserProfileScreen({ navigation }: { navigation: any }) {
  return (
    <View className="flex-1 bg-[#E5E7EB]">
      <StandardPageHeader title="Perfil do Usuário" navigation={navigation} showBack enableProfileLink={false} />

      <View className="mx-3 flex-1 rounded-2xl border border-[#D7DCE4] bg-[#F4F6F9] p-4">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          <View className="items-center">
            <View className="relative">
              <View className="h-28 w-28 items-center justify-center rounded-full bg-[#F3D4C0]">
                <Feather name="user" size={46} color="#334155" />
              </View>
              <TouchableOpacity className="absolute -bottom-1 -right-1 h-8 w-8 items-center justify-center rounded-full bg-[#2583E5] border-2 border-white">
                <Feather name="edit-2" size={14} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text className="mt-3 text-[34px] font-bold text-[#0F172A]">João Silva</Text>
            <Text className="text-[18px] text-[#64748B]">joao.silva@email.com</Text>
          </View>

          <View className="mt-4 flex-row justify-between">
            <View className="w-[31.5%] rounded-xl border border-[#DCE2EC] bg-white p-3 items-center">
              <Text className="text-[30px] font-bold text-[#1D74D8]">Jan{`\n`}2023</Text>
              <Text className="mt-1 text-center text-[10px] font-bold text-[#64748B] tracking-[1px]">MEMBRO{`\n`}DESDE</Text>
            </View>
            <View className="w-[31.5%] rounded-xl border border-[#DCE2EC] bg-white p-3 items-center">
              <Text className="text-[34px] font-bold text-[#1D74D8]">24</Text>
              <Text className="mt-1 text-center text-[10px] font-bold text-[#64748B] tracking-[1px]">GARANTIAS</Text>
            </View>
            <View className="w-[31.5%] rounded-xl border border-[#DCE2EC] bg-white p-3 items-center">
              <Text className="text-[34px] font-bold text-[#1D74D8]">R$ 1.2k</Text>
              <Text className="mt-1 text-center text-[10px] font-bold text-[#64748B] tracking-[1px]">ECONOMIA</Text>
            </View>
          </View>

          <Text className="mt-5 mb-2 text-[13px] font-bold tracking-[1.2px] text-[#7C879A]">MINHA CONTA</Text>

          <ProfileRow icon="user" title="Meus Dados" subtitle="Informações pessoais e contato" />
          <ProfileRow icon="file-text" title="Documentos Salvos" subtitle="Notas fiscais e certificados" />
          <ProfileRow icon="bar-chart" title="Estatísticas de Gastos" subtitle="Relatórios e economia mensal" />
          <ProfileRow icon="users" title="Compartilhamento Familiar" subtitle="Gerenciar membros e acessos" />
          <ProfileRow icon="shield" title="Segurança e Biometria" subtitle="Face ID e proteção de conta" />

          <TouchableOpacity activeOpacity={0.85} className="mt-3 h-12 flex-row items-center justify-center rounded-xl bg-[#FDECEC]">
            <Feather name="log-out" size={18} color="#E11D48" />
            <Text className="ml-2 text-[18px] font-semibold text-[#E11D48]">Sair da Conta</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
