import { useMemo, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'MyWarranties'>;

type WarrantyCategory = 'Todos' | 'Computadores' | 'Áudio' | 'Smartphones';

type WarrantyTechItem = {
  id: string;
  category: Exclude<WarrantyCategory, 'Todos'>;
  brand: string;
  product: string;
  expiryText: string;
  progress: number;
  status: 'ATIVO' | 'EXPIRADO';
  image: string;
};

const categories: WarrantyCategory[] = ['Todos', 'Computadores', 'Áudio', 'Smartphones'];

const techWarranties: WarrantyTechItem[] = [
  {
    id: '2',
    category: 'Computadores',
    brand: 'APPLE INC.',
    product: 'MacBook Pro M2 - 14"',
    expiryText: 'Expira em 14 meses',
    progress: 0.72,
    status: 'ATIVO',
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '1',
    category: 'Áudio',
    brand: 'SONY MOBILE',
    product: 'Headphones WH-1000XM5',
    expiryText: 'Expira em 3 meses',
    progress: 0.2,
    status: 'ATIVO',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '3',
    category: 'Smartphones',
    brand: 'SAMSUNG',
    product: 'Galaxy S22 Ultra',
    expiryText: 'Expirou em Jan 2024',
    progress: 1,
    status: 'EXPIRADO',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80',
  },
];

function TechWarrantyCard({ item, onPress }: { item: WarrantyTechItem; onPress: () => void }) {
  const isExpired = item.status === 'EXPIRADO';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="mb-3 rounded-xl border border-[#22314D] bg-[#0F1A2E] p-3"
    >
      <View className="flex-row">
        <Image source={{ uri: item.image }} className="h-16 w-16 rounded-lg" />

        <View className="ml-3 flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-[11px] font-bold tracking-[1.2px] text-[#2F90FF]">{item.brand}</Text>
            <View className={`rounded-md px-2 py-1 ${isExpired ? 'bg-[#3A1F2A]' : 'bg-[#113326]'}`}>
              <Text className={`text-[10px] font-bold ${isExpired ? 'text-[#F87171]' : 'text-[#22C55E]'}`}>{item.status}</Text>
            </View>
          </View>

          <Text className="mt-0.5 text-[16px] font-bold text-[#F8FAFC]">{item.product}</Text>
          <Text className="mt-0.5 text-[14px] text-[#7D8FA8]">{item.expiryText}</Text>
        </View>
      </View>

      <View className="mt-3 h-1.5 rounded-full bg-[#1D2A41]">
        <View
          className="h-1.5 rounded-full"
          style={{ width: `${Math.max(10, item.progress * 100)}%`, backgroundColor: isExpired ? '#D9465F' : '#1F9CFF' }}
        />
      </View>
    </TouchableOpacity>
  );
}

export function MyWarrantiesScreen({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<WarrantyCategory>('Todos');

  const filteredWarranties = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return techWarranties;
    }

    return techWarranties.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <View className="flex-1 bg-[#060D1A]">
      <View className="mx-3 mt-2 overflow-hidden rounded-t-3xl border border-[#1A2740] bg-[#0A1222]">
        <View className="px-5 py-5">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('UserProfile')} className="flex-row items-center">
              <View className="h-12 w-12 rounded-full border border-[#1DE2FF]/60 bg-[#0E243D] p-0.5">
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&w=200&q=80' }}
                  className="h-full w-full rounded-full"
                />
              </View>
              <View className="ml-4">
                <Text className="text-[11px] font-semibold tracking-[1.2px] text-[#5F7391]">BEM-VINDO</Text>
                <Text className="text-[18px] font-bold text-[#F8FAFC]">Garantias</Text>
              </View>
            </TouchableOpacity>

            <View className="flex-row items-center gap-3">
              <TouchableOpacity className="h-10 w-10 items-center justify-center"><Feather name="search" size={24} color="#8FA3C0" /></TouchableOpacity>
              <TouchableOpacity className="relative h-10 w-10 items-center justify-center">
                <Feather name="bell" size={24} color="#8FA3C0" />
                <View className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#22D3EE]" />
              </TouchableOpacity>
              <TouchableOpacity className="h-10 w-10 items-center justify-center" onPress={() => navigation.navigate('Settings')}>
                <Feather name="settings" size={24} color="#8FA3C0" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="h-px bg-[#1A2740]" />
      </View>

      <ScrollView className="flex-1 px-3" contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View className="mb-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingRight: 12 }}>
            {categories.map((category) => {
              const selected = category === selectedCategory;

              return (
                <TouchableOpacity
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  activeOpacity={0.85}
                  className={`rounded-full border px-4 py-2 ${selected ? 'border-[#19D6FF] bg-[#123350]' : 'border-[#24354F] bg-[#0F1A2E]'}`}
                >
                  <Text className={`text-[13px] font-semibold ${selected ? 'text-[#19D6FF]' : 'text-[#7D8FA8]'}`}>{category}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View>
          {filteredWarranties.map((item) => (
            <TechWarrantyCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate('WarrantyDetails', { warrantyId: item.id })}
            />
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-24 left-0 right-0 items-center">
        <TouchableOpacity
          onPress={() => navigation.navigate('AddWarranty')}
          activeOpacity={0.9}
          className="h-16 w-16 items-center justify-center rounded-full bg-[#1BD5FF]"
          style={{ borderWidth: 4, borderColor: '#060D1A', shadowColor: '#00D4FF', shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 }}
        >
          <Feather name="plus" size={30} color="#031529" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
