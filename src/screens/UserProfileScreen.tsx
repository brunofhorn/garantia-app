import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

function ProfileRow({ icon, title, subtitle }: { icon: keyof typeof Feather.glyphMap; title: string; subtitle: string }) {
  return (
    <TouchableOpacity activeOpacity={0.85} className="mb-2 flex-row items-center rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-3 py-3">
      <View className="h-10 w-10 items-center justify-center rounded-lg bg-[#132746]"><Feather name={icon} size={18} color="#4FA0FF" /></View>
      <View className="ml-3 flex-1">
        <Text className="text-[16px] font-semibold text-[#EAF0F8]">{title}</Text>
        <Text className="text-[12px] text-[#7E8FA8]">{subtitle}</Text>
      </View>
      <Feather name="chevron-right" size={18} color="#8EA0BA" />
    </TouchableOpacity>
  );
}

export function UserProfileScreen({ navigation }: { navigation: any }) {
  return (
    <View className="flex-1 bg-[#060D1A]">
      <View className="mx-3 mt-2 overflow-hidden rounded-t-3xl border border-[#1A2740] bg-[#0A1222]">
        <View className="px-5 py-5">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity activeOpacity={0.85} className="flex-row items-center" disabled>
              <View className="h-12 w-12 items-center justify-center rounded-full border border-[#1DE2FF]/60 bg-[#0E243D]">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-[#112C4A]"><Feather name="user" size={20} color="#8BD9FF" /></View>
              </View>
              <View className="ml-4">
                <Text className="text-[11px] font-semibold tracking-[1.2px] text-[#5F7391]">BEM-VINDO</Text>
                <Text className="text-[18px] font-bold text-[#F8FAFC]">Perfil</Text>
              </View>
            </TouchableOpacity>

            <View className="flex-row items-center gap-3">
              <TouchableOpacity className="h-10 w-10 items-center justify-center"><Feather name="search" size={24} color="#8FA3C0" /></TouchableOpacity>
              <TouchableOpacity className="relative h-10 w-10 items-center justify-center"><Feather name="bell" size={24} color="#8FA3C0" /><View className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#22D3EE]" /></TouchableOpacity>
              <TouchableOpacity className="h-10 w-10 items-center justify-center" onPress={() => navigation.navigate('Settings')}><Feather name="settings" size={24} color="#8FA3C0" /></TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="h-px bg-[#1A2740]" />
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        <View className="mt-4 items-center rounded-xl border border-[#1F2C45] bg-[#0F1A2E] p-4">
          <View className="relative">
            <View className="h-24 w-24 items-center justify-center rounded-full bg-[#123250]"><Feather name="user" size={44} color="#8BD9FF" /></View>
            <TouchableOpacity className="absolute -bottom-1 -right-1 h-8 w-8 items-center justify-center rounded-full bg-[#1F9CFF] border-2 border-[#060D1A]"><Feather name="edit-2" size={14} color="#031529" /></TouchableOpacity>
          </View>

          <Text className="mt-3 text-[26px] font-bold text-[#EAF0F8]">João Silva</Text>
          <Text className="text-[14px] text-[#7E8FA8]">joao.silva@email.com</Text>

          <View className="mt-4 flex-row justify-between w-full">
            <View className="w-[31.5%] rounded-xl border border-[#24354F] bg-[#0C182B] p-3 items-center"><Text className="text-[22px] font-bold text-[#4FA0FF]">Jan{`\n`}2023</Text><Text className="mt-1 text-center text-[9px] font-bold text-[#7E8FA8] tracking-[1px]">MEMBRO{`\n`}DESDE</Text></View>
            <View className="w-[31.5%] rounded-xl border border-[#24354F] bg-[#0C182B] p-3 items-center"><Text className="text-[24px] font-bold text-[#4FA0FF]">24</Text><Text className="mt-1 text-center text-[9px] font-bold text-[#7E8FA8] tracking-[1px]">GARANTIAS</Text></View>
            <View className="w-[31.5%] rounded-xl border border-[#24354F] bg-[#0C182B] p-3 items-center"><Text className="text-[24px] font-bold text-[#4FA0FF]">R$ 1.2k</Text><Text className="mt-1 text-center text-[9px] font-bold text-[#7E8FA8] tracking-[1px]">ECONOMIA</Text></View>
          </View>
        </View>

        <Text className="mb-2 mt-5 text-[14px] font-bold tracking-[1.4px] text-[#8FA3C0]">MINHA CONTA</Text>

        <ProfileRow icon="user" title="Meus Dados" subtitle="Informações pessoais e contato" />
        <ProfileRow icon="file-text" title="Documentos Salvos" subtitle="Notas fiscais e certificados" />
        <ProfileRow icon="bar-chart" title="Estatísticas de Gastos" subtitle="Relatórios e economia mensal" />
        <ProfileRow icon="users" title="Compartilhamento Familiar" subtitle="Gerenciar membros e acessos" />
        <ProfileRow icon="shield" title="Segurança e Biometria" subtitle="Face ID e proteção de conta" />

        <TouchableOpacity activeOpacity={0.85} className="mt-3 h-12 flex-row items-center justify-center rounded-xl bg-[#3A1A22] border border-[#5F2530]">
          <Feather name="log-out" size={18} color="#F87171" />
          <Text className="ml-2 text-[16px] font-semibold text-[#F87171]">Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
