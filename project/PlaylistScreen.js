import { ScrollView, StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { tracks } from './data'
import SongListCard from './SongListCard'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Player } from './PlayerContext'
// import { BottomModal, ModalContent } from 'react-native-modal'

const PlaylistScreen = ({route}) => {

    const {currentTrack, setCurrentTrack} = useContext(Player);
    const navigation = useNavigation();
    const { name, image } = route.params;
    const [playlist, setPlaylist] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        const getPlaylist = () => {
            const list = tracks.slice(0,20);
            setPlaylist(list);
        }

        getPlaylist();
    }, [])

    const playTrack = () => {
        const list = tracks.slice(0,1);
        setCurrentTrack(list[0]);
        play();
    }

    const play = () => {

    }

    return (
        <>
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
                            <Text style={styles.name}>{name}</Text>
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
                                return <SongListCard item={item} key={index} />
                            }
                        }
                    />
                </View>

            </ScrollView>
        </LinearGradient>
        
            {currentTrack && (
                <Pressable style={styles.player}>
                    <View style={styles.player__left}>
                        <Image style={styles.player__image} source={{uri: currentTrack?.album?.images[0]?.url}} />
                        <View style={{flexDirection: "column", gap: 5}}>
                            <Text style={styles.player__name}>{currentTrack?.name}</Text>
                            <Text style={styles.player__singer}>{currentTrack?.artists[0].name}</Text>
                        </View>
                    </View>
                    <View style={styles.player__right}>
                        <Text style={styles.time}>2:30 / 3:13</Text>
                        <AntDesign name="hearto" size={24} color="white" />
                        <AntDesign name="pause" size={24} color="white" />
                    </View>
                </Pressable>
            )}

            {/* <BottomModal 
                visible={modalVisible} 
                onHardwareBackPress={() => setModalVisible(false)} 
                swipeDirection={["up","down"]}
                swipeThreshold={200}
            >
                <ModalContent>
                    
                </ModalContent>
            </BottomModal> */}

        </>
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
    },
    player: {
        width: "100%",
        backgroundColor: "#11111C",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20
    },
    player__image: {
        width: 50,
        height: 50,
        objectFit: "cover"
    },
    player__name: {
        color: "white",
        fontSize: 17
    },
    player__singer: {
        color: "#DEDEDE",
        fontSize: 12
    },
    player__left: {
        flexDirection: "row",
        gap: 10
    },
    player__right: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    time: {
        color: "white",
        fontSize: 14
    }
})