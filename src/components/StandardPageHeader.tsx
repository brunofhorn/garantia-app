import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type StandardPageHeaderProps = {
  title: string;
  navigation: any;
  showBack?: boolean;
  onBack?: () => void;
};

export function StandardPageHeader({ title, navigation, showBack = false, onBack }: StandardPageHeaderProps) {
  const goToSettings = () => {
    const parent = navigation?.getParent?.();

    if (parent?.navigate) {
      parent.navigate('Settings');
      return;
    }

    navigation?.navigate?.('Settings');
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    navigation?.goBack?.();
  };

  return (
    <SafeAreaView edges={["top"]} className="bg-[#E5E7EB] px-3 pt-2">
      <View className="mb-2 flex-row items-center">
        {showBack ? (
          <TouchableOpacity onPress={handleBack} className="mr-2 h-8 w-8 items-center justify-center" activeOpacity={0.8}>
            <Feather name="arrow-left" size={20} color="#334155" />
          </TouchableOpacity>
        ) : null}
        <Text className="text-[18px] text-[#6B7280]">{title}</Text>
      </View>

      <View className="mb-2 flex-row items-center justify-between rounded-xl border border-[#D7DCE4] bg-white px-3 py-2.5">
        <View className="flex-row items-center">
          <View className="h-12 w-12 items-center justify-center rounded-xl bg-[#1D74D8]">
            <Feather name="grid" size={20} color="#fff" />
          </View>
          <View className="ml-3">
            <Text className="text-[12px] font-semibold text-[#94A3B8]">Bem-vindo(a),</Text>
            <Text className="text-[18px] font-bold text-[#1E293B]">Alex Johnson</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-1">
          <TouchableOpacity className="h-8 w-8 items-center justify-center" activeOpacity={0.75}>
            <Feather name="search" size={18} color="#334155" />
          </TouchableOpacity>
          <TouchableOpacity className="h-8 w-8 items-center justify-center" activeOpacity={0.75}>
            <Feather name="bell" size={18} color="#334155" />
          </TouchableOpacity>
          <TouchableOpacity className="h-8 w-8 items-center justify-center" activeOpacity={0.75} onPress={goToSettings}>
            <Feather name="settings" size={18} color="#334155" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
