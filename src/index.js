import React, {useState, useEffect} from 'react';
import {View, StatusBar, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Navigation from './navigations';
import {UserContext} from './context/userContext';

import {Colors, GlobalStyle} from './styles';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
  getJSExceptionHandler,
} from 'react-native-exception-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isAuthExist, getUser, setTheme} from './config/authSettings';
import {UpdateTheme} from './modules/theme/action';

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
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

setJSExceptionHandler(errorHandler, true);
setNativeExceptionHandler(errorString => {
  // do the things
  console.log('Native Error', errorString);
});

const Src = () => {
  const [auth, setAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [organization_id, setOrganization_id] = useState(null);
  const [workspace, setWorkspaces] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  const theme = useSelector(state => state.themeChange.theme);
  const Styles = GlobalStyle();
  const dispatch = useDispatch();

  React.useEffect(() => {
    AsyncStorage.getItem('Theme').then(res => {
      console.log('---Theme->>>', res);
      setTheme(res ? res : 'DARK');
      dispatch(UpdateTheme(res ? res : 'DARK'));
    });
  });

  useEffect(() => {
    // SplashScreen.hide();
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    isAuthExist().then(async res => {
      console.log(res, 'auth token');
      setAuth(res);
    });
    getUser().then(async res => {
      console.log('in the get user');
      if (res) {
        console.log('the user response==>>', res);
        setUserName(res.user_name);
        setUserId(res.id);
        setOrganization_id(res.organization_id);
        setUserRole(res.role);
        // setUserRole(res.role);
        //setUserRole('Store Manager');
      }
    });
    // console.disableYellowBox = true;
    // console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    // ClearCache.getAppCacheSize((value, unit) => {
    //   console.log(value, unit);
    // });
    // setTimeout(() => {
    //   ClearCache.clearAppCache(() => {
    //     console.log('cache clear');
    //   });
    // }, 100);
  }, []);

  return (
    <UserContext.Provider
      value={{
        auth: auth,
        setAuth: setAuth,
        userId: userId,
        setUserId: setUserId,
        userRole: userRole,
        setUserRole: setUserRole,
        userName: userName,
        setUserName: setUserName,
        organization_id: organization_id && organization_id,
        setOrganization_id: setOrganization_id,
        workspace: workspace,
        setWorkspaces: setWorkspaces,
      }}>
      <View style={[Styles.flex, Styles.primaryBackground]}>
        <StatusBar
          translucent={true}
          barStyle={theme === 'DARK' ? 'light-content' : 'dark-content'}
          backgroundColor={
            theme === 'DARK' ? Colors.BACKGROUND : Colors.WHISPER
          }
        />
        {/* <KeepAwake /> */}
        <Navigation
          notificationCount={notificationCount}
          setNotificationCount={setNotificationCount}
          setAuth={setAuth}
          setUserId={setUserId}
          setUserRole={setUserRole}
          setOrganization_id={setOrganization_id}
          setUserName={setUserName}
          organization_id={organization_id && organization_id}
          workspace={workspace}
          setWorkspaces={setWorkspaces}
          userRole={userRole ? userRole : 'admin'}
          userName={userName ? userName : 'Unnamed Person'}
          userId={userId && userId}
          theme={theme === 'DARK' ? Colors.DarkTheme : Colors.LightTheme}
        />
      </View>
    </UserContext.Provider>
  );
};

export default Src;
