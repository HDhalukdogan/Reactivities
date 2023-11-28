import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Image, Alert } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
const CustomDrawerContent = (props) => {
    const currentUser = useSelector(state => state.account.user)
    const userInfo = <View style={styles.container}>
        <Text>{currentUser?.displayName}</Text>
        <Image style={styles.profileImage} source={{ uri: currentUser?.image }} />
    </View>
    return (
        <DrawerContentScrollView {...props}>
            {userInfo}
            <DrawerItemList {...props} />
            {/* <DrawerItem label="Home" onPress={() => props.navigation.navigate('Home')} /> */}
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 20,
        marginVertical: 10,
    },
});