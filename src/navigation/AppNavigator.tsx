// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStackNavigator = ({ type }: { type: string }) => (
  <Stack.Navigator>
    <Stack.Screen name="Home">
      {(props) => <HomeScreen {...props} type={type} />}
    </Stack.Screen>
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="New">
        {(props) => <HomeStackNavigator {...props} type="new" />}
      </Tab.Screen>
      <Tab.Screen name="Top">
        {(props) => <HomeStackNavigator {...props} type="top" />}
      </Tab.Screen>
      <Tab.Screen name="Best">
        {(props) => <HomeStackNavigator {...props} type="best" />}
      </Tab.Screen>
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
