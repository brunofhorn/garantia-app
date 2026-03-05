import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WarrantyStatus } from '../types';

type StatusPillProps = {
  status: WarrantyStatus;
};

const statusMap = {
  valid: {
    label: 'Dentro da Validade',
    icon: 'check-circle',
    text: 'text-[#148542]',
    bg: 'bg-appSuccessSoft',
  },
  expiring: {
    label: 'Dentro da Validade',
    icon: 'check-circle',
    text: 'text-[#148542]',
    bg: 'bg-appSuccessSoft',
  },
  expired: {
    label: 'Fora da Validade',
    icon: 'x-circle',
    text: 'text-[#C62828]',
    bg: 'bg-appDangerSoft',
  },
} as const;

export function StatusPill({ status }: StatusPillProps) {
  const style = statusMap[status];

  return (
    <View className={`${style.bg} h-9 min-w-[150px] flex-row items-center justify-center rounded-full px-3`}>
      <Feather name={style.icon} size={16} color={status === 'expired' ? '#C62828' : '#148542'} />
      <Text className={`${style.text} ml-2 text-[14px] font-semibold`}>{style.label}</Text>
    </View>
  );
}
