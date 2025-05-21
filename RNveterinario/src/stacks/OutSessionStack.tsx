import React from "react";
import Login from '../screens/Login';
import { Registro } from '../screens/Registro';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CrearCitaScreen from "../screens/CreateAppointment";

const StackNavigation = createNativeStackNavigator();

export type RootStackParamList = {
  login: undefined;
  Registro: undefined;
}

const OutSessionStack = () => {

  return (
    <StackNavigation.Navigator>
      <StackNavigation.Screen name='Login' component={Login} />
      <StackNavigation.Screen name='Registro' component={Registro} />
    </StackNavigation.Navigator>
  )
}

export { OutSessionStack }