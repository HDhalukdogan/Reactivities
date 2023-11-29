import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';
import { Menu, Divider } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

const Header = (props) => {
    const currentUser = useSelector(state => state.account.user);
    const dispatch = useDispatch();
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

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
            {currentUser && <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<Pressable style={styles.button} onPress={openMenu}>
                    <Entypo name="user" size={24} color="white" />
                </Pressable>}>
                <Menu.Item onPress={() => {
                    props.navigation.navigate('AppDrawer', { screen: 'ProfileStack', params: { screen: 'Profile' } });
                    closeMenu();
                }} title="My Profile" />
                {/* <Menu.Item onPress={() => { }} title="My Activities" /> */}
                <Divider />
                <Menu.Item
                    onPress={signOut}
                    title={<View style={styles.logoutMenu}>
                        <Entypo name="log-out" size={24} color="black" />
                        <Text>Logout</Text>
                    </View>}
                />
            </Menu>}
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
    logoutMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});

export default Header;
