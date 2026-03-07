import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { AddDocumentScreen } from '../screens/AddDocumentScreen';
import { AddSubscriptionScreen } from '../screens/AddSubscriptionScreen';
import { AddWarrantyScreen } from '../screens/AddWarrantyScreen';
import { ChangePasswordScreen } from '../screens/ChangePasswordScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { WarrantyDetailsScreen } from '../screens/WarrantyDetailsScreen';
import { RootStackParamList } from '../types';
import { MainTabs } from './MainTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#060D1A]">
        <ActivityIndicator size="large" color="#1BD5FF" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'MainTabs' : 'Login'}
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          <Stack.Screen name="WarrantyDetails" component={WarrantyDetailsScreen} />
          <Stack.Screen name="AddWarranty" component={AddWarrantyScreen} />
          <Stack.Screen name="AddDocument" component={AddDocumentScreen} />
          <Stack.Screen name="AddSubscription" component={AddSubscriptionScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
