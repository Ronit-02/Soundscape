import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>

        <Text>HomeScreen</Text>
        <Text>Your name is: {route.params?.name}</Text>

        <Button
            title="Go to Profile Screen"
            onPress={() => navigation.navigate('Details', { itemId: 1 })}
        />

        <StatusBar style="auto" />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})