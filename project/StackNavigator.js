import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Home' component={ProfileScreen} />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator();

function LogoTitle() {
    return (
        <Text style={styles.logo}>SoundScape</Text>
    )
}

function HeaderTabs() {
    return (
        <Stack.Navigator 
            initialRouteName='Home'
            screenOptions={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerRight: () => (
                    <Button 
                        title='Profile'
                        onPress={() => alert('Button preseed')}
                    />
                )
            }}    
        >

            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{ title: 'Home' }}
            />

            <Stack.Screen
                name='Profile'
                component={ProfileScreen}
                options={{ title: 'Profile' }}
            />

        </Stack.Navigator>
    )
}

export { BottomTabs, HeaderTabs };

const styles = StyleSheet.create({
    logo: {
        fontWeight: 'bold',
        color: '#687EFF'
    }
});