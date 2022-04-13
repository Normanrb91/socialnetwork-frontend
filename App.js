import 'react-native-gesture-handler';
import React from 'react';

import { Provider } from 'react-redux'
import { store } from './src/store/store';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';



const App = () => {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </NavigationContainer>
  )
}

export default App