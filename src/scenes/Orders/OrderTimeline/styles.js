import {StyleSheet} from 'react-native';
import {deviceHeight, IS_IOS} from '../../../utils/orientation';
import {useTheme} from '@react-navigation/native';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    ActivityBox: {height: IS_IOS ? deviceHeight - 650 : deviceHeight - 580},
    container: {
      padding: 5,
      paddingTop: 20,
    },
    boxContainer: {
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
      backgroundColor: colors.boxColor,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 20,
      borderWidth: 1,
      marginBottom: 30,
      marginLeft: 20,
      marginRight: 20,
      borderColor: colors.boxBorderColor,
    },
    container1: {
      display: 'flex',
      flexDirection: 'row',
    },
    box: {
      margin: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.boxBorderColor,
    },
    fS15: {
      fontSize: 15,
    },
    width: {
      width: 1,
      height: 30,
    },
    updateicon: {
      opacity: 1,
    },
  });
};

export default useStyles;
