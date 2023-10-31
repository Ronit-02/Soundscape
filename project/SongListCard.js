import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'

const SongListCard = ({ item }) => {
    return (
        <Pressable style={styles.container}>
            <Image style={styles.image} source={{uri: item.album.images[0].url}} />
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