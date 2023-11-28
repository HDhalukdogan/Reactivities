import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = (props) => {
    console.log('props', props)
    return (
        <View>
            <Text>{props.route.name}</Text>
            <Button title={props.back.title} onPress={props.navigation.openDrawer}/>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})