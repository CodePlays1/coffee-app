import React, { createContext, useContext, useState } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export const lightTheme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4A2B18',
    accent: '#D17842',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#333333',
    error: '#FF5252',
  },
  roundness: 10,
};

export const darkTheme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1C1C1C',
    accent: '#D17842',
    background: '#121212',
    surface: '#2D2D2D',
    text: '#FFFFFF',
    error: '#FF5252',
  },
  roundness: 10,
};

type ThemeContextType = {
  theme: ReactNativePaper.Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);