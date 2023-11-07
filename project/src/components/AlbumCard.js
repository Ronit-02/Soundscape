import { StyleSheet, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const AlbumCard = ({ item }) => {

    const navigation = useNavigation();
    const imageUrl = item.album.images[0].url;

    return (
        <Pressable
            onPress={() => navigation.navigate('Playlist', { name: item.name, image: imageUrl })}
            style={styles.container}
        >
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <Text style={styles.text}>{item?.name}</Text>
        </Pressable>
    )
}

export default AlbumCard;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: "column",
        alignItems: "center",
        gap: 15
    },
    image: {
        width: 230,
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