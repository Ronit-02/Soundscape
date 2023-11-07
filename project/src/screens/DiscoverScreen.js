import { StyleSheet, View, Text, ScrollView, TextInput, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import SongCard from '../components/SongCard'
import AlbumCard from '../components/AlbumCard'
import { tracks } from '../api/data'
import SongListCard from '../components/SongListCard';

const DiscoverScreen = () => {

    const [charts, setCharts] = useState([]);
    const [genres, setGenres] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [music, setMusic] = useState([]);
    const [searchClick, setSearchClick] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [searchedTracks, setSearchedTracks] = useState([]);

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

    const handleInput = (phrase) => {
        setSearchPhrase(phrase);

        const filteredTracks = tracks.filter((item) => item.name.toLowerCase().includes(phrase.toLowerCase()));
        setSearchedTracks(filteredTracks);
    }


    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <ScrollView style={styles.container}>

                <View style={styles.searchbar__container}>
                    <View style={
                        searchClick ? (
                            styles.searchbar__clicked
                        ) : (
                            styles.searchbar__unclicked
                        )
                    }>
                        <TextInput
                            style={styles.searchbar__input}
                            placeholder='Search'
                            value={searchPhrase}
                            onChangeText={(input) => handleInput(input)}
                            onFocus={() => {
                                setSearchClick(true);
                            }}
                        />
                        <AntDesign name="search1" size={20} color="#8E8E8E" />
                    </View>
                </View>

                {
                    searchPhrase ?
                        (
                            <>
                                <View style={styles.searched__container}>
                                    <Text style={styles.searched__heading}>
                                        Search Results
                                    </Text>
                                    <FlatList
                                        style={styles.searched__scroller}
                                        data={searchedTracks}
                                        renderItem={
                                            ({ item, index }) => {
                                                return <SongListCard item={item} key={index} />
                                            }
                                        }
                                    />
                                </View>
                            </>
                        ) :
                        (
                            <>
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
                            </>

                        )
                }


            </ScrollView>
        </LinearGradient>
    )
}

export default DiscoverScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 100
    },
    searchbar__container: {
        backgroundColor: '#141414',
        marginTop: 25,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
    },
    searchbar__unclicked: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    searchbar__clicked: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    searchbar__input: {
        color: "#8E8E8E",
        fontSize: 14,
        width: "80%",
        outlineStyle: "none"
    },
    searched__container: {
        marginTop: 50,
        flexGrow: 1
    },
    searched__heading: {
        color: "white",
        fontSize: 22
    },
    searched__scroller: {
        marginTop: 20,
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