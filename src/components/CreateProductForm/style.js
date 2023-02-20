import {StyleSheet} from 'react-native';
import {deviceWidth, IS_IOS, IS_PAD} from '../../utils/orientation';
import {scaleSize} from '../../styles/mixins';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../utils/constants';
import {Mixins} from '../../styles';
const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    BoxStyle: {
      height: 'auto',
      width: IS_IOS ? deviceWidth - 40 : deviceWidth - 40,
      borderWidth: 0.5,
      borderRadius: 20,
      borderColor: colors.boxBorderColor,
      marginBottom: 15,
      backgroundColor: colors.boxColor,
      marginHorizontal: 20,
      //   paddingVertical: 10,
      shadowOffset: {width: 0, height: 0.2},
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      paddingHorizontal: scaleSize(15),
      paddingVertical: scaleSize(15),
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
      width: '55%',
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
    justifyContentSpaceBetween: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    InputTFStyle: {
      height: 40,
      margin: 0,
      // flex: 1,
      justifyContent: 'flex-start',
      padding: 0,
      fontFamily: FONT_FAMILY.LIGHT,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderRadius: 20,
      zIndex: 5000,
    },
    descriptionTFStyle: {
      height: 55,
      margin: 0,
      flex: 1,
      justifyContent: 'space-around',
      padding: 0,
      fontFamily: FONT_FAMILY.LIGHT,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
      borderRadius: 5,
      zIndex: 5000,
    },
    descLabelSty: {
      fontSize: Mixins.scaleFont(14),
      fontFamily: FONT_FAMILY.LIGHT,
      marginTop: 10,
      marginBottom: 0,
    },
    dropDownSTyle: {
      height: 40,
    },
    placeholderStyle: {
      color: colors.placeholder,
      fontFamily: FONT_FAMILY.LIGHT,
    },
    errorStyle: {
      // backgroundColor: 'red',
      marginHorizontal: 5,
      padding: 0,
    },
    mB90: {
      marginBottom: 90,
    },
    addProductVariantStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'center',
    },
    addProductVariant: {
      position: 'relative',
      height: 22,
      width: 22,
      marginLeft: 5,
      borderRadius: 30,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      order: 1,
      flexGrow: 0,
    },
  });
};

export default useStyles;
