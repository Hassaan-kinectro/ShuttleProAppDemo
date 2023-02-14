import React from 'react';
import {Provider} from 'react-redux';
import store from './src/modules';
import './src/i18n';
import Src from './src';
import FlashMessage from 'react-native-flash-message';
import enviroment from './src/config/environment';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {getAuthToken} from './src/config/authSettings';

const link = new createHttpLink({
  uri: `${enviroment.url}/graphql`,
  // credentials: ‘same-origin’,
});
const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  return getAuthToken().then(res => {
    if (res) {
      return {
        headers: {
          ...headers,
          authorization: res ? `Bearer ${res}` : '',
        },
      };
    } else {
      return {
        headers: {
          ...headers,
        },
      };
    }
  });
});
const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Src />
        <FlashMessage position={'top'} />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
