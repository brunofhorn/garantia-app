import { useEffect, useRef } from 'react';
import { Animated, ScrollView, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WarrantyCard } from '../components/WarrantyCard';
import { warranties } from '../data/mockData';
import { RootStackParamList } from '../types';
import { StandardPageHeader } from '../components/StandardPageHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'MyWarranties'>;

export function MyWarrantiesScreen({ navigation }: Props) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.05, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
      ]),
    ).start();
  }, [pulse]);

  return (
    <View className="flex-1 bg-[#E5E7EB]">
      <StandardPageHeader title="Garantias" navigation={navigation} />

      <View className="mx-3 flex-1 rounded-2xl border border-[#D7DCE4] bg-[#F4F6F9] px-3 pt-3">
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
          {warranties.map((item, index) => (
            <WarrantyCard
              key={item.id}
              item={item}
              index={index}
              onPress={() => navigation.navigate('WarrantyDetails', { warrantyId: item.id })}
            />
          ))}
        </ScrollView>
      </View>

      <Animated.View style={{ transform: [{ scale: pulse }] }} className="absolute bottom-28 right-6">
        <TouchableOpacity
          onPress={() => navigation.navigate('AddWarranty')}
          className="h-16 w-16 items-center justify-center rounded-full bg-appPrimary"
          activeOpacity={0.9}
          style={{ elevation: 4 }}
        >
          <Feather name="plus" size={34} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
