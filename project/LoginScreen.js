import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  return (
      <LinearGradient colors = {['#040306', '#131624']} style = {{flex: 1}}>
        <SafeAreaView style = {styles.container}>
            <View style = {styles.header} />
            <Text style = {styles.logo}>SoundScape</Text>
        </SafeAreaView>
    </LinearGradient>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: "white",
        height: 80
    },
    logo: {
        color: "white"
    }
})