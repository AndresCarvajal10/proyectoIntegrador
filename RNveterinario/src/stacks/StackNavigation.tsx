import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { DetailAppointment } from "../screens/DetailAppointment";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
    Home: undefined;
    DetailAppointment: undefined;
}
const StackNavigation = () => {
    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='DetailAppointment' component={DetailAppointment} />
            </Stack.Navigator>
        </>
    )
}

export { StackNavigation }