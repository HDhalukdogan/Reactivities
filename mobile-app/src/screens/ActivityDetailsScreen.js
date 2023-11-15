import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useActivity from '../hooks/useActivity'

const ActivityDetailsScreen = ({ route: { params: { id, imageSource } } }) => {
    const [activity] = useActivity(id);

    return (
        <View>
            <Text>{activity.title}</Text>
            <Image source={imageSource} style={{ height: 400, width: 400 }} />
        </View>
    )
}

export default ActivityDetailsScreen

const styles = StyleSheet.create({})