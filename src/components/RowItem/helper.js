import {Linking, Platform, Alert} from 'react-native';

export const openDialScreen = contact => {
  let phone = contact ? contact : null;
  let number = '';
  if (Platform.OS === 'android') {
    number = `tel:${phone}`;
  } else {
    number = `telprompt:${phone}`;
  }
  Linking.openURL(number)
    .then(supported => {
      if (!supported) {
        Linking.openURL(number);
      } else {
        return Linking.openURL(number);
      }
    })
    .catch(err => {
      Alert.alert('Phone number is not available');
      console.log(err);
    });
};
