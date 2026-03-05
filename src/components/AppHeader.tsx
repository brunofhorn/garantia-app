import { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

type AppHeaderProps = {
  title: string;
  onBack?: () => void;
  rightContent?: ReactNode;
};

export function AppHeader({ title, onBack, rightContent }: AppHeaderProps) {
  return (
    <SafeAreaView edges={["top"]} className="bg-white">
      <View className="h-16 flex-row items-center justify-between border-b border-appBorder/70 px-4">
        <View className="w-12">
          {onBack ? (
            <TouchableOpacity onPress={onBack} className="h-10 w-10 items-center justify-center" activeOpacity={0.8}>
              <Feather name="arrow-left" size={28} color="#111827" />
            </TouchableOpacity>
          ) : null}
        </View>

        <Text className="text-[22px] font-bold text-appText">{title}</Text>

        <View className="w-12 items-end">{rightContent}</View>
      </View>
    </SafeAreaView>
  );
}
