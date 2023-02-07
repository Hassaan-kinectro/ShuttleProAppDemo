/* eslint-disable no-shadow */
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from '../../config/authSettings';
import DeviceInfo from 'react-native-device-info';
import {
  AddNotification,
  GetNotificationByDeviceId,
  UpdateNotification,
} from '../../services/Notifications';

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
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('This is the FcmToken:', fcmToken, 'This is the FcmToken:');
    if (!fcmToken) {
      // await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(
          'New Generated FcmToken:',
          fcmToken,
          'New Generated FcmToken:',
        );
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    getUser().then(async res => {
      console.log(res, 'this is');
      if (res) {
        console.log(res.id, 'response id');
        const deviceObject =
          (await DeviceInfo.getUniqueId()) +
          '-' +
          (await DeviceInfo.getDeviceId());
        console.log('query==>>', deviceObject, res, fcmToken);
        const body = {token: fcmToken, userId: res.id, device: deviceObject};
        GetNotificationByDeviceId(deviceObject).then(querySnapshot => {
          console.log('querySnapshot11234=>', querySnapshot);
          if (
            querySnapshot &&
            querySnapshot.data &&
            querySnapshot.data.length === 0
          ) {
            console.log(querySnapshot.data.length, 'aaaaaaaasssscccc');
            console.log('not Exist ');
            AddNotification(body)
              .then(d => {
                console.log('User added!', d);
              })
              .catch(err => console.log(err));
          } else {
            console.log(' Exist ', querySnapshot);
            querySnapshot &&
              querySnapshot.data &&
              querySnapshot.data.length > 0 &&
              querySnapshot.data.forEach(documentSnapshot => {
                console.log('kkkkkk', documentSnapshot.token !== fcmToken);
                if (documentSnapshot.token !== fcmToken) {
                  console.log(
                    documentSnapshot.token,
                    documentSnapshot._id,
                    'here!!',
                    fcmToken,
                  );
                  UpdateNotification(body, documentSnapshot._id)
                    .then(result => {
                      console.log('User Updated!', result);
                    })
                    .catch(err => console.log('Therr', err));
                }
              });
          }
        });
        console.log('tttttt', res.id);
      }
    });
    console.log('FCM Token created:', fcmToken);
  } catch (error) {
    console.log(error, 'error');
  }
};
