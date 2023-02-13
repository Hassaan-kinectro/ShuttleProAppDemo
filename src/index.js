/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, StatusBar, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './navigations';
import {Colors, GlobalStyle} from './styles';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
  getJSExceptionHandler,
} from 'react-native-exception-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser, setTheme} from './config/authSettings';
import {UpdateTheme} from './modules/theme/action';
import {SetUser} from './modules/user/action';

const reporter = error => {
  // Logic for reporting to devs
  // Example : Log issues to github issues using github apis.
  console.log(error); // sample
};
const previousErrorHandler = getJSExceptionHandler();
const errorHandler = (e, isFatal) => {
  if (isFatal) {
    previousErrorHandler(e, isFatal);
    reporter(e);
    Alert.alert(
      'Unexpected error occurred',
      `
        Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}

        We have reported this to our team ! Please close the app and start again!
        `,
      [
        {
          text: 'Close',
          onPress: () => {
            console.log('Close');
          },
        },
      ],
    );
  } else {
    console.log(e);
  }
};

setJSExceptionHandler(errorHandler, true);
setNativeExceptionHandler(errorString => {});

const Src = () => {
  const theme = useSelector(state => state.themeChange.theme);
  const Styles = GlobalStyle();
  const dispatch = useDispatch();

  React.useEffect(() => {
    AsyncStorage.getItem('Theme').then(res => {
      setTheme(res ? res : 'DARK');
      dispatch(UpdateTheme(res ? res : 'DARK'));
    });
  }, []);
  useEffect(() => {
    SplashScreen.hide();
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    getUser().then(async res => {
      if (res) {
        console.log(res);
        dispatch(SetUser(res ? res : null));
      }
    });
  }, []);

  return (
    <View style={[Styles.flex, Styles.primaryBackground]}>
      <StatusBar
        translucent={true}
        barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'DARK' ? Colors.BACKGROUND : Colors.WHISPER}
      />
      <Navigation
        theme={theme === 'DARK' ? Colors.DarkTheme : Colors.LightTheme}
      />
    </View>
  );
};

export default Src;
