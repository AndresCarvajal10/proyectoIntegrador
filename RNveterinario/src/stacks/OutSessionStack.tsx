import React from "react";
import Login from '../screens/Login';
import { Registro } from '../screens/Registro';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { DetailAppointment } from "../screens/DetailAppointment";

const StackNavigation = createNativeStackNavigator();

export type RootStackParamList = {
  login: undefined;
  Registro: undefined;
  Home: undefined;
  DetailAppointment: undefined;
}

const OutSessionStack = () => {
  return (
    <StackNavigation.Navigator>
      <StackNavigation.Screen name='login' component={Login} />
      <StackNavigation.Screen name='Registro' component={Registro} />
      <StackNavigation.Screen name='Home' component={Home} />
      <StackNavigation.Screen name='DetailAppointment' component={DetailAppointment} />

    </StackNavigation.Navigator>
  )
}

export { OutSessionStack }