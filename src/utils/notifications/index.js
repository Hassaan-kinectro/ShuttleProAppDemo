/* eslint-disable no-shadow */
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from '../../config/authSettings';
import DeviceInfo from 'react-native-device-info';
import {
  AddDeviceInfo,
  UpdateDeviceInfo,
  GetDeviceInfoByDeviceId,
} from '../../services/DeviceInfo';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
  }
}

const getFcmToken = async () => {
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    if (!fcmToken) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    getUser().then(async res => {
      if (res) {
        const deviceObject =
          (await DeviceInfo.getUniqueId()) +
          '-' +
          (await DeviceInfo.getDeviceId());
        const body = {token: fcmToken, userId: res.id, device: deviceObject};
        GetDeviceInfoByDeviceId(deviceObject).then(querySnapshot => {
          if (
            querySnapshot &&
            querySnapshot.data &&
            querySnapshot.data.length === 0
          ) {
            AddDeviceInfo(body)
              .then(d => {
                console.log('User added!', d);
              })
              .catch(err => console.log(err));
          } else {
            querySnapshot &&
              querySnapshot.data &&
              querySnapshot.data.length > 0 &&
              querySnapshot.data.forEach(documentSnapshot => {
                if (documentSnapshot.token !== fcmToken) {
                  UpdateDeviceInfo(body, documentSnapshot._id)
                    .then(result => {
                      console.log('User Updated!', result);
                    })
                    .catch(err => console.log('Therr', err));
                }
              });
          }
        });
      }
    });
  } catch (error) {
    console.log(error, 'error');
  }
};
