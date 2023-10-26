import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo, AntDesign, FontAwesome  } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import DiscoverScreen from './DiscoverScreen';
import LoginScreen from './LoginScreen';

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                backgroundColor: "white",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                shadowOpacity: 4
            }}
        >
            <Tab.Screen 
                name='Home' 
                component={HomeScreen} 
                options = {{
                    tabBarLabel: "Home", 
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({focused}) => 
                        focused ? (
                            <Entypo name="home" size={24} color="white" />
                        ) :
                        (
                            <AntDesign name="home" size={24} color="white" />
                        )
                }} 
            />
            <Tab.Screen 
                name='Discover' 
                component={DiscoverScreen} 
                options = {{
                    tabBarLabel: "Discover", 
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({focused}) => 
                        focused ? (
                            <FontAwesome name="search" size={24} color="white" />
                        ) :
                        (
                            <AntDesign name="search1" size={24} color="white" />
                        )
                }} 
            />
            <Tab.Screen 
                name='Profile' 
                component={ProfileScreen} 
                options = {{
                    tabBarLabel: "Profile", 
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({focused}) => 
                        focused ? (
                            <AntDesign name="heart" size={24} color="white" />
                        ) :
                        (
                            <AntDesign name="hearto" size={24} color="white" />
                        )
                }} 
            />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name = 'Login'
                    component = {LoginScreen}
                    options = {{headerShown: false}}
                />
                <Stack.Screen 
                    name = 'Main'
                    component = {BottomTabs}
                    options = {{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;