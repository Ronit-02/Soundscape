import React from 'react'
import { StyleSheet, Text, Pressable, Image } from 'react-native'
import { usePlayer } from '../contexts/Player'

const SongCard = ({ item }) => {

    const { currentTrack, setCurrentTrack } = usePlayer();

    const handlePress = () => {
        setCurrentTrack(item);
    }   

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            <Image style={styles.image} source={{ uri: item.album.images[0].url }} />
            <Text style={styles.text}>{item?.name}</Text>
        </Pressable>
    )
}

export default SongCard;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: "column",
        alignItems: "center",
        gap: 15
    },
    image: {
        width: 130,
        height: 130,
        borderRadius: 10,
        marginRight: 10
    },
    text: {
        color: "#F2F2F2",
        fontSize: 17,
        fontWeight: "100",
        marginTop: 10
    }
})