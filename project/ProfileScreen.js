import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import SongCard from './SongCard';
import { tracks } from './data';


const ProfileScreen = () => {

    const [userProfile, setUserProfile] = useState({
        name: 'Ronit Khatri',
        image: './src/assets/profile-photo.jpg',
        plan: 'gold member'
    })
    const [albums, setAlbums] = useState([]);
    const [music, setMusic] = useState([]);

    useEffect(() => {
        const getAlbums = () => {
            const list = tracks.slice(9, 12);
            setAlbums(list);
        }
        const getMusic = () => {
            const list = tracks.slice(12, 15);
            setMusic(list);
        }

        getAlbums();
        getMusic();
    }, [])

    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <ScrollView style={styles.container}>

                <View style={styles.profile__container}>
                    <Image style={styles.user__photo} source={require('./src/assets/profile-photo.jpg')} />
                    <View style={styles.user__details}>
                        <Text style={styles.user__name}>{userProfile.name}</Text>
                        <Text style={styles.user__plan}>{userProfile.plan}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>
                        Your Albums
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scroller}
                    >
                        {albums.map((item, index) => {
                            return <SongCard item={item} key={index} />
                        })}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>
                        Your Music
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scroller}
                    >
                        {music.map((item, index) => {
                            return <SongCard item={item} key={index} />
                        })}
                    </ScrollView>
                </View>

            </ScrollView>
        </LinearGradient>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 20,
        paddingBottom: 100
    },
    profile__container: {
        flexDirection: "row",
        gap: 20,
    },
    user__photo: {
        height: 80,
        width: 80,
        borderRadius: 10
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
    section: {
        marginTop: 50,
        flexGrow: 1
    },
    heading: {
        color: "white",
        fontSize: 22
    },
    scroller: {
        marginTop: 20,
    },
})