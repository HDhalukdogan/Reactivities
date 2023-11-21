import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, logout } from '../store';
import CommentHub from '../hubs/commentHub';

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
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activity App {currentUser?.displayName}</Text>

            {currentUser && <><Pressable
                style={({ pressed }) => [
                    styles.button,
                    {
                        backgroundColor: pressed ? '#2c3e50' : '#3498db', // Change color on press
                    },
                ]}
                onPress={() => navigation.navigate('Activities')}
            >
                <Text style={styles.buttonText}>Go To Activities</Text>
            </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed ? '#34495e' : '#3498db', // Change color on press
                        },
                    ]}
                    onPress={() => navigation.navigate('Profile', { username: currentUser.username })}
                >
                    <Text style={styles.buttonText}>Go To Profile</Text>
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
                    onPress={() => dispatch(logout())}
                >
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
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login or Register</Text>
                </Pressable>
            )}
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});