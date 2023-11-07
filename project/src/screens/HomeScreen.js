import { StyleSheet, Text, ScrollView, Pressable, Image, View, TextInput, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { tracks } from '../api/data';
import { useState, useEffect } from 'react';
import SongCard from '../components/SongCard';
import SongListCard from '../components/SongListCard';

const HomeScreen = () => {

    const navigation = useNavigation();
    const [userProfile, setUserProfile] = useState({
        name: 'Ronit Khatri',
        image: './src/assets/profile-photo.jpg',
        plan: 'gold member'
    })
    const [recents, setRecents] = useState([]);
    const [recommended, setRecommended] = useState([]);
    
    // const { userProfile, setUserProfile } = useState([]);

    // async function getProfile(){
    //     const accessToken = AsyncStorage.getItem("token");

    //     try {
    //         const response = await fetch("https://api.spotify.com/v1/me", {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`
    //             }
    //         })

    //         const data = await response.json();
    //         setUserProfile(data);
    //         return data;

    //     } catch(err) {
    //         console.log(err.message);
    //     }
    // }

    // useEffect(() => {
    //     getProfile();
    // }, [])

    useEffect(() => {
        const getRecents = () => {
            const list = tracks.slice(0,3);
            setRecents(list);
        }
        const getRecommended = () => {
            const list = tracks.slice(3,6);
            setRecommended(list);
        }

        getRecents();
        getRecommended();
    }, [])
    
  return (
    <LinearGradient colors = {["#040306", "#131624"]} style = {{flex: 1}}>
        <ScrollView style={styles.container}>

            <View style={styles.profile__container}>
                <Pressable onPress={() => navigation.navigate('Profile', {itemId: 1})} >
                    <Image style={styles.user__photo} source={require('../assets/profile-photo.jpg')} />
                </Pressable>

                <View style={styles.user__details}>
                    <Text style={styles.user__name}>{userProfile.name}</Text>
                    <Text style={styles.user__plan}>{userProfile.plan}</Text>
                </View>
            </View>

            <View style={styles.recents__container}>
                <Text style={styles.recents__heading}>
                    Recently Played
                </Text>
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.recents__scroller}
                >
                    {recents.map((item, index) => {
                        return <SongCard item={item} key={index} />
                    })}
                </ScrollView>
            </View>

            <View style={styles.recommended__container}>
                <Text style={styles.recommended__heading}>
                    Recommended for you
                </Text>
                <FlatList
                    style={styles.recommended__scroller}
                    data={recommended}
                    renderItem={
                        ({item, index}) => {
                            return <SongListCard item={item} key={index} />
                        }
                    }
                />
            </View>
                

        </ScrollView>
    </LinearGradient>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 20,
        paddingBottom: 100
    },
    profile__container: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    },
    user__photo: {
        height: 45,
        width: 45,
        borderRadius: 30
    },
    user__details: {
        flexDirection: "column",
        gap: 5
    },
    user__name: {
        color: 'white',
        fontSize: 20,
    },
    user__plan: {
        color: '#A9A9A9',
        fontSize: 15,
        textTransform: "capitalize"
    },
    button: {
        padding: 10,
        backgroundColor: "white",
        width: 100,
        marginVertical: 20,
        borderRadius: 10,
        color: "black"
    },
    recents__container: {
        marginTop: 50,
        flexGrow: 1
    },
    recents__heading: {
        color: "white",
        fontSize: 22
    },
    recents__scroller: {
        marginTop: 20,
    },
    recommended__container: {
        marginTop: 50,
        flexGrow: 1
    },
    recommended__heading: {
        color: "white",
        fontSize: 22
    },
    recommended__scroller: {
        marginTop: 20,
    }
})
