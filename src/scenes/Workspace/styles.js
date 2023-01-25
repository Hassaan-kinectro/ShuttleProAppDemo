import {StyleSheet} from 'react-native';
import {IS_PAD, deviceWidth} from '../../utils/orientation';
import {Styles, Colors} from '../../styles';
import {useTheme} from '@react-navigation/native';

const UseStyles = () => {
  const {colors} = useTheme();

  return StyleSheet.create({
    BoxStyle: {
      elevation: 5,
      height: 180,
      width: deviceWidth - 20,
      // backgroundColor: colors.boxColor,
      // backgroundColor: 'transparent',
      padding: 5,
      borderWidth: 2,
      borderRadius: 10,
      // borderColor: colors.boxBorderColor,
      borderColor: '#23313E',
      marginBottom: 10,

      justifyContent: 'center',
      alignItems: 'center',
    },
    clear: {
      position: 'absolute',
      zIndex: 1000,
      right: 5,
      top: 0,
    },
    CircleView: {
      // backgroundColor: colors.gradient1,
      backgroundColor: 'transparent',
      borderWidth: 2,
      width: 60,
      height: 60,
      borderColor: colors.borderColor,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    WorkspaceImageButton: {
      width: '100%',
      height: '100%',
      borderRadius: 500,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    WorkspaceImage: {
      width: '100%',
      height: 100,
      marginTop: 5,
      // backgroundColor: Colors.PRIMARY,
      borderRadius: 5,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.borderColor,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
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
      height: 50,
      backgroundColor: colors.button,
      width: deviceWidth - (IS_PAD ? (deviceWidth / 5) * 2 : 60),
      borderRadius: 5,
    },
    UploadImageView: {
      width: '80%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      borderRadius: 420,
    },
  });
};
export default UseStyles;
