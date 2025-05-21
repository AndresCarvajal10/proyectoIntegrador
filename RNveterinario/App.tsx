import React, { useContext } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './src/context/AuthContext';
import { Main } from './src/screens/Main';

export default function App() {

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#F2FFF5",
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <AuthContextProvider>
        <Main />
      </AuthContextProvider>
    </NavigationContainer>
  );
}

