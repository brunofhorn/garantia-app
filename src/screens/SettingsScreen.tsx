import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { AnimatedEntrance } from '../components/AnimatedEntrance';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

type RowProps = {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle?: string;
  danger?: boolean;
  showSwitch?: boolean;
  onPress?: () => void;
};

function DarkSectionTitle({ label }: { label: string }) {
  return <Text className="mb-2 mt-4 text-[14px] font-bold tracking-[1.4px] text-[#8FA3C0]">{label}</Text>;
}

function DarkRow({ icon, title, subtitle, danger, showSwitch, onPress }: RowProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={showSwitch}
      className="mb-2 flex-row items-center rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-3 py-3"
    >
      <View className={`h-10 w-10 items-center justify-center rounded-lg ${danger ? 'bg-[#3A1A22]' : 'bg-[#132746]'}`}>
        <Feather name={icon} size={18} color={danger ? '#F87171' : '#4FA0FF'} />
      </View>

      <View className="ml-3 flex-1">
        <Text className={`text-[15px] font-semibold ${danger ? 'text-[#F87171]' : 'text-[#EAF0F8]'}`}>{title}</Text>
        {subtitle ? <Text className="mt-0.5 text-[12px] text-[#7E8FA8]">{subtitle}</Text> : null}
      </View>

      {showSwitch ? (
        <View className="h-7 w-12 rounded-full bg-[#1F9CFF] p-1">
          <View className="ml-auto h-5 w-5 rounded-full bg-white" />
        </View>
      ) : (
        <Feather name="chevron-right" size={18} color="#8EA0BA" />
      )}
    </TouchableOpacity>
  );
}

function CloudChip({ label }: { label: string }) {
  return (
    <TouchableOpacity activeOpacity={0.85} className="w-[31.5%] items-center rounded-xl border border-[#1F2C45] bg-[#0F1A2E] py-3">
      <Feather name="cloud" size={15} color="#4FA0FF" />
      <Text className="mt-1 text-[9px] font-semibold text-[#8EA0BA]">{label}</Text>
    </TouchableOpacity>
  );
}

export function SettingsScreen({ navigation }: Props) {
  const goToStack = (screen: string) => navigation.navigate(screen as never);

  return (
    <View className="flex-1 bg-[#060D1A]">
      <View className="mx-3 mt-2 overflow-hidden rounded-t-3xl border border-[#1A2740] bg-[#0A1222]">
        <View className="px-5 py-5">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('UserProfile')} className="flex-row items-center">
              <View className="h-12 w-12 items-center justify-center rounded-full border border-[#1DE2FF]/60 bg-[#0E243D]">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-[#112C4A]"><Feather name="user" size={20} color="#8BD9FF" /></View>
              </View>
              <View className="ml-4">
                <Text className="text-[11px] font-semibold tracking-[1.2px] text-[#5F7391]">BEM-VINDO</Text>
                <Text className="text-[18px] font-bold text-[#F8FAFC]">Configurações</Text>
              </View>
            </TouchableOpacity>

            <View className="flex-row items-center gap-3">
              <TouchableOpacity className="h-10 w-10 items-center justify-center"><Feather name="search" size={24} color="#8FA3C0" /></TouchableOpacity>
              <TouchableOpacity className="relative h-10 w-10 items-center justify-center"><Feather name="bell" size={24} color="#8FA3C0" /><View className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#22D3EE]" /></TouchableOpacity>
              <TouchableOpacity className="h-10 w-10 items-center justify-center" onPress={() => navigation.goBack()}><Feather name="arrow-left" size={22} color="#8FA3C0" /></TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="h-px bg-[#1A2740]" />
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        <AnimatedEntrance delay={20}>
          <DarkSectionTitle label="MINHA CONTA" />
          <DarkRow icon="user" title="Editar Perfil" onPress={() => goToStack('EditProfile')} />
          <DarkRow icon="lock" title="Alterar Senha" onPress={() => goToStack('ChangePassword')} />
          <DarkRow icon="log-out" title="Sair" danger />
        </AnimatedEntrance>

        <AnimatedEntrance delay={60}>
          <DarkSectionTitle label="EXPORTAÇÃO E BACKUP" />
          <DarkRow icon="download" title="Exportar todos os comprovantes" subtitle="Gerar PDF consolidado com todos documentos" />
          <DarkRow icon="refresh-cw" title="Sincronização na Nuvem" subtitle="Último backup: há 2 horas" />
          <View className="mb-2 flex-row justify-between"><CloudChip label="GOOGLE DRIVE" /><CloudChip label="ICLOUD" /><CloudChip label="ONEDRIVE" /></View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={100}>
          <DarkSectionTitle label="NOTIFICAÇÕES" />
          <DarkRow icon="bell" title="Ativar Notificações" showSwitch />
          <DarkRow icon="clock" title="Frequência dos Lembretes" subtitle="7 dias antes" />
          <DarkRow icon="bell" title="Tipo de Notificação" subtitle="Push, E-mail" />
          <DarkRow icon="sliders" title="Lembretes Personalizados" subtitle="Ajustes por garantia" />
        </AnimatedEntrance>

        <AnimatedEntrance delay={140}>
          <DarkSectionTitle label="PREFERÊNCIAS DO APLICATIVO" />
          <DarkRow icon="circle" title="Tema" subtitle="Padrão do Sistema" />
          <DarkRow icon="globe" title="Idioma" subtitle="Português (Brasil)" />
          <DarkRow icon="calendar" title="Formato de Data" subtitle="DD/MM/AAAA" />
        </AnimatedEntrance>

        <AnimatedEntrance delay={180}>
          <DarkSectionTitle label="SUPORTE" />
          <DarkRow icon="help-circle" title="Ajuda e FAQ" />
          <DarkRow icon="message-square" title="Enviar Feedback" />
        </AnimatedEntrance>

        <AnimatedEntrance delay={220}>
          <DarkSectionTitle label="SOBRE" />
          <DarkRow icon="file-text" title="Termos de Uso e Política de Privacidade" />
        </AnimatedEntrance>

        <Text className="mt-6 text-center text-[14px] text-[#6E7F9B]">Versão do Aplicativo 1.0.0</Text>
      </ScrollView>
    </View>
  );
}
