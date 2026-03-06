import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { AddWarrantyScreen } from '../screens/AddWarrantyScreen';
import { ChangePasswordScreen } from '../screens/ChangePasswordScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { WarrantyDetailsScreen } from '../screens/WarrantyDetailsScreen';
import { MainTabs } from './MainTabs';
import { AddDocumentScreen } from '../screens/AddDocumentScreen';
import { AddSubscriptionScreen } from '../screens/AddSubscriptionScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
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
    </Stack.Navigator>
  );
}
