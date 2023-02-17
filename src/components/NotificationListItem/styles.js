import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {scaleSize} from '../../styles/mixins';
import {deviceWidth} from '../../utils/orientation';

const useStyles = () => {
  const {colors} = useTheme();
  const boxWidth = (deviceWidth - 20) / 6;
  return StyleSheet.create({
    container: {
      height: 'auto',
      borderWidth: 1,
      borderRadius: 20,
      borderColor: colors.boxBorderColor,
      marginBottom: 10,
      backgroundColor: colors.boxColor,
      marginHorizontal: 10,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    box: {
      width: boxWidth / 1.4,
      height: boxWidth / 1.4,
      borderRadius: boxWidth / 2,
      backgroundColor: colors.fontPrimary,
      color: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftContainer: {
      width: boxWidth,
      padding: boxWidth / 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    centerContainer: {
      width: boxWidth * 4,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    clearIconBox: {
      width: boxWidth / 2,
      height: boxWidth / 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightContainer: {
      width: boxWidth,
      alignItems: 'flex-end',
      padding: boxWidth / 8,
    },
    icon: {
      color: colors.fontPrimary,
    },
  });
};

export default useStyles;
