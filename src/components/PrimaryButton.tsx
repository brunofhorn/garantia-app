import { useRef } from 'react';
import { Animated, Pressable, Text } from 'react-native';

type PrimaryButtonProps = {
  title: string;
  onPress?: () => void;
};

export function PrimaryButton({ title, onPress }: PrimaryButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, speed: 28, bounciness: 4 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 28, bounciness: 4 }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} className="w-full">
      <Animated.View
        style={{ transform: [{ scale }], elevation: 2 }}
        className="h-14 w-full items-center justify-center rounded-2xl bg-appPrimary shadow-sm"
      >
        <Text className="text-[20px] font-bold text-white">{title}</Text>
      </Animated.View>
    </Pressable>
  );
}
