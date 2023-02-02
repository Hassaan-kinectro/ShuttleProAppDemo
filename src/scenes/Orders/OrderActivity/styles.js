import {StyleSheet} from 'react-native';
import {deviceHeight, IS_IOS, deviceWidth} from '../../../utils/orientation';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../../utils/constants';
const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    ActivityBox: {height: IS_IOS ? deviceHeight - 650 : deviceHeight - 580},
    container: {
      padding: 5,
      paddingTop: 20,
    },
    fieldWidth: {
      width: deviceWidth - 230,
    },
    leftWidth: {
      width: 140,
    },
    boxContainer: {
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
    rowItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
      marginLeft: 10,
    },
    flex: {
      display: 'flex',
      flexDirection: 'row',
    },
    image: {width: 30, height: 30, marginBottom: 3},
    image2: {
      width: 1,
      height: 30,
    },
    spaceBetween: {
      justifyContent: 'space-between',
      display: 'flex',
    },
    text: {
      fontWeight: '500',
      fontStyle: 'normal',
      fontSize: 12,
      fontFamily: FONT_FAMILY.REGULAR,
      marginBottom: 5,
    },
    mB5: {
      marginBottom: 5,
    },
    main: {
      margin: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.boxBorderColor,
    },
    fS15: {
      fontSize: 15,
    },
    opacity: {
      opacity: 1,
    },
  });
};

export default useStyles;
