import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { warranties } from '../data/mockData';
import { AnimatedEntrance } from '../components/AnimatedEntrance';
import { StandardPageHeader } from '../components/StandardPageHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'WarrantyDetails'>;

export function WarrantyDetailsScreen({ navigation, route }: Props) {
  const warranty = warranties.find((item) => item.id === route.params.warrantyId) ?? warranties[0];

  return (
    <View className="flex-1 bg-[#E5E7EB]">
      <StandardPageHeader title="Detalhes da Garantia" navigation={navigation} showBack />

      <View className="mx-3 flex-1 rounded-2xl border border-[#D7DCE4] bg-[#F4F6F9] px-4">
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
          <AnimatedEntrance delay={30}>
            <View className="mt-3 flex-row justify-end gap-2">
              <TouchableOpacity className="h-9 w-9 items-center justify-center rounded-lg bg-white border border-appBorder"><Feather name="edit-2" size={18} color="#111827" /></TouchableOpacity>
              <TouchableOpacity className="h-9 w-9 items-center justify-center rounded-lg bg-white border border-appBorder"><Feather name="trash-2" size={18} color="#EF4444" /></TouchableOpacity>
            </View>
            <Image source={{ uri: warranty.productImage }} className="mt-3 h-52 w-full rounded-3xl" />
          </AnimatedEntrance>

          <AnimatedEntrance delay={90}>
            <View className="mt-5 flex-row items-center">
              <View style={{ backgroundColor: '#0F766E' }} className="h-14 w-14 items-center justify-center rounded-full"><Text className="text-[11px] font-bold text-white">{warranty.store.slice(0, 4).toUpperCase()}</Text></View>
              <Text className="ml-3 text-[30px] font-semibold text-appText">{warranty.store}</Text>
            </View>
            <Text className="mt-3 text-[40px] font-bold leading-[46px] text-appText">{warranty.productName}</Text>
          </AnimatedEntrance>

          <AnimatedEntrance delay={130}>
            <View className="mt-5 rounded-3xl border border-appBorder bg-[#F7F7F8] p-5">
              <Text className="text-[16px] font-semibold text-[#64748B]">Status da Garantia</Text>
              <View className="mt-4 h-3 rounded-full bg-[#D1D5DB]"><View className="h-3 w-[75%] rounded-full bg-[#22C55E]" /></View>
              <Text className="mt-5 text-[32px] font-bold leading-[38px] text-appText">1 ano, 6 meses, 12 dias restantes</Text>
              <View className="mt-4 self-start rounded-full bg-appSuccessSoft px-4 py-2"><Text className="text-[14px] font-semibold text-[#148542]">Dentro da Validade</Text></View>
              <View className="my-5 h-[1px] bg-appBorder" />
              <View className="flex-row justify-between">
                <View><Text className="text-[14px] text-appMuted">Início da Garantia</Text><Text className="mt-1 text-[18px] font-semibold text-appText">{warranty.warrantyStart}</Text></View>
                <View><Text className="text-[14px] text-appMuted">Fim da Garantia</Text><Text className="mt-1 text-[18px] font-semibold text-appText">{warranty.warrantyEnd}</Text></View>
              </View>
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={170}>
            <View className="mt-5 rounded-3xl border border-appBorder bg-[#F7F7F8] p-5">
              <Text className="text-[20px] font-bold text-appText">Documento da Garantia</Text>
              <Image source={{ uri: warranty.documentImage }} className="mt-4 h-64 w-full rounded-3xl" />
              <Text className="mt-3 text-center text-[16px] text-appMuted">Toque para ampliar</Text>
            </View>
          </AnimatedEntrance>
        </ScrollView>
      </View>
    </View>
  );
}
