import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ActitiyCard from '../components/ActitiyCard';
import useActivity from '../hooks/useActivity';

const ActivitiesScreen = () => {
  const [activities, activitiesLoaded] = useActivity();

  const keyExtractor = (item) => item.id.toString();

  const renderActivity = ({ item }) => (
    <ActitiyCard key={item.id} activity={item} />
  );

  return (
    <View style={styles.container}>
      {activitiesLoaded ? (
        <FlatList
          data={activities}
          keyExtractor={keyExtractor}
          renderItem={renderActivity}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  flatListContainer: {
    paddingVertical: 16,
  },
});

export default ActivitiesScreen;
