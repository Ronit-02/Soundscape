import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import SongCard from './SongCard'
import AlbumCard from './AlbumCard'
import { tracks } from './data'

const DiscoverScreen = () => {

    const [charts, setCharts] = useState([]);
    const [genres, setGenres] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [music, setMusic] = useState([]);

    useEffect(() => {
        const getCharts = () => {
            const list = tracks.slice(6, 9);
            setCharts(list);
        }
        const getGenres = () => {
            const list = tracks.slice(9, 12);
            setGenres(list);
        }
        const getAlbums = () => {
            const list = tracks.slice(12, 15);
            setAlbums(list);
        }
        const getMusic = () => {
            const list = tracks.slice(15, 18);
            setMusic(list);
        }

        getCharts();
        getGenres();
        getAlbums();
        getMusic();
    }, [])


    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <ScrollView style={styles.container}>

                <View style={styles.section}>
                    <Text style={styles.heading}>
                        Top Charts
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scroller}
                    >
                        {charts.map((item, index) => {
                            return <AlbumCard item={item} key={index} />
                        })}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>
                        Best Genres
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scroller}
                    >
                        {genres.map((item, index) => {
                            return <SongCard item={item} key={index} />
                        })}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>
                        Trending Albums
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
                        Hot Music
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

export default DiscoverScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
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