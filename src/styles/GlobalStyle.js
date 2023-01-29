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
    flex2: {
      flex: 2,
    },
    flex3: {
      flex: 3,
    },
    justifyContentStart: {
      justifyContent: 'flex-start',
    },
    alignItemsStart: {
      alignItems: 'flex-start',
    },
    pH20: {
      paddingHorizontal: 20,
    },
    pH30: {
      paddingHorizontal: 30,
    },
    justifyContentCenter: {
      justifyContent: 'center',
    },
    justifyContentSpaceBetween: {
      justifyContent: 'space-between',
    },

    CircleImageView: {
      width: '100%',
      height: 50,
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
    flex2Start: {
      flex: 2,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    flex3End: {
      flex: 3,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
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
    L8: {
      left: 8,
    },
    pL5: {
      paddingLeft: 5,
    },

    pL15: {
      paddingLeft: 15,
    },
    mL: {marginLeft: 20},
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
    mB30: {marginBottom: 30},
    mL10: {marginLeft: 10},
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
      color: colors.placeholder,
    },
    activeLabelStyle: {
      color: colors.TextColor,
    },
    labelStyle: {
      paddingLeft: 5,
    },
    itemStyle: {
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      backgroundColor: colors.background,
      borderBottomColor: colors.feildBorder,
      color: colors.TextColor,
      paddingLeft: 10,
      borderRadius: 0,
    },
    dropDownContainerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
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
