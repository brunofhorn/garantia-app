import { ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { AppHeader } from '../components/AppHeader';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { UploadCard } from '../components/UploadCard';
import { RootStackParamList } from '../types';
import { AnimatedEntrance } from '../components/AnimatedEntrance';

type Props = NativeStackScreenProps<RootStackParamList, 'AddWarranty'>;

export function AddWarrantyScreen({ navigation }: Props) {
  return (
    <View className="flex-1 bg-appBg">
      <AppHeader title="Adicionar Nova Garantia" onBack={navigation.goBack} />

      <ScrollView className="flex-1 px-4 pt-5" contentContainerStyle={{ paddingBottom: 24 }}>
        <AnimatedEntrance delay={20}>
          <InputField label="Nome do Produto" placeholder="Ex: Smartphone Samsung S23" />
        </AnimatedEntrance>

        <AnimatedEntrance delay={80}>
          <View className="mb-5 flex-row justify-between">
            <View className="w-[48%]">
              <Text className="mb-2 text-[17px] font-semibold text-appText">Data da Compra</Text>
              <View className="h-14 flex-row items-center rounded-2xl border border-appBorder bg-[#F7F7F8] px-4">
                <Text className="flex-1 text-[18px] text-[#111827]">mm/dd/yyyy</Text>
                <Feather name="calendar" size={22} color="#111827" />
              </View>
            </View>
            <View className="w-[48%]">
              <Text className="mb-2 text-[17px] font-semibold text-appText">Fim da Garantia</Text>
              <View className="h-14 flex-row items-center rounded-2xl border border-appBorder bg-[#F7F7F8] px-4">
                <Text className="flex-1 text-[18px] text-[#111827]">mm/dd/yyyy</Text>
                <Feather name="calendar" size={22} color="#111827" />
              </View>
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={120}>
          <View className="mb-5">
            <Text className="mb-2 text-[17px] font-semibold text-appText">Loja</Text>
            <View className="h-14 flex-row items-center rounded-2xl border border-appBorder bg-[#F7F7F8] px-4">
              <Text className="flex-1 text-[18px] text-appMuted">Nome ou URL da loja</Text>
              <View className="h-10 w-10 items-center justify-center rounded-full bg-[#E5E7EB]">
                <Feather name="shopping-bag" size={20} color="#7C7F8B" />
              </View>
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={160}>
          <Text className="mb-2 text-[17px] font-semibold text-appText">Foto do Produto</Text>
          <UploadCard title="Toque para adicionar uma foto" subtitle="Adicione uma imagem clara do seu produto." icon="image" />
        </AnimatedEntrance>

        <AnimatedEntrance delay={210}>
          <Text className="mb-2 text-[17px] font-semibold text-appText">Documento da Garantia</Text>
          <UploadCard title="Tire uma foto do documento" subtitle="Fotografe a nota fiscal ou o contrato." icon="file-text" />
        </AnimatedEntrance>
      </ScrollView>

      <View className="px-4 pb-8">
        <PrimaryButton title="Salvar" />
      </View>
    </View>
  );
}
