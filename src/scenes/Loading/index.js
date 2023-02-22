/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {StackActions, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {GlobalStyle} from '../../styles';
import {Routes} from '../../utils/constants';
import messaging from '@react-native-firebase/messaging';
import {isAuthExist} from '../../config/authSettings';
import {requestUserPermission} from '../../utils/notifications';
const LoadingScreen = ({navigation, route}) => {
  const {colors} = useTheme();
  const Styles = GlobalStyle();
  const workspace = useSelector(state => state.workspace.workspace);

  React.useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);
  React.useEffect(() => {
    isAuthExist().then(async res => {
      if (res) {
        setTimeout(() => {
          if (workspace) {
            navigation.dispatch(StackActions.replace(Routes.WORKSPACES));
          } else {
            navigation.dispatch(StackActions.replace(Routes.WORKSPACES));
          }
        }, 1000);
      } else {
        navigation.dispatch(StackActions.replace(Routes.LOGIN));
      }
    });
  }, [navigation]);
  const openNotification = notification => {
    if (notification && notification.data && notification.data.type) {
      if (notification.data.type === 'story') {
        const images = notification.data.images
          ? JSON.parse(notification.data.images)
          : [];

        navigation.dispatch(
          StackActions.replace(Routes.STORYLOADING, {
            images: images,
          }),
        );
      }
    }
  };
  const notificationListener = async () => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
        remoteMessage.data,
      );
      if (remoteMessage) {
        openNotification(remoteMessage);
      }
    });
    messaging().onMessage(async remoteMessage => {
      console.log('received foreground message:', remoteMessage);
    });
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('Message handled in the background!', remoteMessage);
    // });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          openNotification(remoteMessage);
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  };

  return (
    <>
      <View style={[Styles.flexCenter, Styles.primaryBackground]}>
        <ActivityIndicator color={colors.themeIcon} size={50} />
      </View>
    </>
  );
};
export default LoadingScreen;
