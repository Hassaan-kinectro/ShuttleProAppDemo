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
                    documentSnapshot,
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
    console.log(error);
  }
  // let fcmToken = await AsyncStorage.getItem('fcmToken');
  // console.log('This is the FcmToken:', fcmToken, 'This is the FcmToken:');
  // if (!fcmToken) {
  //   try {
  //     const fcmToken = await messaging().getToken();
  //     if (fcmToken) {
  //       console.log(
  //         'New Generated FcmToken:',
  //         fcmToken,
  //         'New Generated FcmToken:',
  //       );
  //       await AsyncStorage.setItem('fcmToken', fcmToken);
  //     }
  //     getUser().then(async res => {
  //       console.log('this is responsee1111', res);
  //       if (res) {
  //         console.log('this is responsee', res);
  //         const deviceObject =
  //           (await DeviceInfo.getUniqueId()) +
  //           '-' +
  //           (await DeviceInfo.getDeviceId());
  //         console.log('query==>>', deviceObject, res, fcmToken);
  //         const body = {
  //           token: fcmToken,
  //           userId: res.id,
  //           device: deviceObject,
  //         };
  //         GetNotificationByDeviceId(deviceObject).then(querySnapshot => {
  //           console.log('querySnapshot=>', querySnapshot);
  //           if (
  //             querySnapshot &&
  //             querySnapshot.data &&
  //             querySnapshot.data.length === 0
  //           ) {
  //             console.log('not Exist ');
  //             AddNotification(body)
  //               .then(d => {
  //                 console.log('User added!', d);
  //               })
  //               .catch(err => console.log(err));
  //           } else {
  //             console.log(' Exist ', querySnapshot);
  //             querySnapshot &&
  //               querySnapshot.data &&
  //               querySnapshot.data.length > 0 &&
  //               querySnapshot.data.forEach(documentSnapshot => {
  //                 console.log('kkkkkk', documentSnapshot.token !== fcmToken);
  //                 if (documentSnapshot.token !== fcmToken) {
  //                   console.log(
  //                     documentSnapshot,
  //                     documentSnapshot._id,
  //                     'here!!',
  //                     fcmToken,
  //                   );
  //                   UpdateNotification(body, documentSnapshot._id)
  //                     .then(result => {
  //                       console.log('User Updated!', result);
  //                     })
  //                     .catch(err => console.log('Therr', err));
  //                 }
  //               });
  //           }
  //         });
  //         console.log('tttttt', res.id);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error, 'error in the catch');
  //   }
  // }
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
