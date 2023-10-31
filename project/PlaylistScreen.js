import { ScrollView, StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { tracks } from './data'
import SongListCard from './SongListCard'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'


const PlaylistScreen = ({route}) => {

    const navigation = useNavigation();
    const { name, image } = route.params;
    const [playlist, setPlaylist] = useState([])
    
    useEffect(() => {
        const getPlaylist = () => {
            const list = tracks.slice(0,20);
            setPlaylist(list);
        }

        getPlaylist();
    }, [])

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
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.number}>23 Songs</Text>
                </View>

                <View style={styles.section}>
                    <FlatList
                        style={styles.scroller}
                        data={playlist}
                        renderItem={
                            ({ item, index }) => {
                                return <SongListCard item={item} key={index} />
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
    },
})