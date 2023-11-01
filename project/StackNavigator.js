import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import DiscoverScreen from './DiscoverScreen';
import PlaylistScreen from './PlaylistScreen';

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#11111C",
                        position: "absolute",
                    height: 100,
                    justifyContent: "center",
                    padding: 20,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderTopWidth: 0
                }
            }}
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="home" size={24} color="white" />
                        ) :
                            (
                                <Ionicons name="home-outline" size={24} color="white" />
                            )
                }}
            />
            <Tab.Screen
                name='Discover'
                component={DiscoverScreen}
                options={{
                    tabBarLabel: "Discover",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="compass-sharp" size={24} color="white" />
                        ) :
                            (
                                <Ionicons name="compass-outline" size={24} color="white" />
                            )
                }}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    headerShown: false,
                    tabBarLabelStyle: { color: "white" },
                    tabBarIcon: ({ focused }) =>
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
                {/* <Stack.Screen 
                    name = 'Login'
                    component = {LoginScreen}
                    options = {{headerShown: false}}
                /> */}
                <Stack.Screen
                    name='Main'
                    component={BottomTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Playlist'
                    component={PlaylistScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;