import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {DomainAuthProvider} from './contexts/DomainAuthContext';

import Header from './components/Header';

import HomeScreen from './screens/Home';
import SuburbSearchScreen from './screens/SuburbSearch';

const Stack = createStackNavigator();

const App = () => {
  console.log('hi', Header);
  return (
    <DomainAuthProvider>
      <NavigationContainer>
        <Stack.Navigator mode="modal" screenOptions={{header: Header}}>
          <Stack.Screen
            name="Home"
            options={{
              title: 'Property Hunter',
              rightIcons: [{icon: 'magnify', navTo: 'SuburbSearch'}],
            }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="SuburbSearch"
            options={{
              title: 'Select a suburb',
            }}
            component={SuburbSearchScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DomainAuthProvider>
  );
};

export default App;
