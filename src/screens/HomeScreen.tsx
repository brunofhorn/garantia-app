import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { WarrantyCard } from '../components/WarrantyCard';
import { warranties } from '../data/mockData';
import { AnimatedEntrance } from '../components/AnimatedEntrance';

export function HomeScreen({ navigation }: { navigation: any }) {
  const validCount = warranties.filter((item) => item.status !== 'expired').length;
  const expiredCount = warranties.filter((item) => item.status === 'expired').length;
  const expiringCount = warranties.filter((item) => item.status === 'expiring').length;

  const goToStack = (screen: string, params?: Record<string, unknown>) => {
    navigation.getParent()?.navigate(screen as never, params as never);
  };

  return (
    <View className="flex-1 bg-appBg">
      <AppHeader
        title="Garantia Fácil"
        rightContent={
          <TouchableOpacity onPress={() => navigation.navigate('SettingsTab')} className="h-10 w-10 items-center justify-center">
            <Feather name="settings" size={24} color="#4B5563" />
          </TouchableOpacity>
        }
      />

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 30 }}>
        <AnimatedEntrance delay={20}>
          <View className="mt-4 items-center">
            <Text className="px-3 text-center text-[17px] leading-7 text-[#4B5563]">
              Gerencie suas garantias de produtos de forma simples e nunca mais perca um prazo.
            </Text>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={100}>
          <View className="mt-4">
            <PrimaryButton title="+ Adicionar Produto" onPress={() => goToStack('AddWarranty')} />
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={150}>
          <View className="mt-5 flex-row flex-wrap justify-between gap-y-3">
            <View className="h-28 w-[48.5%] rounded-2xl border border-appBorder bg-[#F8F8F9] px-4 py-3">
              <Text className="text-[14px] text-appMuted">Total de Produtos</Text>
              <Text className="mt-2 text-[32px] font-bold text-appText">{warranties.length}</Text>
            </View>
            <View className="h-28 w-[48.5%] rounded-2xl border border-appBorder bg-[#F8F8F9] px-4 py-3">
              <Text className="text-[14px] text-appMuted">Total em Garantia</Text>
              <Text className="mt-2 text-[32px] font-bold text-[#16A34A]">{validCount}</Text>
            </View>
            <View className="h-28 w-[48.5%] rounded-2xl border border-appBorder bg-[#F8F8F9] px-4 py-3">
              <Text className="text-[14px] text-appMuted">Garantias Expiradas</Text>
              <Text className="mt-2 text-[32px] font-bold text-[#DC2626]">{expiredCount}</Text>
            </View>
            <View className="h-28 w-[48.5%] rounded-2xl border border-appBorder bg-[#F8F8F9] px-4 py-3">
              <Text className="text-[14px] text-appMuted">Expirando em Breve</Text>
              <Text className="mt-2 text-[32px] font-bold text-[#C98900]">{expiringCount}</Text>
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={180}>
          <View className="mt-5 h-14 flex-row items-center rounded-2xl border border-appBorder bg-[#F7F7F8] px-4">
            <Feather name="search" size={24} color="#9CA3AF" />
            <Text className="ml-3 text-[17px] text-[#9CA3AF]">Buscar produto...</Text>
          </View>
        </AnimatedEntrance>

        <View className="mt-5">
          {warranties.map((item, index) => (
            <WarrantyCard
              key={item.id}
              item={item}
              index={index}
              onPress={() => goToStack('WarrantyDetails', { warrantyId: item.id })}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
