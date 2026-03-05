import { useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

type SettingsRowProps = {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle?: string;
  danger?: boolean;
  showSwitch?: boolean;
  onPress?: () => void;
};

export function SettingsRow({ icon, title, subtitle, danger, showSwitch, onPress }: SettingsRowProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.995, useNativeDriver: true, speed: 35, bounciness: 3 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 35, bounciness: 3 }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        disabled={showSwitch}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="flex-row items-center border-b border-appBorder bg-[#F7F7F8] px-4 py-3"
      >
        <View className={`h-12 w-12 items-center justify-center rounded-xl ${danger ? 'bg-[#FCE0E0]' : 'bg-[#ECEDEF]'}`}>
          <Feather name={icon} size={24} color={danger ? '#EF4444' : '#111827'} />
        </View>

        <View className="ml-3 flex-1">
          <Text className={`text-[17px] font-medium ${danger ? 'text-[#EF4444]' : 'text-appText'}`}>{title}</Text>
          {subtitle ? <Text className="mt-1 text-[15px] text-appMuted">{subtitle}</Text> : null}
        </View>

        {showSwitch ? (
          <View className="h-8 w-[56px] rounded-full bg-appPrimary p-1">
            <View className="ml-auto h-6 w-6 rounded-full bg-white" />
          </View>
        ) : (
          <Feather name="chevron-right" size={22} color="#6B7280" />
        )}
      </Pressable>
    </Animated.View>
  );
}
