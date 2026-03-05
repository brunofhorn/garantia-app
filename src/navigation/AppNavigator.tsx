import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { AddWarrantyScreen } from '../screens/AddWarrantyScreen';
import { ChangePasswordScreen } from '../screens/ChangePasswordScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MyWarrantiesScreen } from '../screens/MyWarrantiesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { WarrantyDetailsScreen } from '../screens/WarrantyDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MyWarranties" component={MyWarrantiesScreen} />
      <Stack.Screen name="WarrantyDetails" component={WarrantyDetailsScreen} />
      <Stack.Screen name="AddWarranty" component={AddWarrantyScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}
