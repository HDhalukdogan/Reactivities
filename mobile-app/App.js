import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import 'react-native-gesture-handler';
import Screens from "./src/navigation/Screens";
import { PaperProvider } from 'react-native-paper';


const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer >
          <Screens />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
