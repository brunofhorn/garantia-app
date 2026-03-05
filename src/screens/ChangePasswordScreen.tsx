import { ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppHeader } from '../components/AppHeader';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { RootStackParamList } from '../types';
import { AnimatedEntrance } from '../components/AnimatedEntrance';

type Props = NativeStackScreenProps<RootStackParamList, 'ChangePassword'>;

export function ChangePasswordScreen({ navigation }: Props) {
  return (
    <View className="flex-1 bg-appBg">
      <AppHeader title="Alterar Senha" onBack={navigation.goBack} />

      <ScrollView className="flex-1 px-4 pt-5" contentContainerStyle={{ paddingBottom: 24 }}>
        <AnimatedEntrance delay={20}>
          <InputField label="Senha Atual" placeholder="Digite sua senha atual" icon="eye" />
        </AnimatedEntrance>
        <AnimatedEntrance delay={80}>
          <InputField
            label="Nova Senha"
            placeholder="Digite sua nova senha"
            icon="eye"
            multilineHint="Mínimo de 8 caracteres, incluindo letras e números."
          />
        </AnimatedEntrance>
        <AnimatedEntrance delay={130}>
          <InputField label="Confirmar Nova Senha" placeholder="Confirme sua nova senha" icon="eye" />
        </AnimatedEntrance>
      </ScrollView>

      <View className="px-4 pb-8">
        <PrimaryButton title="Atualizar Senha" />
      </View>
    </View>
  );
}
