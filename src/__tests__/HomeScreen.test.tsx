import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { QueryClient, QueryClientProvider } from 'react-query';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

const MockedNavigator = ({ type }: { type: string }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} type={type} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

test('renders HomeScreen correctly and handles item press', async () => {
  const { getByText, findByText } = render(<MockedNavigator type="new" />);

  // Wait for the items to be loaded
  const item = await findByText('Some Story Title'); // Replace with an actual story title from your API
  expect(item).toBeTruthy();

  // Simulate item press
  fireEvent.press(item);
  // Assert that navigation happens or details screen is displayed
  // Add appropriate assertions based on your navigation setup
});
