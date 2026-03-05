import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DocumentsScreen } from '../screens/DocumentsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SubscriptionsScreen } from '../screens/SubscriptionsScreen';
import { MainTabParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

function EmptyScreen() {
  return <View className="flex-1 bg-appBg" />;
}

const tabMeta: Record<keyof MainTabParamList, { label: string; icon: keyof typeof Feather.glyphMap }> = {
  GuaranteesTab: { label: 'Garantias', icon: 'shield' },
  DocumentsTab: { label: 'Documentos', icon: 'file-text' },
  AddTab: { label: '', icon: 'plus' },
  SubscriptionsTab: { label: 'Assinaturas', icon: 'credit-card' },
  SettingsTab: { label: 'Ajustes', icon: 'settings' },
};

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: Math.max(insets.bottom, 6),
        paddingTop: 8,
        backgroundColor: '#F9FAFC',
        borderTopWidth: 1,
        borderTopColor: '#D6DAE1',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 8,
      }}
    >
      <View className="flex-row items-end justify-between px-2">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const meta = tabMeta[route.name as keyof MainTabParamList];

          if (route.name === 'AddTab') {
            return (
              <View key={route.key} className="w-1/5 items-center">
                <Pressable
                  onPress={() => navigation.getParent()?.navigate('AddWarranty' as never)}
                  style={{
                    marginTop: -30,
                    height: 68,
                    width: 68,
                    borderRadius: 34,
                    backgroundColor: '#2282E8',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 4,
                    borderColor: '#F9FAFC',
                    shadowColor: '#2282E8',
                    shadowOpacity: 0.28,
                    shadowRadius: 12,
                    elevation: 7,
                  }}
                >
                  <Feather name="plus" size={31} color="#fff" />
                </Pressable>
              </View>
            );
          }

          return (
            <Pressable
              key={route.key}
              className="w-1/5 items-center"
              onPress={() => navigation.navigate(route.name)}
              style={{ paddingBottom: 2 }}
            >
              <Feather name={meta.icon} size={20} color={isFocused ? '#2282E8' : '#7B8596'} />
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 11,
                  fontWeight: isFocused ? '700' : '500',
                  color: isFocused ? '#2282E8' : '#7B8596',
                }}
              >
                {meta.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="GuaranteesTab" component={HomeScreen as any} />
      <Tab.Screen name="DocumentsTab" component={DocumentsScreen} />
      <Tab.Screen name="AddTab" component={EmptyScreen} />
      <Tab.Screen name="SubscriptionsTab" component={SubscriptionsScreen} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen as any} />
    </Tab.Navigator>
  );
}
