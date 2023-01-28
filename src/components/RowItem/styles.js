import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {deviceWidth} from '../../utils/orientation';
import {FONT_FAMILY} from '../../utils/constants';
const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container1: {
      display: 'flex',
      flexDirection: 'row',
    },
    container2: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
      marginLeft: 10,
    },
    image: {
      width: 30,
      height: 30,
      marginBottom: 3,
    },
    text: {
      fontWeight: '500',
      fontStyle: 'normal',
      fontSize: 12,
      color: colors.TextColor,
      fontFamily: FONT_FAMILY.REGULAR,
    },
    boxContainer: {
      backgroundColor: colors.boxColor,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 20,
      borderWidth: 1,
      marginBottom: 30,
      marginLeft: 20,
      marginRight: 20,
      borderColor: colors.boxBorderColor,
    },
    fieldWidth: {
      width: deviceWidth - 230,
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
