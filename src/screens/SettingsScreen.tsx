import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { SectionHeader } from '../components/SectionHeader';
import { SettingsRow } from '../components/SettingsRow';
import { RootStackParamList } from '../types';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { StandardPageHeader } from '../components/StandardPageHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

function BackupRow({
  icon,
  title,
  subtitle,
}: {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
}) {
  return (
    <TouchableOpacity activeOpacity={0.85} className="flex-row items-center border-b border-appBorder bg-[#F7F7F8] px-4 py-3">
      <View className="h-12 w-12 items-center justify-center rounded-xl bg-[#ECEDEF]">
        <Feather name={icon} size={22} color="#111827" />
      </View>

      <View className="ml-3 flex-1">
        <Text className="text-[16px] font-semibold text-appText">{title}</Text>
        <Text className="mt-1 text-[13px] text-appMuted">{subtitle}</Text>
      </View>

      <Feather name="chevron-right" size={20} color="#6B7280" />
    </TouchableOpacity>
  );
}

function CloudButton({ label }: { label: string }) {
  return (
    <TouchableOpacity activeOpacity={0.85} className="w-[31.5%] items-center rounded-xl border border-appBorder bg-[#F7F7F8] py-3">
      <Feather name="cloud" size={16} color="#2563EB" />
      <Text className="mt-1 text-[9px] font-semibold text-[#64748B]">{label}</Text>
    </TouchableOpacity>
  );
}

export function SettingsScreen({ navigation }: Props) {
  const goToStack = (screen: string) => {
    navigation.navigate(screen as never);
  };

  return (
    <View className="flex-1 bg-[#E5E7EB]">
      <StandardPageHeader title="Configurações" navigation={navigation} showBack />

      <View className="mx-3 flex-1 rounded-2xl border border-[#D7DCE4] bg-[#F4F6F9]">
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
          <AnimatedEntrance delay={30}>
            <View className="mt-4">
              <SectionHeader label="Minha Conta" />
              <SettingsRow icon="user" title="Editar Perfil" onPress={() => goToStack('EditProfile')} />
              <SettingsRow icon="lock" title="Alterar Senha" onPress={() => goToStack('ChangePassword')} />
              <SettingsRow icon="log-out" title="Sair" danger />
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={70}>
            <View className="mt-4">
              <SectionHeader label="Exportação e Backup" />
              <BackupRow icon="download" title="Exportar todos os comprovantes" subtitle="Gerar PDF consolidado com todos documentos" />
              <BackupRow icon="refresh-cw" title="Sincronização na Nuvem" subtitle="Último backup: há 2 horas" />

              <View className="flex-row justify-between border-b border-appBorder bg-[#F7F7F8] px-4 py-3">
                <CloudButton label="GOOGLE DRIVE" />
                <CloudButton label="ICLOUD" />
                <CloudButton label="ONEDRIVE" />
              </View>
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={110}>
            <View className="mt-4">
              <SectionHeader label="Notificações" />
              <SettingsRow icon="bell" title="Ativar Notificações" showSwitch />
              <SettingsRow icon="clock" title="Frequência dos Lembretes" subtitle="7 dias antes" />
              <SettingsRow icon="bell" title="Tipo de Notificação" subtitle="Push, E-mail" />
              <SettingsRow icon="sliders" title="Lembretes Personalizados" subtitle="Ajustes por garantia" />
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={150}>
            <View className="mt-4">
              <SectionHeader label="Preferências do Aplicativo" />
              <SettingsRow icon="circle" title="Tema" subtitle="Padrão do Sistema" />
              <SettingsRow icon="globe" title="Idioma" subtitle="Português (Brasil)" />
              <SettingsRow icon="calendar" title="Formato de Data" subtitle="DD/MM/AAAA" />
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={190}>
            <View className="mt-4">
              <SectionHeader label="Suporte" />
              <SettingsRow icon="help-circle" title="Ajuda e FAQ" />
              <SettingsRow icon="message-square" title="Enviar Feedback" />
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={230}>
            <View className="mt-4">
              <SectionHeader label="Sobre" />
              <SettingsRow icon="file-text" title="Termos de Uso e Política de Privacidade" />
            </View>
          </AnimatedEntrance>

          <Text className="mt-7 text-center text-[16px] text-appMuted">Versão do Aplicativo 1.0.0</Text>
        </ScrollView>
      </View>
    </View>
  );
}
