import {StyleSheet} from 'react-native';
import {deviceWidth, IS_IOS} from '../../utils/orientation';
import {scaleSize} from '../../styles/mixins';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../utils/constants';
const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    BoxStyle: {
      height: 'auto',
      width: IS_IOS ? deviceWidth - 40 : deviceWidth - 40,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: colors.boxBorderColor,
      marginBottom: 10,
      backgroundColor: colors.boxColor,
      marginHorizontal: 20,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 5,
    },
    w40: {
      width: '40%',
    },
    w50: {
      width: '50%',
    },
    container: {
      flex: 1,
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    container2: {
      flex: 1,
      paddingHorizontal: 20,
<<<<<<< HEAD
=======
      marginTop: 5,
>>>>>>> origin/dashboard
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    L8: {
      left: 10,
    },
    container3: {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: 13,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    font: {
      fontFamily: FONT_FAMILY.SEMI_BOLD,
      fontWeight: '500',
      fontSize: 14,
    },
    headerText: {
      paddingLeft: scaleSize(10),
      color: colors.TextHeader,
      fontFamily: FONT_FAMILY.SEMI_BOLD,
      fontWeight: '500',
      fontSize: 14,
    },
    HeaderImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderColor: colors.boxBorderColor,
      borderWidth: 2,
    },
    hairline: {
      borderColor: colors.boxBorderColor,
      borderWidth: 0.5,
      width: '90%',
      paddingHorizontal: 15,
      marginTop: 15,
    },
    padding: {
      paddingHorizontal: scaleSize(15),
      paddingVertical: scaleSize(15),
    },
    Dashboard: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: scaleSize(15),
      marginBottom: 11,
    },
    pL50: {paddingLeft: 50},
    members: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: scaleSize(15),
    },
    memberStyles: {
      marginLeft: 5,
      display: 'flex',
      flexDirection: 'row',
      right: 5,
    },
    member1: {
      height: 24,
      width: 24,
      borderRadius: 70,
      borderWidth: 1,
      borderColor: colors.boxBorderColor,
    },
    member2: {
      height: 24,
      width: 24,
      left: -8,
      zIndex: 999,
      borderRadius: 70,
      borderWidth: 1,
      borderColor: colors.boxBorderColor,
    },
    member3: {
      height: 24,
      width: 24,
      left: -15,
      zIndex: 999,
      borderRadius: 70,
      borderWidth: 1,
      borderColor: colors.boxBorderColor,
    },
    shipperStyle: {
      display: 'flex',
      flexDirection: 'row',
    },
    shipper1: {
      height: 24,
      width: 24,
      right: -15,
      borderRadius: 70,
      borderWidth: 1,
      borderColor: colors.boxBorderColor,
    },
    shipper2: {
      height: 24,
      width: 24,
      right: -8,
      zIndex: 999,
      borderRadius: 70,
      borderWidth: 1,
      borderColor: colors.boxBorderColor,
    },
    shipper3: {
      border: colors.boxBorderColor,
      height: 24,
      width: 24,
      zIndex: 999,
      borderRadius: 70,
      borderWidth: 1,
      borderColor: colors.boxBorderColor,
    },
    socialSection: {
      backgroundColor: 'transparent',
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      marginTop: 15,
    },
    socialProductText: {
      flexDirection: 'row',
      textTransform: 'capitalize',
    },
    pR25: {
      paddingRight: 5,
    },
    w25: {
      width: 25,
    },
    socialView: {
      marginBottom: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    border: {
      color: colors.boxBorderColor,
    },
    flex: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default useStyles;
