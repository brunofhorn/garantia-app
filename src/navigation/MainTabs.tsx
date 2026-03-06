import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { AddOptionsSheet } from '../components/AddOptionsSheet';
import { DashboardScreen } from '../screens/DashboardScreen';
import { DocumentsScreen } from '../screens/DocumentsScreen';
import { MyWarrantiesScreen } from '../screens/MyWarrantiesScreen';
import { SubscriptionsScreen } from '../screens/SubscriptionsScreen';
import { MainTabParamList, RootStackParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

type AddAction = 'warranty' | 'document' | 'subscription';

function EmptyScreen() {
  return <View className="flex-1 bg-appBg" />;
}

const tabMeta: Record<keyof MainTabParamList, { label: string; icon: keyof typeof Feather.glyphMap }> = {
  HomeTab: { label: 'Home', icon: 'home' },
  GuaranteesTab: { label: 'Garantias', icon: 'shield' },
  AddTab: { label: '', icon: 'plus' },
  DocumentsTab: { label: 'Documentos', icon: 'file-text' },
  SubscriptionsTab: { label: 'Assinaturas', icon: 'credit-card' },
};

function CustomTabBar({ state, navigation, onOpenAddMenu }: BottomTabBarProps & { onOpenAddMenu: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: Math.max(insets.bottom, 6),
        paddingTop: 8,
        backgroundColor: '#060D1A',
        borderTopWidth: 1,
        borderTopColor: '#1E2A40',
        shadowColor: '#00D4FF',
        shadowOpacity: 0.15,
        shadowRadius: 14,
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
                  onPress={onOpenAddMenu}
                  style={{
                    marginTop: -30,
                    height: 68,
                    width: 68,
                    borderRadius: 34,
                    backgroundColor: '#1BD5FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 4,
                    borderColor: '#060D1A',
                    shadowColor: '#00D4FF',
                    shadowOpacity: 0.45,
                    shadowRadius: 16,
                    elevation: 7,
                  }}
                >
                  <Feather name="plus" size={31} color="#031529" />
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
              <Feather name={meta.icon} size={20} color={isFocused ? '#1BD5FF' : '#6E7F9B'} />
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 11,
                  fontWeight: isFocused ? '700' : '500',
                  color: isFocused ? '#1BD5FF' : '#6E7F9B',
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
  const [showAddMenu, setShowAddMenu] = useState(false);
  const stackNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSelectAction = (action: AddAction) => {
    setShowAddMenu(false);

    setTimeout(() => {
      if (action === 'warranty') {
        stackNavigation.navigate('AddWarranty');
      }

      if (action === 'document') {
        stackNavigation.navigate('AddDocument');
      }

      if (action === 'subscription') {
        stackNavigation.navigate('AddSubscription');
      }
    }, 120);
  };

  return (
    <View className="flex-1">
      <Tab.Navigator
        initialRouteName="HomeTab"
        tabBar={(props) => <CustomTabBar {...props} onOpenAddMenu={() => setShowAddMenu(true)} />}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="HomeTab" component={DashboardScreen as any} />
        <Tab.Screen name="GuaranteesTab" component={MyWarrantiesScreen as any} />
        <Tab.Screen name="AddTab" component={EmptyScreen} />
        <Tab.Screen name="DocumentsTab" component={DocumentsScreen as any} />
        <Tab.Screen name="SubscriptionsTab" component={SubscriptionsScreen as any} />
      </Tab.Navigator>

      <AddOptionsSheet visible={showAddMenu} onClose={() => setShowAddMenu(false)} onSelect={handleSelectAction} />
    </View>
  );
}
