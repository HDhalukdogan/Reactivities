import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useActivity from '../hooks/useActivity'
import CommentHub from '../hubs/commentHub';
import { useSelector } from 'react-redux';

const ActivityDetailsScreen = ({ route: { params: { id, imageSource } } }) => {
    const [activity] = useActivity(id);
    const [commentHub] = useState(new CommentHub())
    const { comments } = useSelector(state => state.comment);
    const [term, setTerm] = useState('')
    useEffect(() => {
        commentHub.createHubConnection(id);
        return () => {
            commentHub.clearComment();
        }
    }, [id])

    const sendComment = () => {
        commentHub.sendComment({ body: term, activityId: id }).then(() => setTerm(''))
    }

    return (
        <View>
            <Text>{activity.title}</Text>
            <Image source={imageSource} style={{ height: 300, width: 300 }} />
            {comments.map(comment => <Text key={comment.id}>{comment.body}</Text>)}
            <TextInput placeholder='please enter a comment' value={term} onChangeText={setTerm} />
            <Button title='Send' onPress={sendComment} />
        </View>
    )
}

export default ActivityDetailsScreen

const styles = StyleSheet.create({})