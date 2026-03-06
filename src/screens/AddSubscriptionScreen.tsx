import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StandardPageHeader } from '../components/StandardPageHeader';

const categories = ['Streaming', 'Software', 'Educação', 'Outros'];

function FieldLabel({ children }: { children: string }) {
  return <Text className="mb-2 text-[14px] font-semibold text-[#334155]">{children}</Text>;
}

export function AddSubscriptionScreen({ navigation }: { navigation: any }) {
  const [selectedCategory, setSelectedCategory] = useState('Streaming');

  return (
    <View className="flex-1 bg-[#E5E7EB]">
      <StandardPageHeader title="Cadastro de Assinatura" navigation={navigation} showBack />

      <View className="mx-3 flex-1 rounded-2xl border border-[#D7DCE4] bg-white px-4 pt-3 pb-6">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 16 }}>
          <FieldLabel>Serviço</FieldLabel>
          <View className="mb-1 h-12 flex-row items-center rounded-lg border border-[#D7DCE4] bg-[#F8FAFC] px-3"><View className="h-6 w-6 items-center justify-center rounded-md bg-[#E7F0FF]"><Feather name="home" size={13} color="#1D74D8" /></View><TextInput className="ml-2 flex-1 text-[15px] text-[#0F172A]" placeholder="Ex: Netflix, Spotify, iCloud" placeholderTextColor="#94A3B8" /><Feather name="search" size={16} color="#94A3B8" /></View>
          <Text className="mb-4 text-[12px] italic text-[#94A3B8]">Dica: Digite o nome para carregar o ícone automaticamente.</Text>

          <View className="mb-4 flex-row justify-between">
            <View className="w-[47%]"><FieldLabel>Valor</FieldLabel><View className="h-12 flex-row items-center rounded-lg border border-[#D7DCE4] bg-[#F8FAFC] px-3"><Text className="text-[24px] font-semibold text-[#64748B]">R$</Text><TextInput className="ml-2 flex-1 text-[15px] text-[#0F172A]" placeholder="0,00" placeholderTextColor="#94A3B8" /></View></View>
            <View className="w-[47%]"><FieldLabel>Frequência</FieldLabel><TouchableOpacity className="h-12 flex-row items-center justify-between rounded-lg border border-[#D7DCE4] bg-[#F8FAFC] px-3" activeOpacity={0.85}><Text className="text-[15px] text-[#334155]">Mensal</Text><Feather name="chevron-down" size={18} color="#94A3B8" /></TouchableOpacity></View>
          </View>

          <FieldLabel>Próxima Cobrança</FieldLabel>
          <View className="mb-4 h-12 flex-row items-center rounded-lg border border-[#D7DCE4] bg-[#F8FAFC] px-3"><TextInput className="flex-1 text-[15px] text-[#0F172A]" placeholder="DD/MM/AAAA" placeholderTextColor="#94A3B8" /><Feather name="calendar" size={16} color="#94A3B8" /></View>

          <FieldLabel>Método de Pagamento</FieldLabel>
          <View className="mb-4 h-12 flex-row items-center rounded-lg border border-[#D7DCE4] bg-[#F8FAFC] px-3"><TextInput className="flex-1 text-[15px] text-[#0F172A]" placeholder="Ex: Cartão Visa final 4422" placeholderTextColor="#94A3B8" /><Feather name="credit-card" size={16} color="#94A3B8" /></View>

          <FieldLabel>Categoria</FieldLabel>
          <View className="mb-6 flex-row flex-wrap gap-2">
            {categories.map((category) => {
              const selected = selectedCategory === category;
              return <TouchableOpacity key={category} activeOpacity={0.85} onPress={() => setSelectedCategory(category)} className={`rounded-full px-4 py-2 ${selected ? 'bg-[#2583E5]' : 'bg-[#E8EDF4]'}`}><Text className={`text-[14px] font-semibold ${selected ? 'text-white' : 'text-[#64748B]'}`}>{category}</Text></TouchableOpacity>;
            })}
          </View>

          <TouchableOpacity activeOpacity={0.9} className="h-12 items-center justify-center rounded-xl bg-[#2583E5]" style={{ elevation: 2 }}><Text className="text-[19px] font-bold text-white">Salvar Assinatura</Text></TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
