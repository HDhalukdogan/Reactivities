import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';

const Header = (props) => {
    const currentUser = useSelector(state => state.account.user);
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(logout())
        props.navigation.navigate("Home");
    }
    return (
        <View style={styles.header}>
            <View style={styles.buttonContainer}>
                {currentUser && <Pressable
                    style={styles.button}
                    onPress={props.navigation.openDrawer}
                >
                    <FontAwesome name="navicon" size={24} color="white" />
                </Pressable>}
                {props.backForward && <Pressable style={styles.button} onPress={props.navigation.goBack}>
                    <FontAwesome name="backward" size={24} color="white" />
                </Pressable>}
            </View>
            <Text style={styles.headerText}>{props.route.name}</Text>
            {currentUser && <Pressable style={styles.button} onPress={signOut}>
                <Text style={styles.buttonText}>Logout</Text>
            </Pressable>}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3498db', // You can change the background color
        paddingTop: 25,
    },
    headerText: {
        color: '#fff', // You can change the text color
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        padding: 8,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff', // You can change the button text color
    },
});

export default Header;
