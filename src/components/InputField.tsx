import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

type InputFieldProps = {
  label: string;
  placeholder: string;
  icon?: keyof typeof Feather.glyphMap;
  multilineHint?: string;
};

export function InputField({ label, placeholder, icon, multilineHint }: InputFieldProps) {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-[17px] font-semibold text-[#111827]">{label}</Text>
      <View className="h-14 flex-row items-center rounded-2xl border border-appBorder bg-[#F7F7F8] px-4">
        <TextInput
          className="flex-1 text-[18px] text-[#111827]"
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
        />
        {icon ? (
          <TouchableOpacity className="pl-2" activeOpacity={0.8}>
            <Feather name={icon} size={23} color="#6B7280" />
          </TouchableOpacity>
        ) : null}
      </View>
      {multilineHint ? <Text className="mt-2 text-[15px] leading-6 text-appMuted">{multilineHint}</Text> : null}
    </View>
  );
}
