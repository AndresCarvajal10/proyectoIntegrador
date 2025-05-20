import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/screens/Login";
import { Registro } from "./src/screens/Registro";

const HomeStackNavigator = createNativeStackNavigator();
const tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <tab.Navigator>
            <tab.Screen name="Login" component={Login} />
            <tab.Screen name="Registro" component={Registro} />
        </tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )

}