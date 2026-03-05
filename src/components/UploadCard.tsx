import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

type UploadCardProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Feather.glyphMap;
};

export function UploadCard({ title, subtitle, icon }: UploadCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.85} className="mb-6 rounded-2xl border-2 border-dashed border-[#D1D5DB] bg-[#F7F8FA] px-5 py-10">
      <View className="items-center">
        <Feather name={icon} size={38} color="#7C7F8B" />
        <Text className="mt-4 text-center text-[18px] font-semibold text-appText">{title}</Text>
        <Text className="mt-2 text-center text-[15px] leading-6 text-appMuted">{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}
