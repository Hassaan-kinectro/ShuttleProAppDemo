import {StyleSheet} from 'react-native';
import {deviceHeight, IS_IOS} from '../../../utils/orientation';
import {useTheme} from '@react-navigation/native';
import {Styles} from '../../../styles';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      padding: 5,
    },
    boxContainer: {
      // shadowOffset: {width: 0, height: 2},
      // shadowOpacity: 0.2,
      // shadowRadius: 6,
      // elevation: 5,
      // backgroundColor: colors.boxColor,
      // paddingVertical: 15,
      // paddingHorizontal: 10,
      // borderRadius: 20,
      // borderWidth: 1,
      marginBottom: 100,
      marginLeft: 20,
      marginRight: 20,
      // borderColor: colors.boxBorderColor,
    },
    container1: {
      // display: 'flex',
      flexDirection: 'row',
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
    buttonContainerStyle: {
      alignItems: 'flex-end',
      paddingRight: 20,
    },
    buttonStyle: {
      backgroundColor: colors.button,
      width: 36,
      height: 36,
      borderRadius: 18,
      ...Styles.flexCenter,
    },
  });
};

export default useStyles;
