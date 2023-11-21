import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View, Pressable, ScrollView } from 'react-native';
import useActivity from '../hooks/useActivity';
import CommentHub from '../hubs/commentHub';
import { useSelector } from 'react-redux';
import agent from '../api/agent';

const ActivityDetailsScreen = ({ route: { params: { id, imageSource } } }) => {
  const [activity,refetchActivity] = useActivity(id);
  const [commentHub] = useState(new CommentHub());
  const { comments } = useSelector(state => state.comment);
  const [term, setTerm] = useState('');
  const { user } = useSelector(state => state.account)
  useEffect(() => {
    commentHub.createHubConnection(id);
    return () => {
      commentHub.clearComment();
    };
  }, [id]);
  
  const sendComment = () => {
    commentHub.sendComment({ body: term, activityId: id }).then(() => setTerm(''));
  };

  const toggleAttend = () => {
    agent.Activity.attendActivity(id).then(() => refetchActivity());
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={imageSource} style={styles.image} />

      <View style={styles.activityInfoContainer}>
        <Text style={styles.activityTitle}>{activity.title}</Text>
        <Text style={styles.activityDate}>{(new Date(activity.date)).toLocaleString('tr')}</Text>
        {
          activity.attendees.some(attend => attend.displayName === user.displayName)
            ?
            <Pressable onPress={toggleAttend} style={[styles.attendButton, {backgroundColor:'gray'}]}>
              <Text style={styles.attendButtonText}>Cancel Attendence</Text>
            </Pressable>
            :
            <Pressable onPress={toggleAttend} style={styles.attendButton}>
              <Text style={styles.attendButtonText}>Join Activity</Text>
            </Pressable>
        }
        <Text style={styles.activityProperty}>{activity.hostUsername}</Text>
        <Text style={styles.activityProperty}>{activity.description}</Text>
        <Text style={styles.activityProperty}>{activity.city}</Text>
        <Text style={styles.activityProperty}>{activity.venue}</Text>

        <View style={styles.attendeesContainer}>
          <Text style={styles.attendeesTitle}>Attendees:</Text>
          {activity.attendees.map(attendee => (
            <View key={attendee.username} style={styles.attendeeItem}>
              <Image source={{ uri: attendee.image }} style={styles.attendeeImage} />
              <Text style={styles.attendeeName}>{attendee.username}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.commentsContainer}>
        {comments.map(comment => (
          <View key={comment.id} style={styles.commentItem}>
            <View style={styles.commentHeader}>
              <Pressable style={styles.commentImageContainer}>
                <Image source={{ uri: comment.image }} style={styles.commentImage} />
              </Pressable>
              <View style={styles.commentDetailsContainer}>
                <Text style={styles.commentDetails}>
                  {comment.body} - {(new Date(comment.createdAt)).toLocaleString('tr')} - {comment.displayName}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Please enter a comment"
          value={term}
          onChangeText={setTerm}
        />
        <Pressable style={styles.sendButton} onPress={sendComment}>
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
    height: 300,
    width: '100%',
    marginBottom: 16,
  },
  activityInfoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  activityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  activityDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  activityProperty: {
    fontSize: 16,
    marginBottom: 8,
  },
  attendeesContainer: {
    marginBottom: 16,
  },
  attendeesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  attendeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  attendeeImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  attendeeName: {
    fontSize: 16,
  },
  commentsContainer: {
    padding: 16,
  },
  commentItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentImageContainer: {
    marginRight: 8,
    overflow: 'hidden',
    borderRadius: 20,
  },
  commentImage: {
    height: 40,
    width: 40,
  },
  commentDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentDetails: {
    fontSize: 14,
    color: '#555',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 8,
    paddingLeft: 8,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
  },
  attendButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  attendButtonText: {
    color: '#fff',
  },
});

export default ActivityDetailsScreen;
