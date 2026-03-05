import { useEffect, useRef } from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { StatusPill } from './StatusPill';
import { WarrantyItem } from '../types';

type WarrantyCardProps = {
  item: WarrantyItem;
  onPress?: () => void;
  index?: number;
};

export function WarrantyCard({ item, onPress, index = 0 }: WarrantyCardProps) {
  const isExpired = item.status === 'expired';
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 260,
        delay: 80 + index * 70,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        delay: 80 + index * 70,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateY]);

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.99, useNativeDriver: true, speed: 35, bounciness: 4 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 35, bounciness: 4 }).start();
  };

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }, { scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="mb-4 rounded-3xl border border-appBorder bg-[#F8F8F9] p-4"
        style={{ elevation: 1 }}
      >
        <View className="flex-row">
          <View className="relative">
            <Image source={{ uri: item.productImage }} className="h-20 w-20 rounded-2xl" />
            <View
              style={{ backgroundColor: item.storeLogoColor }}
              className="absolute -bottom-2 -right-2 h-8 w-8 items-center justify-center rounded-full border-2 border-[#F8F8F9]"
            >
              <Text className="text-[8px] font-bold uppercase text-white">{item.store.slice(0, 3)}</Text>
            </View>
          </View>

          <View className="ml-3 flex-1 justify-center">
            <Text className="text-[18px] font-bold text-appText">{item.productName}</Text>
            <Text className="mt-1 text-[14px] text-appMuted">
              Garantia: {item.warrantyStart} - {item.warrantyEnd}
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-center justify-between">
          <Text className={`text-[17px] font-bold ${isExpired ? 'text-appDanger' : item.status === 'expiring' ? 'text-appWarning' : 'text-[#4B5563]'}`}>
            {isExpired ? 'Expirado' : `Vence em ${item.daysLeft} dias`}
          </Text>
          <StatusPill status={item.status} />
        </View>
      </Pressable>
    </Animated.View>
  );
}
