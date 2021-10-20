/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 import { Provider } from 'react-redux';
 import { PersistGate } from 'redux-persist/integration/react';
 import { store, persistor } from './src/store';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import Home from './src/screens/Home';
import Favourite from './src/screens/Favourite';
import Search from './src/screens/Search';
import AppRouteNavigator from './src/navigation/AppRouteNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { getAllCharacters } from './src/actions/charecters';

 
 
 const App = () => {
 
   return (
     <>
       <Provider store={store}>
         <PersistGate persistor={persistor}>
           <NavigationContainer>
             <AppRouteNavigator />
           </NavigationContainer>
         </PersistGate>
       </Provider>
     </>
   );
 };
 
 
 export default App;
 