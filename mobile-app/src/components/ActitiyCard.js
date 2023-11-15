import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';



const ActitiyCard = ({ activity }) => {
    const navigation = useNavigation()


    let imageSource = require('../../assets/categoryImages/culture.jpg');

    switch (activity.category) {
        case "film":
            imageSource = require('../../assets/categoryImages/film.jpg');
            break;
        // case "culture":
        //     imageSource = require('../../assets/categoryImages/culture.jpg');
        //     break;
        case "drinks":
            imageSource = require('../../assets/categoryImages/drinks.jpg');
            break;
        case "food":
            imageSource = require('../../assets/categoryImages/food.jpg');
            break;
        case "music":
            imageSource = require('../../assets/categoryImages/music.jpg');
            break;
        case "travel":
            imageSource = require('../../assets/categoryImages/travel.jpg');
            break;
        default:
            break;
    }

    return (
        <Pressable onPress={()=> navigation.navigate('ActivityDetails',{id: activity.id,imageSource})}>
            <View style={styles.card}>
                <Text>{activity.title} - {activity.hostUsername} - {(new Date(activity.date)).toLocaleString('tr')}</Text>
                <Image style={styles.image} source={imageSource} />
                {activity.attendees.map(attendee => (<View key={attendee.username}>
                    <Text>{attendee.username}</Text>
                    <Image source={{ uri: attendee.image }} style={{ height: 20, width: 20 }} />
                </View>))}
            </View>
        </Pressable>
    );
};

export default ActitiyCard

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: 'black'
    },
    image: {
        height: 200,
        width: 200
    }
})