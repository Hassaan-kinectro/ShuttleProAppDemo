import {StyleSheet} from 'react-native';
import {deviceWidth, IS_IOS, IS_PAD} from '../../utils/orientation';
import {scaleSize} from '../../styles/mixins';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../utils/constants';
import {GlobalStyle, Mixins} from '../../styles';
const useStyles = () => {
  const Styles = GlobalStyle();

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
    BoxStyleWareHouse: {
      height: 'auto',
      width: '100%',
      // width: IS_IOS ? deviceWidth - 40 : deviceWidth - 40,
      borderWidth: 0.5,
      borderRadius: 20,
      borderColor: colors.boxBorderColor,
      marginBottom: 15,
      backgroundColor: colors.boxColor,
      // marginHorizontal: 20,
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
      borderColor: colors.feildBorder,
      borderRightWidth: 0,
      borderTopWidth: 0,
      // borderRadius: 20,
      zIndex: 5000,
    },
    InputTFStyle50: {
      minHeight: 40,
      // marginVertical: 0,
      marginHorizontal: 0,
      // paddingBottom: 10,
      // flex: 1,
      justifyContent: 'flex-start',
      padding: 0,
      fontFamily: FONT_FAMILY.LIGHT,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      width: '100%',
      borderColor: colors.feildBorder,
      borderRightWidth: 0,
      borderTopWidth: 0,
      // borderRadius: 20,
      zIndex: 5000,
    },
    descriptionTFStyle: {
      height: 55,
      margin: 0,
      flex: 1,
      justifyContent: 'space-around',
      paddingTop: 5,
      paddingBottom: 0,
      paddingHorizontal: 0,
      fontFamily: FONT_FAMILY.LIGHT,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderColor: colors.feildBorder,
      borderRightWidth: 1,
      borderTopWidth: 1,
      borderRadius: 5,
      zIndex: 5000,
    },
    descLabelSty: {
      fontSize: Mixins.scaleFont(14),
      fontFamily: FONT_FAMILY.LIGHT,
      marginTop: 10,
      color: colors.TextColor,
      marginBottom: 0,
    },
    dropDownSTyle: {
      height: 40,
      marginVertical: 5,
    },
    placeholderStyle: {
      color: colors.placeholder,
      fontFamily: FONT_FAMILY.LIGHT,
    },
    errorStyle: {
      // backgroundColor: 'red',
      // marginHorizontal: 5,
      // padding: 0,
      // height: 80,
      // minHeight: 40,
      // paddingTop: 10,
      // marginTop: 10,
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
      height: 27,
      width: 27,
      marginLeft: 5,
      borderRadius: 30,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      order: 1,
      flexGrow: 0,
    },
    linearGradient: {
      width: '100%',
      borderRadius: 7,
      ...Styles.justifyContentCenter,
      height: 48,
    },
    buttonText: {
      textAlign: 'center',
      lineHeight: 19,
    },
    LoginBoxStyle: {
      height: 'auto',
      width: IS_IOS ? deviceWidth - 40 : deviceWidth - 40,
      borderWidth: 0,
      // borderRadius: 20,
      // borderColor: colors.boxBorderColor,
      marginBottom: 15,
      backgroundColor: colors.boxColor,
      marginHorizontal: 20,
      //   paddingVertical: 10,
      // shadowOffset: {width: 0, height: 0.2},
      // shadowOpacity: 0.1,
      // shadowRadius: 5,
      // elevation: 3,
      // paddingHorizontal: scaleSize(15),
      // paddingVertical: scaleSize(15),
    },
    fieldStyle50: {
      flex: 1,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'baseline',
      width: '50%',
      paddingBottom: 0,
      minHeight: 80,
      paddingVertical: 10,
    },
    warehouseBox: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
  });
};

export default useStyles;
