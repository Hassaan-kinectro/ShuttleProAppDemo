import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../utils/constants';
import {deviceHeight, deviceWidth, IS_IOS} from '../../utils/orientation';
import {GlobalStyle} from '../../styles';
import {scaleSize} from '../../styles/mixins';

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
    headerText: {
      paddingLeft: scaleSize(10),
      color: '#fff',
      fontFamily: FONT_FAMILY.SEMI_BOLD,
      fontWeight: '500',
      fontSize: 14,
    },
    headerText2: {
      paddingLeft: scaleSize(10),
      color: '#fff',
      fontFamily: FONT_FAMILY.SEMI_BOLD,
      fontWeight: '400',
      fontSize: 10,
    },
    container2: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    publishicon: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
      color: colors.white,
      borderColor: colors.boxBorderColor,
    },
    containerModal: {
      flex: 1,
      padding: 20,
      position: 'absolute',
      top: IS_IOS ? 80 : 40,
      left: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#5a5a5a',
    },
    container3: {
      flex: 3,
      borderRadius: 100,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: 'row',
    },
    text: {
      fontFamily: FONT_FAMILY.REGULAR,
      fontWeight: '500',
      fontSize: 12,
      color: colors.TextColor,
      marginTop: 5,
      width: 150,
      left: 40,
    },
    hairline: {
      borderColor: colors.boxBorderColor,
      borderWidth: 1,
      // marginHorizontal: 10,
      marginVertical: 10,
    },
    hairline2: {
      borderColor: colors.boxBorderColor,
      borderWidth: 0.5,
      marginHorizontal: 10,
      marginVertical: 0,
    },
    flex1: {
      flex: 1,
    },
    slide: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#464646',
    },
    image2: {
      width: '100%',
      height: '100%',
    },
    closeButton: {
      position: 'absolute',
      top: IS_IOS ? 80 : 50,
      right: 30,
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
    image: {
      position: 'relative',
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
    publishicon2: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 60,
      padding: 2,
      borderRadius: 100,
      marginHorizontal: 10,
      borderColor: colors.boxBorderColor,
      borderWidth: 2,
    },
    buttonWrapper: {
      // ...Styles.w50,
      height: 48,
      marginTop: 30,
      width: '40%',
      // marginRight: 10,
    },
    buttonWrapper2: {
      ...Styles.w100,
      height: 48,
      marginTop: 30,
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
    buttonText2: {
      textAlign: 'center',
      lineHeight: 19,
      paddingHorizontal: 20,
    },
    userImage: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 48,
      height: 48,
      borderRadius: 24,
      marginHorizontal: 5,
      borderColor: colors.boxBorderColor,
      borderWidth: 2,
    },
    containerimagesArr: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      width: '50%',
      aspectRatio: 1,
      marginVertical: 5,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    selectedImageContainer: {
      borderColor: colors.button,
      borderStyle: 'dotted',
      borderWidth: 3,
    },
    imageArr: {
      height: 80,
      width: 80,
      aspectRatio: 1,
      margin: 5,
      borderRadius: 10,
      position: 'relative',
    },
    addActivity: {
      backgroundColor: colors.button,
      width: 125,
      height: 40,
      borderRadius: 5,
      marginTop: 10,
    },
    modal: {
      margin: 0,
      marginTop: 0,
    },
    mB15: {marginBottom: 15},
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
    HeaderImage5: {
      width: 55,
      height: 55,
      borderRadius: 100,
      borderColor: 'transparent',
      // borderWidth: 2,
      // padding: 10,
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
    // imageContainer: {
    //   width: 60,
    //   height: 60,
    //   borderRadius: 30,
    //   overflow: 'hidden',
    //   marginVertical: 10,
    // },
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
    },
    CreateprofileIcon: {
      // marginLeft: 10,
      position: 'relative',
    },
    profileIcon2: {
      borderColor: 'transparent',
      borderRadius: 100,
    },
    HeaderImage: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderColor: colors.boxBorderColor,
      borderWidth: 2,
      marginHorizontal: 5,
      ...Styles.justifyContentCenter,
      ...Styles.alignItemsCenter,
    },
    active: {
      width: 15,
      height: 15,
      bottom: 0,
      right: -25,
    },
    active2: {
      width: 15,
      height: 15,
      bottom: 0,
      right: -35,
      top: -15,
    },
    active3: {
      width: 15,
      height: 15,
      bottom: 0,
      right: -35,
      top: -15,
    },
    container4: {
      flex: 1,
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
    progressBarContainer5: {
      height: 4,
      width: '100%',
      flexDirection: 'row',
      marginTop: 20,
    },
    progressBarSegment: {
      height: '100%',
    },
  });
};

export default useStyles;
