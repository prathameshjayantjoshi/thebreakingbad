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
  
const horizontalAnimation = {
  gestureDirection: 'horizontal',
  headerShown:false,
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
  return (
    <RootStack.Navigator
    // mode="card"
      // screenOptions={{
      //   headerShown: false,
      // }}
      screenOptions={horizontalAnimation}
      >
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="Detail" component={DetailScreen} />
      <RootStack.Screen name="Search" component={Search} />
      <RootStack.Screen name="Favourite" component={Favourite} />
    </RootStack.Navigator>
  );
}

export default AppRouteNavigator;
