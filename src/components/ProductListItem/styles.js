import {StyleSheet} from 'react-native';
import {deviceWidth, IS_IOS, IS_PAD} from '../../utils/orientation';
import {scaleSize} from '../../styles/mixins';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../utils/constants';
const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    BoxStyle: {
      height: 'auto',
      width: IS_IOS ? deviceWidth - 40 : deviceWidth - 40,
      borderWidth: 0.5,
      borderRadius: 20,
      borderColor: colors.boxBorderColor,
      marginBottom: 20,
      backgroundColor: colors.boxColor,
      marginHorizontal: 20,
      paddingVertical: 10,
      shadowOffset: {width: 0, height: 0.2},
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    w40: {
      width: '40%',
    },
    w50: {
      width: '50%',
    },
    L8: {
      left: 5,
    },
    padding: {
      paddingHorizontal: scaleSize(15),
      paddingVertical: scaleSize(15),
    },
    pL50: {paddingLeft: 50},
    pR25: {
      paddingRight: 5,
    },
    w25: {
      width: 25,
    },
    pb10: {paddingBottom: 10},
    border: {
      color: colors.boxBorderColor,
    },
    flex: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      shadowOffset: {width: 0, height: 0.2},
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    container2: {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: 5,
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    transformText: {
      textTransform: 'capitalize',
    },
    font: {
      fontWeight: '500',
      textTransform: 'capitalize',
      fontSize: 12,
      color: colors.TextColor,
    },
    fontBold: {
      //   fontFamily: FONT_FAMILY.BOLD,
      fontWeight: '700',
      textTransform: 'capitalize',
      color: colors.TextColor,
      fontSize: 12,
    },
    productNameSty: {
      //   fontFamily: FONT_FAMILY,
      fontWeight: '700',
      textTransform: 'capitalize',
      color: colors.TextColor,
      fontSize: 12,
      width: '50%',
    },
    shopifyColor: {
      color: '#55932C',
    },
    woocommerceStyle: {
      height: 25,
      width: 25,
      resizeMode: 'contain',
    },
    iconSty: {
      justifyContent: 'flex-end',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    productImageSty: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      borderRadius: 10,
      //   marginRight: IS_PAD ? deviceWidth / 5 : 20,
    },
    NoproductImageSty: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      borderRadius: 10,
      boxShadow: '0px 2px 14px rgba(0, 0, 0, 0.15)',
      order: 0,
      flexGrow: 0,
      backgroundColor: colors.LightBackground,
      //   marginRight: IS_PAD ? deviceWidth / 5 : 20,
    },
    widthDash: {
      width: '5%',
    },
    subBoxFontHead: {
      fontSize: 10,
      fontWeight: '400',
      textTransform: 'capitalize',
      color: colors.TextColor,
    },
    subBoxFontPara: {
      fontSize: 12,
      textTransform: 'capitalize',
      color: colors.TextColor,
      fontWeight: '700',
    },
    widthBTW: {
      width: IS_IOS ? deviceWidth / 5 : deviceWidth / 4,
      marginVertical: 3,
    },
  });
};

export default useStyles;
