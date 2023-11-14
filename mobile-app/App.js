import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ActivitiesScreen from './src/screens/ActivitiesScreen';
import LoginScreen from './src/screens/LoginScreen';
import { Provider } from 'react-redux';
import { store } from './src/store';


const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Activities' component={ActivitiesScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
