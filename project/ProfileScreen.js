import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const ProfileScreen = ({ route, navigation }) => {

    const { itemId } = route.params;
    const [name, setName] = React.useState('');

    return (
        <View style={styles.container}>

            <Text>Profile Screen</Text>
            <Text>You came from item {itemId}</Text>

            <TextInput
                multiline
                placeholder='Whats your name?'
                value={name}
                onChangeText={setName}
            />

            <Button
                title='Go Back'
                onPress={() => navigation.goBack()}
            />
            <Button
                title="Go to Home Screen"
                onPress={() => navigation.navigate('Home', { name: name })}
            />
            <Button
                title="Go to First Page"
                onPress={() => navigation.popToTop()}
            />
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})