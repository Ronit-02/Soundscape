import { ScrollView, StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { tracks } from '../api/data'
import SongListCard from '../components/SongListCard'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { usePlayer } from '../contexts/Player'

const PlaylistScreen = ({ route }) => {

    const navigation = useNavigation();
    const { currentTrack, setCurrentTrack } = usePlayer();
    const [playlist, setPlaylist] = useState([]);
    const { playlistName, image } = route.params;

    useEffect(() => {
        const getPlaylist = () => {
            const list = tracks.slice(0, 20);
            setPlaylist(list);
        }

        getPlaylist();
    }, [])

    const playTrack = () => {
        const list = playlist.slice(0, 1);
        setCurrentTrack(list[0]);
    }    

    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <ScrollView style={styles.container}>

                <View style={styles.topbar}>
                    <Pressable onPress={() => navigation.navigate('Discover')}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <AntDesign name="hearto" size={24} color="white" />
                </View>

                <View style={styles.header}>
                    <Image style={styles.image} source={image} />
                    <View style={styles.header__details}>
                        <View style={styles.header__text}>
                            <Text style={styles.name}>{playlistName}</Text>
                            <Text style={styles.number}>23 Songs</Text>
                        </View>
                        <Pressable onPress={playTrack}>
                            <AntDesign name="play" size={40} color="white" />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.section}>
                    <FlatList
                        style={styles.scroller}
                        data={playlist}
                        renderItem={
                            ({ item, index }) => {
                                return <SongListCard item={item} key={index} isPlaying={item === currentTrack} />
                            }
                        }
                    />
                </View>

            </ScrollView>
        </LinearGradient>
    )
}

export default PlaylistScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 20
    },
    topbar: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    header: {
        marginTop: 30,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    header__details: {
        flexDirection: "row",
        gap: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    header__text: {
        flexDirection: "column",
        gap: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 300,
        height: 200,
        objectFit: "cover",
        borderRadius: 10
    },
    name: {
        color: "white",
        fontSize: 30,
        textAlign: "center"
    },
    number: {
        color: "#959595",
        fontSize: 20
    },
    section: {
        marginTop: 10,
        flexGrow: 1
    },
    scroller: {
        marginTop: 20,
    }
})