import { ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { RootStackParamList } from '../types';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { StandardPageHeader } from '../components/StandardPageHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'ChangePassword'>;

export function ChangePasswordScreen({ navigation }: Props) {
  return (
    <View className="flex-1 bg-[#E5E7EB]">
      <StandardPageHeader title="Alterar Senha" navigation={navigation} showBack />

      <View className="mx-3 flex-1 rounded-2xl border border-[#D7DCE4] bg-[#F4F6F9] px-4 pt-5">
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
          <AnimatedEntrance delay={20}><InputField label="Senha Atual" placeholder="Digite sua senha atual" icon="eye" /></AnimatedEntrance>
          <AnimatedEntrance delay={80}><InputField label="Nova Senha" placeholder="Digite sua nova senha" icon="eye" multilineHint="Mínimo de 8 caracteres, incluindo letras e números." /></AnimatedEntrance>
          <AnimatedEntrance delay={130}><InputField label="Confirmar Nova Senha" placeholder="Confirme sua nova senha" icon="eye" /></AnimatedEntrance>
        </ScrollView>

        <View className="pb-8"><PrimaryButton title="Atualizar Senha" /></View>
      </View>
    </View>
  );
}
