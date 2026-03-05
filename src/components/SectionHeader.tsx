import { Text, View } from 'react-native';

type SectionHeaderProps = {
  label: string;
};

export function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <View className="bg-[#E2E4E8] px-4 py-2.5">
      <Text className="text-[14px] font-bold uppercase tracking-[1.2px] text-appMuted">{label}</Text>
    </View>
  );
}
