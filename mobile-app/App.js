import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ActivitiesScreen from './src/screens/ActivitiesScreen';
import LoginScreen from './src/screens/LoginScreen';
import { Provider } from 'react-redux';
import { store } from './src/store';
import ActivityDetailsScreen from './src/screens/ActivityDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import 'react-native-gesture-handler';


const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
          }}>
          <Stack.Screen name='Home'
            component={HomeScreen}
            options={{
              headerTransparent: true,
              headerShown:false
            }}
          />
          <Stack.Screen name='Activities' component={ActivitiesScreen} />
          <Stack.Screen name='ActivityDetails' component={ActivityDetailsScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Profile' component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
