import {StyleSheet} from 'react-native';
import {IS_PAD, deviceWidth} from '../../../utils/orientation';
import {useTheme} from '@react-navigation/native';
import {scaleSize} from '../../../styles/mixins';
const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    mainWrapper: {
      paddingLeft: IS_PAD ? deviceWidth / 5 : 30,
      paddingRight: IS_PAD ? deviceWidth / 5 : 30,
      paddingVertical: 20,
    },
    logoWrapper: {
      flex: 0.8,
      paddingBottom: 20,
      paddingTop: 20,
    },
    TouchableOpacity: {
      height: 48,
      // width: 293,
      // backgroundColor: colors.button,
      backgroundColor: '#139a5c',
      width: deviceWidth - (IS_PAD ? (deviceWidth / 5) * 2 : 60),
      borderRadius: 7,
    },
    FBLogin: {
      height: 50,
      marginTop: 10,
      backgroundColor: '#3b5998',
      width: deviceWidth - (IS_PAD ? (deviceWidth / 5) * 2 : 60),
      borderRadius: 5,
      flexDirection: 'row-reverse',
    },
    HideIconView: {
      position: 'absolute',
      right: 10,
      height: 13,
      width: 18,
      borderRadius: 30,
      bottom: 30,
      top: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      width: '100%',
      paddingHorizontal: scaleSize(20),
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    linearGradient: {
      width: '100%',
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  });
};

export default useStyles;
