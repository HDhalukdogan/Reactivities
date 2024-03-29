import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, logout } from '../store';
import CommentHub from '../hubs/commentHub';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ConfirmDialog from '../components/ConfirmDialog';
const image = require('../../assets/home-image.jpg')
const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.account.user)
    const initApp = useCallback(async () => {
        const user = await dispatch(fetchCurrentUser());
    }, [dispatch])
    const commentHub = new CommentHub();
    useEffect(() => {
        commentHub.createHubConnection();
        initApp();
    }, [initApp])

    const [visible, setVisible] = useState(false)
    const handleOkClick = () => {
        dispatch(logout())
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>

                <Text style={styles.title}>Activity App {currentUser?.displayName}</Text>
                {currentUser && <><Pressable
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed ? '#2c3e50' : '#3498db', // Change color on press
                        },
                    ]}
                    onPress={() => navigation.navigate('AppDrawer', { screen: 'ActivityStack', params: { screen: 'Activities' } })}
                >
                    <MaterialCommunityIcons name="dance-ballroom" size={26} color="white" />
                    <Text style={[styles.buttonText, { marginLeft: 5 }]}>Go To Activities</Text>
                </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            {
                                backgroundColor: pressed ? '#34495e' : '#3498db', // Change color on press
                            },
                        ]}
                        onPress={() => navigation.navigate('AppDrawer',
                            { screen: 'ProfileStack', params: { screen: 'Profile' } }
                        )}
                    >
                        <Entypo name="user" size={24} color="white" />
                        <Text style={[styles.buttonText, { marginLeft: 5 }]}>Go To Profile</Text>
                    </Pressable>
                </>}
                {currentUser ? (
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            {
                                backgroundColor: pressed ? '#992d22' : '#e74c3c', // Change color on press
                            },
                        ]}
                        onPress={() => {
                            setVisible(true)
                        }}
                    >
                        <Entypo name="log-out" size={24} color="white" />
                        <Text style={styles.buttonText}>Logout</Text>
                    </Pressable>
                ) : (
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            {
                                backgroundColor: pressed ? '#34495e' : '#3498db', // Change color on press
                            },
                        ]}
                        onPress={() => navigation.navigate('Account', { screen: 'Account' })}
                    >
                        <Entypo name="login" size={24} color="white" />
                        <Text style={styles.buttonText}>Login or Register</Text>
                    </Pressable>
                )}
            </ImageBackground>
            <ConfirmDialog
                title='Logout'
                content='Are you sure?'
                visible={visible}
                setVisible={setVisible}
                onOkClick={handleOkClick}
                onCancelClick={() => {}}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginVertical: 10,
        opacity: 0.8
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});