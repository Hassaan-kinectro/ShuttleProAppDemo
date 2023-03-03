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
    justifyContentStart: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
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
    opacity: {
      opacity: 1,
    },
    itemStyle: {
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      backgroundColor: colors.boxColor,
      borderBottomColor: colors.boxBorderColor,
      // paddingLeft: 10,
      borderRadius: 0,
      flex: 1,
      width: '100%',
      zIndex: 5000,
    },
    labelStyle: {paddingLeft: 5, color: colors.TextColor},
    dropDownContainerStyle: {
      backgroundColor: 'transparent',
      borderRadius: 20,
      borderWidth: 0,
      // alignItems: 'flex-end',
      marginBottom: 10,
      flex: 1,
      width: '100%',
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      // marginTop: 5,
      zIndex: 5000,
    },
    dropDownSTyle: {
      height: 40,
      flex: 1,
      width: '100%',
      // marginBottom: 10,
    },
    searchableStyle: {
      // height: 40,
      marginBottom: 0,
      // marginLeft: -10,
      // marginTop: 10,
      backgroundColor: colors.boxColor,
      borderBottomWidth: 0,
    },
    activeLabelStyle: {color: colors.TextColor},
    placeholderStyle: {
      color: colors.placeholder,
      fontFamily: FONT_FAMILY.LIGHT,
    },
    InputTFStyle: {
      height: 40,
      margin: 0,
      // flex: 1,
      justifyContent: 'flex-start',
      padding: 0,
      paddingRight: 0,
      fontFamily: FONT_FAMILY.LIGHT,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderColor: colors.feildBorder,
      borderRightWidth: 0,
      borderTopWidth: 0,
      // borderRadius: 20,
      zIndex: 5000,
    },
  });
};

export default useStyles;
