import React, { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import useProfile from '../hooks/useProfile';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Profile from '../components/Profile';
import ProfilePhotos from '../components/ProfilePhotos';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';





const ProfileScreen = ({ navigation }) => {
  const currentUser = useSelector(state => state.account.user)
  const [profile, loading, error] = useProfile(currentUser.username)
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'profile', title: 'Profile',icon: <Entypo name="user" size={16} color="white" />},
    { key: 'photos', title: 'Photos',icon:<FontAwesome name="photo" size={16} color="white" /> },
  ]);

  //Do not pass inline functions to SceneMap, for example, don't do the following:
  // const renderScene = SceneMap({
  //   profile: () => <Profile profile={profile} loading={loading} error={error} navigation={navigation} />,
  //   photos: ProfilePhotos,
  // });

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'profile':
        return <Profile profile={profile} loading={loading} error={error} navigation={navigation} />;
      case 'photos':
        return <ProfilePhotos />;
      default:
        return null;
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#3498db' }}
      renderIcon={({ route, focused, color }) => (
        route.icon
      )}
    
    />
  );

  return (
    <TabView
      //lazy={({ route }) => route.name === 'photos'} or lazy
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition='bottom'
      renderTabBar={renderTabBar}
    />
  );
}


export default ProfileScreen;

const styles = StyleSheet.create({})