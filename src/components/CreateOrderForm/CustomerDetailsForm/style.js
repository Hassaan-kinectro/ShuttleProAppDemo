import {StyleSheet} from 'react-native';
import {deviceWidth, IS_IOS, IS_PAD} from '../../../utils/orientation';
import {scaleSize} from '../../../styles/mixins';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../../utils/constants';
import {GlobalStyle, Mixins} from '../../../styles';
const useStyles = () => {
  const Styles = GlobalStyle();

  const {colors} = useTheme();
  return StyleSheet.create({
    mB50: {
      marginBottom: 50,
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
    justifyContentSpaceBetween: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dropDownSTyle: {
      height: 40,
      marginBottom: 10,
    },
    dropDownContainerStyle: {
      backgroundColor: 'transparent',
      borderRadius: 20,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      marginTop: 5,
      zIndex: 5000,
    },
    itemStyle: {
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      backgroundColor: colors.boxColor,
      borderBottomColor: colors.boxBorderColor,
      paddingLeft: 10,
      borderRadius: 0,
      zIndex: 5000,
    },
    labelStyle: {paddingLeft: 5, color: colors.TextColor},
    activeLabelStyle: {color: colors.TextColor},
    placeholderStyle: {
      color: colors.placeholder,
      fontFamily: FONT_FAMILY.LIGHT,
    },
    searchableStyle: {
      height: 40,
      marginBottom: 0,
      marginLeft: -10,
      marginTop: 10,
      backgroundColor: colors.boxColor,
      borderBottomWidth: 0,
    },
    errorStyle: {
      // backgroundColor: 'red',
      // marginHorizontal: 5,
      // padding: 0,
      // minHeight: 15,
      // minHeight: 40,
      paddingTop: 10,
      // marginTop: 10,
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
    addressTFStyle: {
      height: 40,
      // margin: 0,
      marginBottom: 20,
      flex: 1,
      justifyContent: 'space-around',
      // paddingVertical: 5,
      // paddingBottom: 0,
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
    addressLabelSty: {
      fontSize: Mixins.scaleFont(14),
      fontFamily: FONT_FAMILY.LIGHT,
      marginTop: 10,
      color: colors.TextColor,
      marginBottom: 1,
    },
  });
};

export default useStyles;
