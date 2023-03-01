import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Styles} from '../../styles';
import {IS_IOS} from '../../utils/orientation';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({});
};
export default useStyles;
