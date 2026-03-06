import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StandardPageHeader } from '../components/StandardPageHeader';

function FieldLabel({ children }: { children: string }) {
  return <Text className="mb-2 text-[14px] font-semibold text-[#334155]">{children}</Text>;
}

export function AddDocumentScreen({ navigation }: { navigation: any }) {
  const [isPermanent, setIsPermanent] = useState(false);

  return (
    <View className="flex-1 bg-[#E5E7EB]">
      <StandardPageHeader title="Cadastro de Documento" navigation={navigation} showBack />

      <View className="mx-3 flex-1 rounded-2xl border border-[#D7DCE4] bg-white px-4 pt-3 pb-6">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View className="mb-4 items-center rounded-2xl border border-dashed border-[#93C5FD] bg-[#F8FBFF] px-4 py-6">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-[#DBEAFE]"><Feather name="camera" size={24} color="#2563EB" /></View>
            <Text className="mt-3 text-[22px] font-semibold text-[#1E293B]">Adicionar Foto ou Arquivo</Text>
            <Text className="mt-1 text-[14px] text-[#64748B]">Tire uma foto ou selecione um PDF</Text>
            <Pressable className="mt-4 h-10 rounded-lg bg-[#2583E5] px-7 items-center justify-center" android_ripple={{ color: '#1D6FC2' }}><Text className="text-[16px] font-semibold text-white">Selecionar</Text></Pressable>
          </View>

          <FieldLabel>Tipo de Documento</FieldLabel>
          <TouchableOpacity activeOpacity={0.85} className="mb-4 h-12 flex-row items-center justify-between rounded-lg border border-[#D7DCE4] bg-[#F8FAFC] px-3"><Text className="text-[15px] text-[#475569]">Selecione o tipo</Text><Feather name="chevron-down" size={18} color="#94A3B8" /></TouchableOpacity>

          <FieldLabel>Nome ou Apelido</FieldLabel>
          <TextInput className="mb-4 h-12 rounded-lg border border-[#D7DCE4] bg-[#F8FAFC] px-3 text-[15px] text-[#0F172A]" placeholder="Ex: Meu RG Principal" placeholderTextColor="#94A3B8" />

          <FieldLabel>Número do Documento</FieldLabel>
          <TextInput className="mb-4 h-12 rounded-lg border border-[#D7DCE4] bg-[#F8FAFC] px-3 text-[15px] text-[#0F172A]" placeholder="00.000.000-0" placeholderTextColor="#94A3B8" />

          <View className="mb-4 flex-row justify-between">
            <View className="w-[48%]"><FieldLabel>Data de Emissão</FieldLabel><View className="h-12 flex-row items-center rounded-lg border border-[#D7DCE4] bg-[#F8FAFC] px-3"><TextInput className="flex-1 text-[15px] text-[#0F172A]" placeholder="mm/dd/yyyy" placeholderTextColor="#94A3B8" /><Feather name="calendar" size={16} color="#0F172A" /></View></View>
            <View className="w-[48%]"><FieldLabel>Data de Validade</FieldLabel><View className="h-12 flex-row items-center rounded-lg border border-[#D7DCE4] bg-[#F8FAFC] px-3"><TextInput className="flex-1 text-[15px] text-[#0F172A]" placeholder="mm/dd/yyyy" placeholderTextColor="#94A3B8" /><Feather name="calendar" size={16} color="#0F172A" /></View></View>
          </View>

          <View className="mb-5 flex-row items-center justify-between">
            <View><Text className="text-[16px] font-semibold text-[#334155]">Documento Permanente</Text><Text className="text-[12px] text-[#94A3B8]">Não possui data de validade</Text></View>
            <Switch value={isPermanent} onValueChange={setIsPermanent} trackColor={{ false: '#D1D5DB', true: '#93C5FD' }} thumbColor={isPermanent ? '#2583E5' : '#F8FAFC'} />
          </View>

          <TouchableOpacity activeOpacity={0.9} className="h-12 items-center justify-center rounded-xl bg-[#2583E5]" style={{ elevation: 2 }}><Text className="text-[19px] font-bold text-white">Salvar Documento</Text></TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
