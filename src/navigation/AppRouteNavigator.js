import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Search from '../screens/Search';
import DetailScreen from '../screens/DetailScreen';
import {useDispatch} from 'react-redux';
import {getAllCharacters} from '../actions/charecters';
import Favourite from '../screens/Favourite';

const RootStack = createStackNavigator();

function AppRouteNavigator() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCharacters());
  }, []);
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="Detail" component={DetailScreen} />
      <RootStack.Screen name="Search" component={Search} />
      <RootStack.Screen name="Favourite" component={Favourite} />
    </RootStack.Navigator>
  );
}

export default AppRouteNavigator;
