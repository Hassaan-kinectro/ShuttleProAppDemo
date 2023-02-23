import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {deviceWidth, IS_PAD} from '../utils/orientation';
import * as Colors from './colors';
import * as Mixins from './mixins';
import Styles from './style';
const GlobalStyle = theme => {
  const {colors} = useTheme();
  return StyleSheet.create({
    ...Styles,
    primaryBackground: {
      backgroundColor: colors.background,
    },
    ThemeIcon: {
      borderRadius: 90,
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      position: 'absolute',
      right: 5,
      top: 10,
    },
    textCenter: {
      textAlign: 'center',
      position: 'absolute',
      top: 10,
      left: 30,
    },
    DrawerLogo: {
      width: 150,
      height: 150,
      borderRadius: 100,
      backgroundColor: colors.gradient1,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginVertical: 5,
    },
    InputStyle: {
      backgroundColor: 'transparent',
      height: 45,
      borderColor: colors.feildBorder,
      borderBottomWidth: 1,
    },
    InputErrorStyle: {
      backgroundColor: colors.textAreaColor,
      height: 45,
      borderColor: Colors.DANGER,
    },
    picker: {
      width: '100%',
      paddingBottom: 5,
      marginTop: 10,
    },
    iconComponent: {
      position: 'absolute',
      top: 8,
      right: 5,
      paddingBottom: 10,
    },
    dateFont: {
      color: colors.TextColor,
      opacity: 0.5,
      fontSize: 14,
    },
    dateText: {
      color: colors.TextColor,
      opacity: 0.5,
      fontSize: 12,
    },
    datePickerStyle: {
      paddingLeft: 10,
      borderBottomColor: colors.feildBorder,
      color: colors.TextColor,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderRadius: 5,
      height: 45,
    },
    WorkspaceLogoText: {
      width: 150,
      height: 20,
      marginBottom: 5,
      fontSize: 14,
      color: colors.button,
      textAlignVertical: 'center',
      textAlign: 'center',
    },
    dropDownStyle: {
      backgroundColor: colors.textAreaColor,
      borderWidth: 1,
      borderColor: colors.button,
      borderRadius: 0,
    },
    placeholderStyle: {
      color: colors.TextColor,
    },
    activeLabelStyle: {
      color: colors.TextColor,
    },
    labelStyle: {
      paddingLeft: 5,
      color: colors.TextColor,
    },
    itemStyle: {
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      backgroundColor: colors.boxColor,
      borderBottomColor: colors.boxBorderColor,
      paddingLeft: 10,
      borderRadius: 0,
    },
    dropDownContainerStyle: {
      backgroundColor: 'transparent',
      borderRadius: 20,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      zIndex: 5000,
    },
    dropDownListContainerStyle: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.boxBorderColor,
      borderRadius: 20,
      zIndex: 5000,
    },
    containerStyle: {
      height: 45,
      marginBottom: 20,
    },
    activeItemStyle: {
      backgroundColor: colors.background,
    },
    searchableStyle: {
      height: 40,
      marginBottom: 0,
      borderBottomWidth: 0,
    },
  });
};
export default GlobalStyle;
