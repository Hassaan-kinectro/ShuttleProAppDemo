import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../utils/constants';
import {color} from 'react-native-reanimated';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 20,
      marginVertical: 10,
    },
    container2: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    container3: {
      flex: 3,
      borderRadius: 100,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    text: {
      fontFamily: FONT_FAMILY.REGULAR,
      fontWeight: '500',
      fontSize: 12,
      color: colors.TextColor,
      marginTop: 5,
      width: 150,
      left: 40,
    },
    hairline: {
      borderColor: colors.boxBorderColor,
      borderWidth: 0.5,
      marginHorizontal: 20,
      marginVertical: 10,
    },
    image: {
      width: 56,
      height: 56,
      borderRadius: 100,
      borderColor: colors.boxBorderColor,
      borderWidth: 2,
      padding: 2,
    },
    flex1: {
      flex: 1,
    },
  });
};

export default useStyles;
