import { StyleSheet, View } from 'react-native'
import React from 'react'
import AuthForm from '../components/AuthForm'
import { loginUser } from '../store'
import { useDispatch } from 'react-redux'

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const submit = async (data) => {
        const res = await dispatch(loginUser(data));
        if(!res.error){
            navigation.navigate('Home');
        }
    }
    return (
        <View style={styles.container}>
            <AuthForm submit={submit} />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
})