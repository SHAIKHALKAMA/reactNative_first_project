import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="pages/newPoolDevelopment" options={{ headerShown: false }} />
          <Stack.Screen name="pages/referralPrivilege" options={{ headerShown: false }} />
          <Stack.Screen name="pages/equipmentDetails" options={{ headerShown: false }} />
          <Stack.Screen name="pages/referralPrivilege2" options={{ headerShown: false }} />
          <Stack.Screen name="pages/addAmcPool" options={{ headerShown: false }} />
          <Stack.Screen name="pages/cartScreen" options={{ headerShown: false }} />
          <Stack.Screen name="pages/buySubscription" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


