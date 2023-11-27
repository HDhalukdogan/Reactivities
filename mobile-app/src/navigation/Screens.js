import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dimensions } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivitiesScreen from '../screens/ActivitiesScreen';
import ActivityDetailsScreen from '../screens/ActivityDetailsScreen';

const Stack = createNativeStackNavigator();

const ActivityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Activities' component={ActivitiesScreen} />
      <Stack.Screen name='ActivityDetails' component={ActivityDetailsScreen} />
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Navigator>
  )
}


const Screens = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
      }}>
      <Stack.Screen name='Home'
        component={HomeScreen}
        options={{
          headerTransparent: true,
          headerShown: false
        }}
      />
      <Stack.Screen name='ActivityStack' component={ActivityStack} options={{ headerShown: false }} />
      <Stack.Screen name='ProfileStack' component={ProfileStack} options={{ headerShown: false }} />

    </Stack.Navigator>
  )
}

export default Screens

const styles = StyleSheet.create({})