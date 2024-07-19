import React from 'react';
import { render } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import DetailsScreen from '../screens/DetailsScreen';

const queryClient = new QueryClient();

const route = {
  params: { id: 2921983 }, // Replace with an actual ID from your API
};

test('renders DetailsScreen correctly', async () => {
  const { findByText } = render(
    <QueryClientProvider client={queryClient}>
      <DetailsScreen route={route} />
    </QueryClientProvider>
  );

  // Wait for the details to be loaded
  const title = await findByText('Some Story Title'); // Replace with an actual story title from your API
  expect(title).toBeTruthy();

  const byline = await findByText(/by some_author/i); // Replace with an actual author name from your API
  expect(byline).toBeTruthy();
});
