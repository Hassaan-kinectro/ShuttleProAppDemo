import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {FONT_FAMILY} from '../../utils/constants';
import {deviceWidth} from '../../utils/orientation';
import {scaleSize} from '../../styles/mixins';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    halfWidth: {
      width: deviceWidth - 20,
    },
    productImage: {
      width: 115,
      height: 115,
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
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: scaleSize(15),
      marginRight: 52,
      flexDirection: 'row',
    },
    RowWidth: {
      width: 100,
    },
    textStyle: {
      width: 100,
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: '600',
      marginVertical: 11,
      fontFamily: FONT_FAMILY.REGULAR,
    },
    FontStyle: {
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: '400',
      fontFamily: FONT_FAMILY.REGULAR,
    },
  });
};

export default useStyles;
