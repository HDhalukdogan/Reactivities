import React from 'react';
import { Image, Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ActitiyCard = ({ activity }) => {
  const navigation = useNavigation();

  let imageSource = require('../../assets/categoryImages/culture.jpg');

  switch (activity.category) {
    case 'film':
      imageSource = require('../../assets/categoryImages/film.jpg');
      break;
    case 'drinks':
      imageSource = require('../../assets/categoryImages/drinks.jpg');
      break;
    case 'food':
      imageSource = require('../../assets/categoryImages/food.jpg');
      break;
    case 'music':
      imageSource = require('../../assets/categoryImages/music.jpg');
      break;
    case 'travel':
      imageSource = require('../../assets/categoryImages/travel.jpg');
      break;
    default:
      break;
  }

  return (
    <Pressable onPress={() => navigation.navigate('ActivityDetails', { id: activity.id, imageSource })}>
      <View style={styles.card}>
        <Image style={styles.image} source={imageSource} />

        {/* Make some properties absolute on the image */}
        <View style={styles.absoluteContainer}>
          <Text style={[styles.absoluteText, styles.hostText]}>{activity.hostUsername}</Text>
          <Text style={styles.absoluteText}>{(new Date(activity.date)).toLocaleString('tr')}</Text>
          <Text style={styles.absoluteText}>{activity.city}</Text>
          <Text style={styles.absoluteText}>{activity.venue}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{activity.title}</Text>
          <Text style={styles.description}>{activity.description}</Text>

          {/* Make attendees horizontal */}
          <View style={styles.attendeesContainer}>
            <Text style={styles.subtitle}>Attendees:</Text>
            <View style={styles.attendees}>
              {activity.attendees.map(attendee => (
                <View key={attendee.username} style={styles.attendeeContainer}>
                  <Image source={{ uri: attendee.image }} style={styles.attendeeImage} />
                  <Text style={styles.attendeeName}>{attendee.username}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    margin: 16,
    width: width - 32, // Set the width to the screen width minus margin
  },
  image: {
    height: 200,
    width: '100%',
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  absoluteContainer: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
  },
  absoluteText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
  hostText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
    marginTop: 16,
  },
  attendeesContainer: {
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
  attendees: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  attendeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  attendeeImage: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  attendeeName: {
    fontSize: 14,
  },
});

export default ActitiyCard;
