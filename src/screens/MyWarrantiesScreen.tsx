import { useEffect, useRef } from 'react';
import { Animated, ScrollView, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppHeader } from '../components/AppHeader';
import { WarrantyCard } from '../components/WarrantyCard';
import { warranties } from '../data/mockData';
import { RootStackParamList } from '../types';

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
    <View className="flex-1 bg-appBg">
      <AppHeader
        title="Minhas Garantias"
        rightContent={
          <TouchableOpacity className="h-10 w-10 items-center justify-center">
            <Feather name="sliders" size={24} color="#4B5563" />
          </TouchableOpacity>
        }
      />

      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 120 }}>
        {warranties.map((item, index) => (
          <WarrantyCard
            key={item.id}
            item={item}
            index={index}
            onPress={() => navigation.navigate('WarrantyDetails', { warrantyId: item.id })}
          />
        ))}
      </ScrollView>

      <Animated.View style={{ transform: [{ scale: pulse }] }} className="absolute bottom-8 right-8">
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
