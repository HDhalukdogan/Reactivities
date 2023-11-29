import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Drawer } from 'react-native-drawer-layout';
const DrawerLayout = ({ open, setOpen,children }) => {
    return (
        <Drawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            renderDrawerContent={() => {
                return <Text>Drawer content</Text>;
            }}
        >
            {children}
        </Drawer>
    )
}

export default DrawerLayout;

const styles = StyleSheet.create({})