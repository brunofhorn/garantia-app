import { ScrollView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AppHeader } from '../components/AppHeader';
import { AnimatedEntrance } from '../components/AnimatedEntrance';

export function SubscriptionsScreen() {
  return (
    <View className="flex-1 bg-appBg">
      <AppHeader title="Assinaturas" />
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingVertical: 16 }}>
        <AnimatedEntrance delay={40}>
          <Text className="mb-4 text-[16px] leading-6 text-appMuted">
            Controle vencimentos de streamings e serviços online para não perder cobranças e renovações importantes.
          </Text>
        </AnimatedEntrance>

        <AnimatedEntrance delay={90}>
          <View className="mb-3 rounded-2xl border border-appBorder bg-[#F8F8F9] p-4">
            <View className="flex-row items-center">
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#E5EEF9]">
                <Feather name="monitor" size={20} color="#1D4ED8" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-[17px] font-bold text-appText">Netflix</Text>
                <Text className="text-[14px] text-appMuted">Renovação: 20/03/2026</Text>
              </View>
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={130}>
          <View className="mb-3 rounded-2xl border border-appBorder bg-[#F8F8F9] p-4">
            <View className="flex-row items-center">
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#FEF3C7]">
                <Feather name="music" size={20} color="#B45309" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-[17px] font-bold text-appText">Spotify</Text>
                <Text className="text-[14px] text-appMuted">Renovação em 5 dias</Text>
              </View>
            </View>
          </View>
        </AnimatedEntrance>
      </ScrollView>
    </View>
  );
}
