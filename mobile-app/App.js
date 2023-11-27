import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import 'react-native-gesture-handler';
import Screens from "./src/navigation/Screens";


const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer >
        <Screens />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
