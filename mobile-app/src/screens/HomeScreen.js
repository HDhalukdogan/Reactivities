import { Button, StyleSheet, Text, View } from 'react-native'
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
            <Text>Activity App {currentUser?.displayName}</Text>
            <Button title='Go To Activities' onPress={() => navigation.navigate('Activities')} />
            {currentUser ?
                <Button title='Logout' onPress={() => dispatch(logout())} /> :
                <Button title='Login or Register' onPress={() => navigation.navigate('Login')} />}
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})