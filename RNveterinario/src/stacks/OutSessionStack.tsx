import React from "react";
import Login from '../screens/Login';
import { Registro } from '../screens/Registro';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const StackNavigation = createNativeStackNavigator();

const OutSessionStack = () => {

  return (
    <StackNavigation.Navigator>
      <StackNavigation.Screen name='login' component={Login} />
      <StackNavigation.Screen name='register' component={Registro} />
    </StackNavigation.Navigator>
  )
}

export {OutSessionStack}