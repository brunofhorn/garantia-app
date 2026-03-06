import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { RootStackParamList } from '../types';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { StandardPageHeader } from '../components/StandardPageHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export function EditProfileScreen({ navigation }: Props) {
  return (
    <View className="flex-1 bg-[#E5E7EB]">
      <StandardPageHeader title="Editar Perfil" navigation={navigation} showBack />

      <View className="mx-3 flex-1 rounded-2xl border border-[#D7DCE4] bg-[#F4F6F9] px-4 pt-5">
        <AnimatedEntrance delay={20}>
          <View className="mb-5 items-center">
            <View className="h-40 w-40 rounded-full border-4 border-[#ECEDEF]" />
            <View className="-mt-10 ml-24 h-12 w-12 items-center justify-center rounded-full bg-appPrimary" style={{ elevation: 2 }}>
              <Feather name="camera" size={22} color="#fff" />
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={80}><InputField label="Nome Completo" placeholder="João da Silva" /></AnimatedEntrance>
        <AnimatedEntrance delay={120}><InputField label="E-mail" placeholder="joao.silva@email.com" /></AnimatedEntrance>
        <AnimatedEntrance delay={160}><InputField label="Telefone" placeholder="(11) 98765-4321" /></AnimatedEntrance>

        <View className="pb-4"><PrimaryButton title="Salvar Alterações" /></View>

        <View className="mb-4 flex-row items-center rounded-2xl bg-[#16A34A] p-4" style={{ elevation: 2 }}>
          <Feather name="check-circle" size={28} color="#fff" />
          <Text className="ml-3 flex-1 text-[17px] text-white">Seu perfil foi atualizado com sucesso!</Text>
          <Feather name="x" size={24} color="#A7F3D0" />
        </View>

        <Text className="pb-6 text-center text-[17px] font-medium text-[#DC2626]">Excluir minha conta</Text>
      </View>
    </View>
  );
}
