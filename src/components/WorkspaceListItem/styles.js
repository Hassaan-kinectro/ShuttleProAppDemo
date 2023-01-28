import {StyleSheet} from 'react-native';
import {deviceWidth, IS_IOS} from '../../utils/orientation';
import {scaleSize} from '../../styles/mixins';
import {useTheme} from '@react-navigation/native';

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
    },
    w40: {
      width: '40%',
    },
    w50: {
      width: '50%',
    },
    headerText: {
      textAlignVertical: 'center',
      paddingBottom: 5,
      paddingLeft: scaleSize(10),
      color: colors.TextHeader,
    },
    HeaderImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
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
      marginLeft: 5,
      display: 'flex',
      flexDirection: 'row',
    },
    shipper1: {
      height: 24,
      width: 24,
      borderRadius: 70,
      borderWidth: 1,
      borderColor: colors.boxBorderColor,
    },
    shipper2: {
      height: 24,
      width: 24,
      left: -8,
      zIndex: 999,
      borderRadius: 70,
      borderWidth: 1,
      borderColor: colors.boxBorderColor,
    },
    shipper3: {
      border: colors.boxBorderColor,
      height: 24,
      width: 24,
      left: -15,
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
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
  });
};

export default useStyles;
