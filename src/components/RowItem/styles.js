import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {deviceWidth} from '../../utils/orientation';
import {FONT_FAMILY} from '../../utils/constants';
const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container1: {
      flexDirection: 'row',
    },
    container2: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
      marginLeft: 0,
    },
    image: {
      width: 30,
      height: 30,
      marginBottom: 3,
    },
    text: {
      fontSize: 12,
      color: colors.TextColor,
      fontFamily: FONT_FAMILY.SEMI_BOLD,
    },
    boxContainer: {
      backgroundColor: colors.boxColor,
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderRadius: 20,
      borderWidth: 1,
      marginVertical: 5,
      marginLeft: 15,
      marginRight: 15,
      borderColor: colors.boxBorderColor,
    },
    fieldWidth: {
      width: deviceWidth - 120,
      justifyContent: 'center',
    },
    width: {
      width: 1,
      height: 30,
    },
    status: {
      color: colors.TextColor,
      fontStyle: 'normal',
      fontSize: 12,
      fontFamily: FONT_FAMILY.REGULAR,
      marginTop: 10,
    },
  });
};

export default useStyles;
