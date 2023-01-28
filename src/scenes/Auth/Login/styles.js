import {StyleSheet} from 'react-native';
import {deviceWidth, deviceHeight, IS_IOS} from '../../../utils/orientation';
import {scaleSize} from '../../../styles/mixins';
import {GlobalStyle} from '../../../styles';
const useStyles = () => {
  const Styles = GlobalStyle();
  return StyleSheet.create({
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
    background: {
      flex: 1,
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    containerStyle: {
      ...Styles.flex,
      ...Styles.flexDirectionColumn,
      ...Styles.alignItemsCenter,
      ...Styles.justifyContentCenter,
      justifyContent: 'space-around',
    },
    imageContainer: {
      ...Styles.w100,
      ...Styles.justifyContentCenter,
      ...Styles.alignItemsCenter,
      paddingTop: !IS_IOS ? 60 : 100,
    },
    logoStyle: {
      width: deviceWidth / 2.6,
      height: deviceWidth / 2.1,
    },
    formContainer: {
      ...Styles.w100,
      ...Styles.alignItemsCenter,
      height: deviceHeight / 2,
    },
    container: {
      flex: 1,
      width: '100%',
      paddingHorizontal: scaleSize(20),
    },
    getStartedText: {
      lineHeight: 28,
      marginTop: 5,
    },
    topMargin: {
      marginTop: deviceWidth / 6,
    },
    bottomMargin: {
      marginBottom: 10,
    },
    buttonWrapper: {
      ...Styles.w100,
      height: 48,
    },
    buttonContainer: {
      ...Styles.w100,
      ...Styles.justifyContentCenter,
      ...Styles.alignItemsCenter,
    },
    linearGradient: {
      width: '100%',
      borderRadius: 5,
      ...Styles.justifyContentCenter,
      height: 48,
    },
    buttonText: {
      textAlign: 'center',
      lineHeight: 19,
    },
    errorStyle: {paddingTop: 20},
  });
};

export default useStyles;
