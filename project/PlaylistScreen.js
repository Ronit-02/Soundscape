import { ScrollView, StyleSheet, Text, View, Image, FlatList, Pressable, Modal } from 'react-native'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { tracks } from './data'
import SongListCard from './SongListCard'
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Audio } from 'expo-av'
import { Player } from './PlayerContext'
const PlaylistScreen = ({ route }) => {

    const navigation = useNavigation();
    const { currentTrack, setCurrentTrack } = useContext(Player);
    const [currentSound, setCurrentSound] = useState(null);
    const [progress, setProgress] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const { name, image } = route.params;
    const value = useRef(0);

    useEffect(() => {
        const getPlaylist = () => {
            const list = tracks.slice(0, 20);
            setPlaylist(list);
        }

        getPlaylist();
    }, [])

    const playTrack = () => {
        const list = playlist.slice(0,1);
        setCurrentTrack(list[0]);
        play(list[0]);
    }

    const play = async (track) => {

        if(currentSound){
            await currentSound.stopAsync();
        }

        const preview_url = track?.preview_url;
        try {
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: false,
                shouldDuckAndroid: false
            })
            const { sound, status } = await Audio.Sound.createAsync(
                {
                    uri: preview_url
                },
                {
                    shouldPlay: true,
                    isLooping: false
                },
                onPlaybackStatusUpdate,
            )
            onPlaybackStatusUpdate(status);
            setCurrentSound(sound);
            setIsPlaying(true);
            await sound.playAsync();
        } catch (err) {
            console.log(err);
        }
    }

    const onPlaybackStatusUpdate = async (status) => {

        if (status.isLoaded && status.isPlaying) {
            const progress = status.positionMillis / status.durationMillis;
            setProgress(progress);
            setCurrentTime(status.positionMillis);
            setTotalDuration(status.durationMillis)
        }

        if(status.didJustFinish){
            setCurrentSound(null);
            handleNext();
        }
    }

    const handlePlayPause = async () => {
        if (currentSound) {
            if (isPlaying) {
                await currentSound.pauseAsync();
            }
            else {
                await currentSound.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    }

    const handleNext = async () => {
        if(currentSound){
            await currentSound.stopAsync();
            setCurrentSound(null);
        }

        value.current += 1;
        if(value.current < playlist.length){
            const nextTrack = playlist[value.current];
            setCurrentTrack(nextTrack);
            await play(nextTrack);
        } else {
            value.current = 0;
            const nextTrack = playlist[value.current];
            setCurrentTrack(nextTrack);
            await play(nextTrack);
        }
    }

    const handlePrev = async () => {
        if(currentSound){
            await currentSound.stopAsync();
            setCurrentSound(null);
        }

        value.current -= 1;
        if(value.current >= 0){
            const nextTrack = playlist[value.current];
            setCurrentTrack(nextTrack);
            await play(nextTrack);
        } else {
            value.current = playlist.length - 1;
            const nextTrack = playlist[value.current];
            setCurrentTrack(nextTrack);
            await play(nextTrack);
        }
    }

    const handleLoop = async () => {

    }

    const handleShuffle = async () => {

    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
                                    return <SongListCard item={item} key={index} play={play} isPlaying={item === currentTrack} />
                                }
                            }
                        />
                    </View>

                </ScrollView>
            </LinearGradient>

            {currentTrack && (
                <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.player}>
                    <View style={styles.player__left}>
                        <Image style={styles.player__image} source={{ uri: currentTrack?.album?.images[0]?.url }} />
                        <View style={{ flexDirection: "column", gap: 5 }}>
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

            <Modal
                animationType='slide'
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modal__container}>
                    <View style={styles.modal__view}>
                        <View style={styles.modal__header}>
                            <Pressable onPress={() => setModalVisible(!modalVisible)}>
                                <Ionicons name="arrow-back-outline" size={24} color="white" />
                            </Pressable>
                            <AntDesign name="hearto" size={24} color="white" />
                        </View>
                        <Image style={styles.modal__image} source={{ uri: currentTrack?.album?.images[0]?.url }} />
                        <View style={styles.modal__text}>
                            <Text style={{ color: "white", fontSize: 25 }}>{currentTrack?.name}</Text>
                            <Text style={{ color: "#8E8E8E", fontSize: 15 }}>{currentTrack?.artists[0].name}</Text>
                        </View>
                        <View style={styles.modal__options}>
                            <View style={styles.progressbar__container}>
                                <View style={[styles.progressbar, { width: `${progress * 100}%` }]} />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                                <Text style={styles.modal__playtime}>{formatTime(currentTime)}</Text>
                                <Text style={styles.modal__playtime}>{formatTime(totalDuration)}</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 30, alignItems: "center" }}>
                                <Pressable onPress={() => { }}>
                                    <Ionicons name="shuffle" size={30} color="white" />
                                </Pressable>
                                <Pressable onPress={handlePrev}>
                                    <AntDesign name="stepbackward" size={30} color="white" />
                                </Pressable>
                                {
                                    isPlaying ? (
                                        <Pressable onPress={handlePlayPause}>
                                            <AntDesign name="pausecircle" size={50} color="white" />
                                        </Pressable>
                                    ) : (
                                        <Pressable onPress={handlePlayPause}>
                                            <AntDesign name="play" size={50} color="white" />
                                        </Pressable>
                                    )
                                }
                                <Pressable onPress={handleNext}>
                                    <AntDesign name="stepforward" size={30} color="white" />
                                </Pressable>
                                <Pressable onPress={() => { }}>
                                    <MaterialIcons name="loop" size={30} color="white" />
                                </Pressable>
                            </View>
                        </View>

                    </View>
                </View>
            </Modal>

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
    },
    modal__container: {
        flex: 1,
        backgroundColor: "black",
        paddingTop: 50
    },
    modal__view: {
        margin: 20,
        paddding: 20,
        flexDirection: "column",
        alignItems: "center"
    },
    modal__header: {
        width: "100%",
        flexDirection: "row",
        gap: 50,
        alignItems: "center",
        justifyContent: "space-between"
    },
    modal__image: {
        width: 300,
        height: 300,
        objectFit: "cover",
        marginTop: 30,
        borderRadius: 25
    },
    modal__text: {
        color: "white",
        marginTop: 30,
        gap: 20,
        alignItems: "center"
    },
    modal__options: {
        width: "100%",
        marginTop: 40,
        flexDirection: "column",
        gap: 10
    },
    progressbar__container: {
        width: "100%",
        height: 5,
        backgroundColor: "#4F4F4F",
        borderRadius: 20
    },
    progressbar: {
        height: "100%",
        backgroundColor: "white",
        borderRadius: 20
    },
    modal__playtime: {
        color: "white",
        fontSize: 15
    }
})