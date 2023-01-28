import {StyleSheet} from 'react-native';
import {IS_IOS} from '../../utils/orientation';

const useStyles = () => {
  return StyleSheet.create({
    loader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: IS_IOS ? 400 : 200,
    },
  });
};

export default useStyles;
