import React from 'react';
import {Provider} from 'react-redux';
import store from './src/modules';
import './src/i18n';
import Src from './src';
import FlashMessage from 'react-native-flash-message';
import {
  requestUserPermission,
  notificationListener,
} from './src/utils/notifications';
const App = () => {
  React.useEffect(() => {
    console.log('useEffect ran');
    requestUserPermission();
    notificationListener();
  }, []);
  return (
    <Provider store={store}>
      <Src />
      <FlashMessage position={'top'} />
    </Provider>
  );
};

export default App;
