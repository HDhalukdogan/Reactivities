import React from 'react'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {/* <DrawerItem label="Home" onPress={() => props.navigation.navigate('Home')} /> */}
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent