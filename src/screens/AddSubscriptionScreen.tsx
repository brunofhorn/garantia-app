import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const categories = ['Streaming', 'Software', 'Educação', 'Outros'];

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

export function AddSubscriptionScreen({ navigation }: { navigation: any }) {
  const [selectedCategory, setSelectedCategory] = useState('Streaming');

  return (
    <View className="flex-1 bg-[#060D1A]">
      <View className="mx-3 mt-2 overflow-hidden rounded-t-3xl border border-[#1A2740] bg-[#0A1222]">
        <View className="px-5 py-5 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={navigation.goBack} className="h-9 w-9 items-center justify-center"><Feather name="arrow-left" size={20} color="#8FA3C0" /></TouchableOpacity>
            <Text className="ml-2 text-[18px] font-bold text-[#F8FAFC]">Nova Assinatura</Text>
          </View>
          <TouchableOpacity className="h-9 w-9 items-center justify-center" onPress={() => navigation.navigate('Settings')}><Feather name="settings" size={20} color="#8FA3C0" /></TouchableOpacity>
        </View>
        <View className="h-px bg-[#1A2740]" />
      </View>

      <View className="mx-3 flex-1">
        <ScrollView className="flex-1 px-1 pt-4" contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
          <FieldLabel>Serviço</FieldLabel>
          <View className="h-12 flex-row items-center rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-3"><View className="h-6 w-6 items-center justify-center rounded-md bg-[#132746]"><Feather name="home" size={13} color="#4FA0FF" /></View><TextInput className="ml-2 flex-1 text-[15px] text-[#EAF0F8]" placeholder="Ex: Netflix, Spotify, iCloud" placeholderTextColor="#6E7F9B" /><Feather name="search" size={16} color="#8EA0BA" /></View>
          <Text className="mb-4 mt-1 text-[12px] italic text-[#6E7F9B]">Dica: Digite o nome para carregar o ícone automaticamente.</Text>

          <View className="mb-4 flex-row justify-between">
            <View className="w-[47%]"><FieldLabel>Valor</FieldLabel><View className="h-12 flex-row items-center rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-3"><Text className="text-[16px] font-semibold text-[#8EA0BA]">R$</Text><TextInput className="ml-2 flex-1 text-[15px] text-[#EAF0F8]" placeholder="0,00" placeholderTextColor="#6E7F9B" /></View></View>
            <View className="w-[47%]"><FieldLabel>Frequência</FieldLabel><TouchableOpacity activeOpacity={0.85} className="h-12 flex-row items-center justify-between rounded-xl border border-[#1F2C45] bg-[#0F1A2E] px-3"><Text className="text-[15px] text-[#EAF0F8]">Mensal</Text><Feather name="chevron-down" size={17} color="#8EA0BA" /></TouchableOpacity></View>
          </View>

          <FieldLabel>Próxima Cobrança</FieldLabel>
          <DarkInput placeholder="DD/MM/AAAA" icon="calendar" />

          <View className="mt-3">
            <FieldLabel>Método de Pagamento</FieldLabel>
            <DarkInput placeholder="Ex: Cartão Visa final 4422" icon="credit-card" />
          </View>

          <FieldLabel>Categoria</FieldLabel>
          <View className="mb-6 flex-row flex-wrap gap-2">
            {categories.map((category) => {
              const selected = selectedCategory === category;
              return (
                <TouchableOpacity key={category} activeOpacity={0.85} onPress={() => setSelectedCategory(category)} className={`rounded-full px-4 py-2 border ${selected ? 'border-[#19D6FF] bg-[#123350]' : 'border-[#24354F] bg-[#0F1A2E]'}`}>
                  <Text className={`text-[13px] font-semibold ${selected ? 'text-[#19D6FF]' : 'text-[#7E8FA8]'}`}>{category}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View className="pb-8">
          <TouchableOpacity activeOpacity={0.9} className="h-12 items-center justify-center rounded-xl bg-[#1BD5FF]" style={{ borderWidth: 3, borderColor: '#060D1A', shadowColor: '#00D4FF', shadowOpacity: 0.35, shadowRadius: 10, elevation: 6 }}>
            <Text className="text-[17px] font-bold text-[#031529]">Salvar Assinatura</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
