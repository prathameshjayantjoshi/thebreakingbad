import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store';
import AppRouteNavigator from './src/navigation/AppRouteNavigator';
import {NavigationContainer} from '@react-navigation/native';

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
