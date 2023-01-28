import {Linking, Platform, Alert} from 'react-native';

export const openDialScreen = contact => {
  let phone = contact ? contact : null;
  let number = '';
  if (Platform.OS === 'android') {
    number = `tel:${phone}`;
  } else {
    number = `telprompt:${phone}`;
  }
  Linking.canOpenURL(number)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(number);
      }
    })
    .catch(err => console.log(err));
};
