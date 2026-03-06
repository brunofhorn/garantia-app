import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddWarranty'>;

function FieldLabel({ children }: { children: string }) {
  return <Text className="mb-2 text-[13px] font-semibold tracking-[0.4px] text-[#8FA3C0]">{children}</Text>;
}

function DarkInput({ placeholder, icon }: { placeholder: string; icon?: keyof typeof Feather.glyphMap }) {
  return (
    <View className="h-12 flex-row items-center rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-3">
      <TextInput className="flex-1 text-[15px] text-[#EAF0F8]" placeholder={placeholder} placeholderTextColor="#6E7F9B" />
      {icon ? <Feather name={icon} size={16} color="#8EA0BA" /> : null}
    </View>
  );
}

function UploadBlock({ title, subtitle, icon }: { title: string; subtitle: string; icon: keyof typeof Feather.glyphMap }) {
  return (
    <TouchableOpacity activeOpacity={0.86} className="mb-4 rounded-xl border border-dashed border-[#2A8CFF]/60 bg-[#0F1A2E] px-4 py-8">
      <View className="items-center">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-[#132746]"><Feather name={icon} size={20} color="#4FA0FF" /></View>
        <Text className="mt-3 text-[16px] font-semibold text-[#EAF0F8]">{title}</Text>
        <Text className="mt-1 text-[13px] text-[#7E8FA8]">{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function AddWarrantyScreen({ navigation }: Props) {
  return (
    <View className="flex-1 bg-[#060D1A]">
      <View className="mx-3 mt-2 overflow-hidden rounded-t-3xl border border-[#1A2740] bg-[#0A1222]">
        <View className="px-5 py-5 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={navigation.goBack} className="h-9 w-9 items-center justify-center"><Feather name="arrow-left" size={20} color="#8FA3C0" /></TouchableOpacity>
            <Text className="ml-2 text-[18px] font-bold text-[#F8FAFC]">Nova Garantia</Text>
          </View>
          <TouchableOpacity className="h-9 w-9 items-center justify-center" onPress={() => navigation.navigate('Settings')}><Feather name="settings" size={20} color="#8FA3C0" /></TouchableOpacity>
        </View>
        <View className="h-px bg-[#1A2740]" />
      </View>

      <View className="mx-3 flex-1">
        <ScrollView className="flex-1 px-1 pt-4" contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
          <FieldLabel>Nome do Produto</FieldLabel>
          <DarkInput placeholder="Ex: Smartphone Samsung S23" />

          <View className="mt-4 mb-1 flex-row justify-between">
            <View className="w-[48%]"><FieldLabel>Data da Compra</FieldLabel><DarkInput placeholder="DD/MM/AAAA" icon="calendar" /></View>
            <View className="w-[48%]"><FieldLabel>Fim da Garantia</FieldLabel><DarkInput placeholder="DD/MM/AAAA" icon="calendar" /></View>
          </View>

          <View className="mt-2">
            <FieldLabel>Loja</FieldLabel>
            <DarkInput placeholder="Nome ou URL da loja" icon="shopping-bag" />
          </View>

          <View className="mt-4">
            <FieldLabel>Foto do Produto</FieldLabel>
            <UploadBlock title="Adicionar foto do produto" subtitle="Imagem clara para identificação" icon="image" />
          </View>

          <FieldLabel>Documento da Garantia</FieldLabel>
          <UploadBlock title="Enviar nota fiscal ou contrato" subtitle="PDF ou foto do comprovante" icon="file-text" />
        </ScrollView>

        <View className="pb-8">
          <TouchableOpacity activeOpacity={0.9} className="h-12 items-center justify-center rounded-xl bg-[#1BD5FF]" style={{ borderWidth: 3, borderColor: '#060D1A', shadowColor: '#00D4FF', shadowOpacity: 0.35, shadowRadius: 10, elevation: 6 }}>
            <Text className="text-[17px] font-bold text-[#031529]">Salvar Garantia</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
