import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './src/context/AuthContext';
import { Main } from './src/screens/Main';

export default function App() {


  return (
    // <Navigation></Navigation>
    <NavigationContainer>
      <AuthContextProvider>
        <Main />
      </AuthContextProvider>
    </NavigationContainer>
  );
}

