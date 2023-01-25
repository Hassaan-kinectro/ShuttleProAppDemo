import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {deviceWidth, IS_PAD} from '../utils/orientation';
import * as Colors from './colors';
import * as Mixins from './mixins';

const GlobalStyle = theme => {
  const {colors} = useTheme();
  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    justifyContentCenter: {
      justifyContent: 'center',
    },
    justifyContentSpaceBetween: {
      justifyContent: 'space-between',
    },

    CircleImageView: {
      width: '100%',
      height: 50, // backgroundColor: 'cyan',
      flexDirection: 'row',
    },
    CircleImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginLeft: 2,
    },
    mainWrapper: {
      paddingLeft: IS_PAD ? deviceWidth / 5 : 20,
      paddingRight: IS_PAD ? deviceWidth / 5 : 20,
      paddingVertical: 20,
    },
    alignItemsCenter: {
      alignItems: 'center',
    },
    alignSelfCenter: {
      alignSelf: 'center',
    },
    primaryBackground: {
      backgroundColor: colors.background,
    },
    flexCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flexCenterEnd: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
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
    flexCenterStart: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    flexContentEnd: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    loadingBackground: {
      backgroundColor: Colors.BLACK,
    },
    flexDirectionColumn: {
      flexDirection: 'column',
    },
    flexDirectionRow: {
      flexDirection: 'row',
    },
    pL10: {
      paddingLeft: 10,
    },
    pL5: {
      paddingLeft: 5,
    },
    pL15: {
      paddingLeft: 15,
    },
    pL20: {
      paddingLeft: 20,
    },
    pR10: {
      paddingRight: 10,
    },
    pR5: {
      paddingRight: 5,
    },
    pR15: {
      paddingRight: 15,
    },
    pT10: {
      paddingTop: 10,
    },
    pT5: {
      paddingTop: 5,
    },
    pR20: {
      paddingRight: 20,
    },
    fend: {
      alignSelf: 'flex-end',
    },
    h100: {height: '100%'},
    h50: {height: '50%'},
    w50: {width: '50%'},
    pV5: {paddingVertical: 5},
    pB10: {paddingBottom: 10},
    pB5: {paddingBottom: 5},

    mT10: {marginTop: 10},
    mT15: {marginTop: 15},
    mT5: {marginTop: 5},
    mB5: {marginBottom: 5},
    mB10: {marginBottom: 10},
    mB15: {marginBottom: 15},
    mB20: {marginBottom: 20},
    mV10: {marginVertical: 10},
    mV15: {marginVertical: 15},
    background_LIGHT_BLACK_2: {backgroundColor: Colors.LIGHT_BLACK_2},
    positionRelative: {position: 'relative'},
    rowFlexEnd: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    authButtonMargin: {},
    authButtonWrapper: {
      flex: 0.4,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop: 40,
    },
    textCenter: {
      textAlign: 'center',
    },
    authLogo: {
      width: 160,
      height: 150,
      borderRadius: 5,
      // backgroundColor: 'red',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginVertical: 5,
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
    dateInputField: {
      paddingLeft: 5,
      borderWidth: 1,
      color: colors.textColor,
      borderBottomColor: colors.borderColor,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingTop: 5,
      paddingBottom: 10,
    },
    floatButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.button,
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
    text12Primary_1: {
      fontSize: Mixins.scaleFont(12),
      color: colors.button,
    },
    Centered: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    w100: {
      width: '100%',
    },
    InputStyle: {
      backgroundColor: colors.feilds,
      height: 45,
      borderColor: colors.boxBorderColor,
      borderWidth: 1,
      elevation: 2.5,
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
      color: colors.textColor,
      opacity: 0.5,
      fontSize: 14,
    },
    dateText: {
      color: colors.textColor,
      opacity: 0.5,
      fontSize: 12,
    },
    datePickerStyle: {
      paddingLeft: 10,
      color: colors.textColor,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: colors.textAreaColor,
      borderWidth: 1,
      borderColor: colors.button,
      borderRadius: 5,
      height: 45,
    },
    WorkspaceLogoText: {
      //   backgroundColor: 'blue',
      width: 150,
      height: 20,
      marginBottom: 5,
      fontSize: 14,
      color: colors.button,
      textAlignVertical: 'center',
      textAlign: 'center',
    },
    dropDownStyle: {
      // backgroundColor: colors.textAreaColor,
      // borderWidth: 0,
      // borderBottomRightRadius: 0,
      // borderBottomLeftRadius: 0,
      // elevation:5,
      backgroundColor: colors.textAreaColor,
      borderWidth: 1,
      borderColor: colors.button,
      borderRadius: 0,
    },
    placeholderStyle: {
      color: colors.placeholder,
    },
    activeLabelStyle: {
      color: colors.textColor,
    },
    labelStyle: {
      // color: colors.textColor,
      paddingLeft: 5,
    },
    itemStyle: {
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: colors.background,
      paddingLeft: 10,
      borderRadius: 0,
    },
    dropDownContainerStyle: {
      backgroundColor: colors.feilds,
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
      backgroundColor: colors.activeItemStyle,
    },
    searchableStyle: {
      height: 40,
      marginBottom: 0,
      borderBottomWidth: 0,
    },
  });
};
export default GlobalStyle;
