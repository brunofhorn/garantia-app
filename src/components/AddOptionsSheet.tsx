import { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

type AddAction = 'warranty' | 'document' | 'subscription';

type AddOptionsSheetProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (action: AddAction) => void;
};

type Option = {
  id: AddAction;
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  iconBg: string;
  iconColor: string;
};

const options: Option[] = [
  {
    id: 'warranty',
    title: 'Nova Garantia',
    description: 'Proteja seus produtos e eletrônicos',
    icon: 'shield',
    iconBg: '#E7F0FF',
    iconColor: '#1D74D8',
  },
  {
    id: 'document',
    title: 'Novo Documento',
    description: 'RG, CNH, Passaporte e outros',
    icon: 'file-text',
    iconBg: '#EFF2F6',
    iconColor: '#64748B',
  },
  {
    id: 'subscription',
    title: 'Nova Assinatura',
    description: 'Streaming, softwares e recorrentes',
    icon: 'credit-card',
    iconBg: '#EFF2F6',
    iconColor: '#64748B',
  },
];

export function AddOptionsSheet({ visible, onClose, onSelect }: AddOptionsSheetProps) {
  const backdrop = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(32)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdrop, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    backdrop.setValue(0);
    translateY.setValue(32);
  }, [backdrop, translateY, visible]);

  return (
    <Modal visible={visible} animationType="none" transparent onRequestClose={onClose}>
      <View className="flex-1 justify-end">
        <Animated.View style={{ opacity: backdrop }} className="absolute inset-0 bg-[#0F172A]/50">
          <Pressable className="flex-1" onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={{ transform: [{ translateY }] }}
          className="rounded-t-3xl bg-white px-4 pt-3 pb-8"
        >
          <View className="mb-3 items-center">
            <View className="h-1.5 w-12 rounded-full bg-[#D6DBE3]" />
          </View>

          <Text className="text-center text-[28px] font-bold text-appText">O que você deseja adicionar?</Text>
          <Text className="mt-1 text-center text-[14px] text-[#8391A5]">Escolha uma categoria para começar</Text>

          <View className="mt-4 gap-3">
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                activeOpacity={0.9}
                className="flex-row items-center rounded-2xl border border-[#D8E2EE] bg-[#F8FAFC] p-3"
                onPress={() => onSelect(option.id)}
              >
                <View
                  className="h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: option.iconBg }}
                >
                  <Feather name={option.icon} size={19} color={option.iconColor} />
                </View>

                <View className="ml-3 flex-1">
                  <Text className="text-[17px] font-semibold text-appText">{option.title}</Text>
                  <Text className="text-[13px] text-[#7C889B]">{option.description}</Text>
                </View>

                <Feather name="chevron-right" size={20} color="#94A3B8" />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={onClose} activeOpacity={0.75} className="mt-5 items-center py-2">
            <Text className="text-[17px] text-[#64748B]">Cancelar</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}
