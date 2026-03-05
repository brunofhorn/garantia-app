import { ScrollView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AppHeader } from '../components/AppHeader';
import { AnimatedEntrance } from '../components/AnimatedEntrance';

export function DocumentsScreen() {
  return (
    <View className="flex-1 bg-appBg">
      <AppHeader title="Documentos" />
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingVertical: 16 }}>
        <AnimatedEntrance delay={40}>
          <Text className="mb-4 text-[16px] leading-6 text-appMuted">
            Gerencie documentos com vencimento e alertas: RG, CNH, procurações, passaporte e certificados.
          </Text>
        </AnimatedEntrance>

        <AnimatedEntrance delay={90}>
          <View className="mb-3 rounded-2xl border border-appBorder bg-[#F8F8F9] p-4">
            <View className="flex-row items-center">
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#E5EEF9]">
                <Feather name="credit-card" size={20} color="#1E3A8A" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-[17px] font-bold text-appText">CNH</Text>
                <Text className="text-[14px] text-appMuted">Validade: 12/11/2027</Text>
              </View>
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={130}>
          <View className="mb-3 rounded-2xl border border-appBorder bg-[#F8F8F9] p-4">
            <View className="flex-row items-center">
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#FCE7E7]">
                <Feather name="file-text" size={20} color="#B91C1C" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-[17px] font-bold text-appText">Procuração</Text>
                <Text className="text-[14px] text-appMuted">Expira em 45 dias</Text>
              </View>
            </View>
          </View>
        </AnimatedEntrance>
      </ScrollView>
    </View>
  );
}
