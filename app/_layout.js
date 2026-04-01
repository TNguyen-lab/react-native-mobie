import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '../hooks/use-color-scheme';
import { AuthProvider } from '../src/contexts/authContext';
import { PermissionProvider } from '../src/contexts/permissionContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <PermissionProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="more/asset" options={{ title: 'Tài sản', headerShown: false }} />
            <Stack.Screen name="more/calibration" options={{ title: 'Hiệu chuẩn của tôi', headerShown: false }} />
            <Stack.Screen name="more/settings" options={{ title: 'Cài đặt', headerShown: false }} />
            <Stack.Screen name="more/contact" options={{ title: 'Liên hệ', headerShown: false }} />
            <Stack.Screen name="breakdown/[id]" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PermissionProvider>
    </AuthProvider>
  );
}
