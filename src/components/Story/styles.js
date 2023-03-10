import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../utils/constants';
import {deviceHeight, deviceWidth, IS_IOS} from '../../utils/orientation';

const useStyles = () => {
  const {colors} = useTheme();
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
    flex1: {
      flex: 1,
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
      width: 65,
      height: 65,
      borderRadius: 100,
      borderColor: colors.boxBorderColor,
      borderWidth: 2,
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
      right: -55,
      top: -15,
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
