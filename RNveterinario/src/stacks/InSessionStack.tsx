import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackNavigation } from "./StackNavigation";

export type RootStackParamList = {
    Home: undefined;
    DetailAppointment: undefined;
};

const Tab = createBottomTabNavigator();

const InSessionStack = () => {
    return (
        <Tab.Navigator
            detachInactiveScreens={false}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={StackNavigation} />
        </Tab.Navigator>
    );
};

export { InSessionStack };