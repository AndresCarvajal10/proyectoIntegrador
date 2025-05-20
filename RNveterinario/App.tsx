import React, { useContext } from 'react';
import Navigation from './Navigation';
import { OutSessionStack } from './src/stacks/OutSessionStack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthContextProvider } from './src/context/AuthContext';
import { InSessionStack } from './src/stacks/InSessionStack';
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

