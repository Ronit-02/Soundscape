import { Text, View, StyleSheet, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, AntDesign, FontAwesome   } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';


const LoginScreen = () => {

    const navigation = useNavigation();

    // useEffect(() => {

    //     const checkTokenValidity = async () => {
    //         const accessToken = await AsyncStorage.getItem("token");
    //         const expirationDate = await AsyncStorage.getItem("expirationDate");

    //         if (accessToken && expirationDate) {
    //             const currentTime = Date.now();

    //             if (currentTime < parseInt(expirationDate)) {
    //                 navigation.replace("Main");
    //             }
    //             else {
    //                 AsyncStorage.removeItem("token");
    //                 AsyncStorage.removeItem("expiraionDate");
    //                 navigation.replace("Login");
    //             }
    //         }
    //     }

    //     checkTokenValidity();

    // }, [])

    // async function authenticate() {

    //     const config = {
    //         clientId: "c21f77dd30724b1a8244e40d750a973b",
    //         scopes: [
    //             "user-read-email",
    //             "user-library-read",
    //             "user-read-recently-played",
    //             "user-top-read",
    //             "playlist-read-private",
    //             "playlist-read-collaborative",
    //             "playlist-modify-public"
    //         ],
    //         redirectUri: makeRedirectUri()
    //     }

    //     const discovery = {
    //         authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    //         tokenEndpoint: 'https://accounts.spotify.com/api/token',
    //     };

    //     const [result, response, promptAsync] = await useAuthRequest(config, discovery);
    //     console.log(result);

    //     if (result.accessToken) {
    //         const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
    //         AsyncStorage.setItem("token", result.accessToken)
    //         AsyncStorage.setItem("expirationDate", expirationDate.toString());
    //         navigation.navigate("Main");
    //     }
    // }

    const redirectLogin = () => {
        navigation.navigate('Main');
    }

    return (
        <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <MaterialCommunityIcons
                    style={styles.logo}
                    name="music-circle" 
                    size={50} 
                />
                <Text style={styles.main__heading}>
                    Getting the most out of music
                </Text>
                <Pressable style={styles.button} onPress={redirectLogin} >
                    <Text>Sign In</Text>
                </Pressable>
                <Text style={styles.divider}>
                    or
                </Text>
                <Pressable style={styles.button__inverted} onPress={redirectLogin} >
                    <FontAwesome name="facebook" size={20} color="white" />
                    <Text style={styles.button__text}>Continue with Facebook</Text>
                </Pressable>
                <Pressable style={styles.button__inverted} onPress={redirectLogin} >
                    <AntDesign name="google" size={20} color="white" />
                    <Text style={styles.button__text}>Continue with Google</Text>
                </Pressable>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        color: "white",
        marginLeft: "auto",
        marginRight: "auto"
    },
    main__heading: {
        color: "white",
        fontSize: 30,
        width: 250,
        lineHeight: 50,
        textAlign: "center",
        marginTop: 40
    },
    button: {
        backgroundColor: "white",
        color: "black",
        padding: 10,
        marginLeft: "auto",
        marginRight: "auto",
        width: 300,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 40
    },
    divider: {
        color: "white",
        marginVertical: 20,
    },
    button__inverted: {
        backgroundColor: "black",
        padding: 10,
        marginLeft: "auto",
        marginRight: "auto",
        width: 300,
        borderRadius: 25,
        borderColor: "white",
        borderWidth: 0.8,
        display: "flex",
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    button__text: {
        color: "white"
    }
})
