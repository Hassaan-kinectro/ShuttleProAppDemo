import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../utils/constants';
import {color} from 'react-native-reanimated';
import {deviceHeight, deviceWidth} from '../../utils/orientation';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 20,
      marginVertical: 10,
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
      borderWidth: 0.5,
      marginHorizontal: 20,
      marginVertical: 10,
    },
    flex1: {
      flex: 1,
    },
    slide: {
      flex: 1,
      position: 'relative',
    },
    image2: {
      width: '100%',
      height: '100%',
    },
    closeButton: {
      position: 'absolute',
      top: 50,
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
      // backgroundColor: '#fff',
      backgroundColor: '#bbbbbb',
      flex: 1,
    },
    image: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      padding: 5,
      borderRadius: 100,
      marginHorizontal: 10,
      borderColor: colors.boxBorderColor,
      borderWidth: 2,
    },
  });
};

export default useStyles;
