import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dimensions } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivitiesScreen from '../screens/ActivitiesScreen';
import ActivityDetailsScreen from '../screens/ActivityDetailsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/Header';

const { width } = Dimensions.get("screen");

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const ActivityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Activities'
        component={ActivitiesScreen}
        options={{
          header: (props) => <Header {...props} />
        }}
      />
      <Stack.Screen
        name='ActivityDetails'
        component={ActivityDetailsScreen}
        options={{
          header: (props) => <Header {...props} backForward/>
        }}
      />
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          header: (props) => <Header {...props} />
        }}
      />
    </Stack.Navigator>
  )
}

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          header: (props) => <Header {...props} backForward />
        }}
      />
    </Stack.Navigator>
  )
}

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "white",
          width: width * 0.7,
        },
        drawerItemStyle: {
          width: width * 0.64,
          paddingHorizontal: 12,
          paddingVertical: 4,
          justifyContent: "center",
          alignContent: "center",
          // alignItems: 'center',
          overflow: "hidden",
        },
        drawerLabelStyle: {
          fontSize: 14,
          fontWeight: "normal",
        },
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "#000",
        drawerActiveBackgroundColor: '#3498db',
        drawerInactiveBackgroundColor: 'transparent'
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, color, size }) => <Entypo name="home" size={size} color={focused ? color : '#979797'} />,
        }}
      />
      <Drawer.Screen
        name='ActivityStack'
        component={ActivityStack}
        options={{
          title: 'Activities',
          drawerIcon: ({ focused, color, size }) => <MaterialCommunityIcons name="dance-ballroom" size={size} color={focused ? color : '#979797'} />
        }}
      />
      <Drawer.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          title: 'Profile',
          drawerIcon: ({ focused, color, size }) => <Entypo name="user" size={size} color={focused ? color : '#979797'} />
        }}
      />
    </Drawer.Navigator>
  )
}

const Screens = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name='Home'
        component={HomeScreen}
        options={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name='Account'
        component={AccountStack}
        options={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name='AppDrawer' component={AppDrawer} options={{ headerTransparent: true }} />
    </Stack.Navigator>
  )
}

export default Screens

const styles = StyleSheet.create({})