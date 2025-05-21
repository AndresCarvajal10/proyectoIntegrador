import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackNavigation } from "./StackNavigation";
import CreateAppointment from "../screens/CreateAppointment";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from "../screens/Login";


export type RootStackParamList = {
    Home: undefined;
    DetailAppointment: undefined;
    CreateAppointment: undefined;
};

const Tab = createBottomTabNavigator();

const InSessionStack = () => {
    return (
        <Tab.Navigator
            detachInactiveScreens={false}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = "help-outline";

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "CreateAppointment") {
                        iconName = focused ? "calendar" : "calendar-outline";
                    } else if (route.name === "Salir") {
                        iconName = focused ? "exit" : "exit-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#4CAF50",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: "#F2FFF5"
                },
            })}
        >
            <Tab.Screen name="Home" component={StackNavigation} />
            <Tab.Screen name='CreateAppointment' component={CreateAppointment} />
            {/* Verificar el correcto funcionamiento */}
            {/* <Tab.Screen name='Salir' component={Login} /> */}


        </Tab.Navigator>
    );
};

export { InSessionStack };