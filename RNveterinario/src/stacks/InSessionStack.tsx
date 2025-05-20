import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Consultar } from "../screens/Consultar";

const tab = createBottomTabNavigator();

const InSessionStack = () => {
    return(
        <tab.Navigator> 
            <tab.Screen name="home" component={Home}/>
            <tab.Screen name="consultar" component={Consultar}/>
        </tab.Navigator>
    )
}

export { InSessionStack }