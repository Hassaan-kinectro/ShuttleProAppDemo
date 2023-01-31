/* eslint-disable no-shadow */
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('This is the FcmToken:', fcmToken, 'This is the FcmToken:');
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(
          'New Generated FcmToken:',
          fcmToken,
          'New Generated FcmToken:',
        );
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error, 'error in the catch');
    }
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().onMessage(async remoteMessage => {
    console.log('received foreground message:', remoteMessage);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};
