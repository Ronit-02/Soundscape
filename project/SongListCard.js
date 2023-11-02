import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useContext } from 'react'
import { Player } from './PlayerContext'
import { Foundation } from '@expo/vector-icons';

const SongListCard = ({ item, play, isPlaying }) => {

    const { currentTrack, setCurrentTrack } = useContext(Player);

    const handlePress = () => {
        setCurrentTrack(item);
        play(item);
    }

    return (
        <Pressable style={styles.container} onPress={handlePress}>
            {
                isPlaying ? (
                    <View style={{position:"relative"}}>
                        <Image style={styles.image__darkened} source={{ uri: item.album.images[0].url }} />
                        <Foundation style={styles.image__icon} name="sound" size={20} color="white" />
                    </View>
                ) : (
                    <Image style={styles.image} source={{ uri: item.album.images[0].url }} />
                )
            }
            <View style={styles.text}>
                <Text style={styles.name}>{item?.name}</Text>
                <Text style={styles.singer}>{item.artists[0].name}</Text>
            </View>
        </Pressable>
    )
}

export default SongListCard;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: "row",
        gap: 15
    },
    image: {
        width: 130,
        height: 130,
        borderRadius: 10,
        marginRight: 10
    },
    image__darkened: {
        width: 130,
        height: 130,
        borderRadius: 10,
        marginRight: 10,
        opacity: 0.5
    },
    image__icon: {
        position: "absolute",
        right: 20,
        bottom: 10
    },
    text: {
        flexDirection: "column",
        gap: 5
    },
    name: {
        color: "#F2F2F2",
        fontSize: 17,
        fontWeight: "500",
        marginTop: 10
    },
    singer: {
        color: "#DEDEDE",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 10
    }
})