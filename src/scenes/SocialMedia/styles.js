import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../utils/constants';
import {deviceHeight, deviceWidth, IS_IOS} from '../../utils/orientation';
import {GlobalStyle} from '../../styles';
const useStyles = () => {
  const {colors} = useTheme();
  const Styles = GlobalStyle();
  return StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: -10,
    },
    container2: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    container3: {
      flex: 3,
      borderRadius: 100,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: 'row',
    },
    BoxStyle: {
      height: 'auto',
      width: IS_IOS ? deviceWidth - 40 : deviceWidth - 40,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: colors.boxBorderColor,
      marginBottom: 10,
      backgroundColor: colors.boxColor,
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 40,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 5,
    },
    hairline: {
      borderColor: colors.boxBorderColor,
      borderWidth: 1,
      // marginHorizontal: 10,
      marginVertical: 2,
    },
    hairlineprofile: {
      borderColor: colors.boxBorderColor,
      borderWidth: 1,
      marginBottom: 2,
    },
    flex1: {
      flex: 1,
    },
    publishicon: {
      justifyContent: 'center',
      alignItems: 'center',

      paddingHorizontal: 40,
      color: colors.white,
      borderColor: colors.boxBorderColor,
    },
    slide: {
      flex: 1,
      position: 'relative',
      backgroundColor: colors.background,
    },
    image2: {
      width: '100%',
      height: '100%',
    },
    closeButton: {
      position: 'absolute',
      top: IS_IOS ? 80 : 50,
      right: 30,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 20,
    },
    closeButtonText: {
      fontWeight: 'bold',
      color: 'black',
    },
    progressBar: {
      alignSelf: 'stretch',
      backgroundColor: '#E0E0E0',
    },
    innerProgressBar: {
      backgroundColor: '#00BFFF',
      height: 4,
    },
    progressBarContainer: {
      position: 'absolute',
      height: 5,
      backgroundColor: '#ccc',
    },
    statusTabContainer: {
      position: 'absolute',
      zIndex: 999,
      marginTop: 100,
      flexDirection: 'row',
      width: '100%',
    },
    controller: {
      position: 'absolute',
      width: deviceWidth / 2,
      height: deviceHeight * 0.9,
      bottom: 0,
    },
    statusTab: {
      height: 3,
      backgroundColor: '#bbbbbb',
      flex: 1,
    },
    image10: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: 70,
      padding: 2,
      borderRadius: 100,
      marginHorizontal: 10,
      borderColor: colors.boxBorderColor,
      borderWidth: 2,
    },
    image1: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 35,
      height: 35,
      padding: 2,
      borderRadius: 100,
      marginHorizontal: 10,
      borderColor: colors.boxBorderColor,
      borderWidth: 2,
    },
    userImage: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 60,
      padding: 30,
      borderRadius: 100,
      marginHorizontal: 10,
    },
    userImage5: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 60,
      padding: 30,
      borderRadius: 100,
      marginHorizontal: 10,
      position: 'absolute',
      zIndex: 999,
    },
    createStory: {
      height: 60,
      width: 60,
      borderRadius: 50,
      left: 10,
      top: 5,
      marginRight: 20,
      borderColor: 'transparent',
      position: 'relative',
      // borderWidth: 1,
    },
    itemContainer: {
      alignItems: 'center',
      marginHorizontal: 10,
    },
    imageContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      overflow: 'hidden',
      marginVertical: 10,
    },
    image3: {
      width: '100%',
      height: '100%',
    },
    name: {
      fontSize: 16,
      marginTop: 5,
    },
    profileIcon: {
      borderRadius: 100,
      marginLeft: 10,
      marginRight: 10,
      position: 'relative',
    },
    profileIcon2: {
      borderColor: colors.searchIconBackground,
      borderRadius: 100,
      marginRight: 10,
      position: 'relative',
    },
    HeaderImage: {
      width: 55,
      height: 55,
      borderRadius: 100,
      // borderColor: 'transparent',
    },
    HeaderIcon: {
      width: 32,
      height: 32,
      borderRadius: 100,
      // borderColor: 'transparent',
    },
    active: {
      width: 15,
      height: 15,
      bottom: 0,
      right: -25,
    },
    image: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 35,
      height: 35,
      padding: 2,
      borderRadius: 100,
      marginHorizontal: 10,
      borderColor: colors.boxBorderColor,
      borderWidth: 2,
    },
    innerContainer: {
      shadowOffset: {width: 0, height: 0.2},
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    Wrapper: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    active2: {
      width: 15,
      height: 15,
      bottom: 0,
      right: -40,
      top: -15,
    },
    topHeader: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 5,
      marginBottom: 10,
    },
    bg: {backgroundColor: '#5285D4'},
    white: {color: '#fff', fontFamily: FONT_FAMILY.BOLD},
    bgLight: {backgroundColor: colors.LightBackground},
    innerHeader: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      borderColor: colors.fontPrimary,
      borderWidth: 2,
      paddingHorizontal: 8,
      height: 28,
      borderRadius: 14,
    },
    activeHeader: {
      width: 15,
      height: 15,
    },
    activePost: {
      width: 15,
      height: 15,
      bottom: 0,
      right: 10,
      top: 18,
    },
    active3: {
      width: 15,
      height: 15,
      bottom: 0,
      right: -45,
      top: -15,
    },
    container4: {
      flex: 1,
    },
    imageStyle: {
      height: 320,
      width: 320,
      borderRadius: 16,
    },
    flex10Start: {
      flex: 10,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    swiperContainer: {
      borderRadius: 5,
      backgroundColor: '#ccc',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    image5: {
      height: '100%',
      width: '100%',
    },
    postCard: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 20,
      borderRadius: 10,
      marginHorizontal: 5,
      marginVertical: 5,
      height: 'auto',
    },
    mh5: {
      marginHorizontal: 5,
    },
    text: {
      fontFamily: FONT_FAMILY.REGULAR,
      fontWeight: '500',
      color: colors.TextColor,
      marginTop: 5,
    },
    textHeader: {
      fontFamily: FONT_FAMILY.REGULAR,
      fontWeight: '500',
      fontSize: 12,
      color: colors.TextColor,
      marginTop: 5,
      width: '70%',
      left: 40,
    },
    imageContainerStyle: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      // marginTop: 10,
      height: 340,
      width: 340,
    },
    buttonWrapper: {
      // ...Styles.w50,
      height: 48,
      marginTop: 30,
      width: '40%',
      // marginRight: 10,
    },
    buttonWrapper2: {
      width: '90%',
      height: 48,
      marginTop: 30,
      marginBottom: 20,
      marginHorizontal: '5%',
    },
    buttonContainer: {
      ...Styles.w100,
      ...Styles.justifyContentCenter,
      ...Styles.alignItemsCenter,
      marginVertical: 20,
    },
    linearGradient: {
      width: '100%',
      borderRadius: 5,
      ...Styles.justifyContentCenter,
      height: 48,
      flex: 1,
    },
    buttonText: {
      textAlign: 'center',
      lineHeight: 19,
    },
    dropIcon: {position: 'absolute', top: 20, right: 15, width: 20},
  });
};

export default useStyles;
