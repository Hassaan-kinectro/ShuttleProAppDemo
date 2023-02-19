import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {FONT_FAMILY} from '../../utils/constants';
import {deviceWidth} from '../../utils/orientation';

const useStyles = () => {
  const {colors} = useTheme();
  const box = deviceWidth / 3.5;
  return StyleSheet.create({
    halfWidth: {
      width: deviceWidth - 20,
    },
    textBoxContainer: {
      width: box * 1.6,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    productImage: {
      width: box,
      height: box,
      borderColor: 'transparent',
      borderWidth: 1,
      borderRadius: 10,
    },
    separator: {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.textColor,
      paddingBottom: 8,
      marginBottom: 8,
    },
    container: {
      paddingTop: 10,
      paddingBottom: 20,
    },
    hairline: {
      borderColor: colors.boxBorderColor,
      borderWidth: 1,
      width: '100%',
      paddingHorizontal: 15,
      marginTop: 11,
    },
    inline: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
    },
    RowWidth: {
      width: 100,
    },
    textStyle: {
      fontSize: 12,
      marginBottom: 10,
      fontFamily: FONT_FAMILY.SEMI_BOLD,
    },
    FontStyle: {
      fontSize: 12,
      fontFamily: FONT_FAMILY.REGULAR,
    },
  });
};

export default useStyles;
