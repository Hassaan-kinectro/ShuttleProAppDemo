import React from 'react';
import {Provider} from 'react-redux';
import store from './src/modules';
import './src/i18n';
import Src from './src';
import FlashMessage from 'react-native-flash-message';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const App = () => {
  return (
    <Provider store={store}>
      <Src />
      <FlashMessage position={'top'} />
    </Provider>
  );
};

export default App;
