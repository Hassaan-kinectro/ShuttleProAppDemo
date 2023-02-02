import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../utils/constants';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    BoxStyle: {
      height: 'auto',
      borderWidth: 1,
      borderRadius: 20,
      borderColor: colors.boxBorderColor,
      marginBottom: 10,
      backgroundColor: colors.boxColor,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
      marginHorizontal: 20,
    },
    pB10: {
      paddingBottom: 10,
    },
    Wrapper: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    flex: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 400,
    },
    text: {color: colors.TextColor},
    fontFamily: FONT_FAMILY.REGULAR,
  });
};

export default useStyles;
