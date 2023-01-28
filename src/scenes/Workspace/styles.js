import {StyleSheet} from 'react-native';
import {IS_PAD, deviceWidth, IS_IOS} from '../../utils/orientation';
import {useTheme} from '@react-navigation/native';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    wrapperStyle: {
      overflow: 'hidden',
      shadowRadius: 1,
      shadowOpacity: 50,
      borderBottomLeftRadius: 35,
      borderBottomRightRadius: 35,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderColor: colors.boxBorderColor,
      borderWidth: 0.5,
      shadowOffset: {width: 0, height: 15},
      elevation: 5,
    },
    container: {
      marginLeft: 21,
      marginTop: 70,
      marginBottom: 15,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      height: IS_IOS ? 50 : 40,
    },
    innerContainer: {
      shadowOffset: {width: 0, height: 0.2},
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    pR: {
      paddingRight: 15,
    },
    pB: {
      paddingBottom: 10,
    },
    h10: {
      height: 10,
    },
  });
};
export default useStyles;
