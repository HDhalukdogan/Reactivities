import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActitiyCard from '../components/ActitiyCard';
import useActivity from '../hooks/useActivity';
const ActivitiesScreen = () => {
    const [activities, activitiesLoaded] = useActivity();
    const renderedActivities = activities.map(activity => <ActitiyCard key={activity.id} activity={activity} />)
    return (
        <View>
            {activitiesLoaded ? renderedActivities : <Text>Loading...</Text>}
        </View>
    )
}

export default ActivitiesScreen

const styles = StyleSheet.create({})