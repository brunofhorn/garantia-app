import { ScrollView, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { SectionHeader } from '../components/SectionHeader';
import { SettingsRow } from '../components/SettingsRow';
import { AnimatedEntrance } from '../components/AnimatedEntrance';

export function SettingsScreen({ navigation }: { navigation: any }) {
  const goToStack = (screen: string) => {
    navigation.getParent()?.navigate(screen as never);
  };

  return (
    <View className="flex-1 bg-appBg">
      <AppHeader title="Configurações" />

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <AnimatedEntrance delay={30}>
          <View className="mt-4">
            <SectionHeader label="Minha Conta" />
            <SettingsRow icon="user" title="Editar Perfil" onPress={() => goToStack('EditProfile')} />
            <SettingsRow icon="lock" title="Alterar Senha" onPress={() => goToStack('ChangePassword')} />
            <SettingsRow icon="log-out" title="Sair" danger />
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={90}>
          <View className="mt-4">
            <SectionHeader label="Notificações" />
            <SettingsRow icon="bell" title="Lembretes de Garantia" showSwitch />
            <SettingsRow icon="clock" title="Frequência" subtitle="30 dias antes" />
            <SettingsRow icon="bell" title="Tipo de Notificação" subtitle="Push, E-mail" />
            <SettingsRow icon="sliders" title="Lembretes Personalizados" subtitle="Ajustes por garantia" />
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={130}>
          <View className="mt-4">
            <SectionHeader label="Preferências do Aplicativo" />
            <SettingsRow icon="circle" title="Tema" subtitle="Padrão do Sistema" />
            <SettingsRow icon="globe" title="Idioma" subtitle="Português (Brasil)" />
            <SettingsRow icon="calendar" title="Formato de Data" subtitle="DD/MM/AAAA" />
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={170}>
          <View className="mt-4">
            <SectionHeader label="Suporte" />
            <SettingsRow icon="help-circle" title="Ajuda e FAQ" />
            <SettingsRow icon="message-square" title="Enviar Feedback" />
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={210}>
          <View className="mt-4">
            <SectionHeader label="Sobre" />
            <SettingsRow icon="file-text" title="Termos de Uso e Política de Privacidade" />
          </View>
        </AnimatedEntrance>

        <Text className="mt-7 text-center text-[16px] text-appMuted">Versão do Aplicativo 1.0.0</Text>
      </ScrollView>
    </View>
  );
}
