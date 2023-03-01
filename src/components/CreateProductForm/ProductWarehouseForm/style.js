import {StyleSheet} from 'react-native';
import {deviceWidth, IS_IOS, IS_PAD} from '../../../utils/orientation';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../../utils/constants';
import {GlobalStyle, Mixins} from '../../../styles';
import {scaleSize} from '../../../styles/mixins';
const useStyles = () => {
  const Styles = GlobalStyle();

  const {colors} = useTheme();
  return StyleSheet.create({
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
    errorStyle: {
      // backgroundColor: 'red',
      // marginHorizontal: 5,
      // padding: 0,
      // height: 80,
      // minHeight: 40,
      // paddingTop: 10,
      // marginTop: 10,
    },
    warehouseBox: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    placeholderStyle: {
      color: colors.placeholder,
      fontFamily: FONT_FAMILY.LIGHT,
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
    justifyContentSpaceBetween: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
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
  });
};

export default useStyles;
