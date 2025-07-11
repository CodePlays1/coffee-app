import { CartProvider } from '@/context/CartContext';
import { Stack } from 'expo-router';
import { ThemeProvider } from 'react-native-paper';
import { theme } from '../design';

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Stack>
          <Stack.Screen name="Confirmation" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </CartProvider>
    </ThemeProvider>
  );
}
