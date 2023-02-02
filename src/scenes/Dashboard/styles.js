import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    flex: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
export default useStyles;
