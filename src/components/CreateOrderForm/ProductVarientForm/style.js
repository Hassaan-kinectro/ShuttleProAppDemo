import {StyleSheet} from 'react-native';
import {deviceWidth, IS_IOS, IS_PAD} from '../../../utils/orientation';
import {scaleSize} from '../../../styles/mixins';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../../utils/constants';
import {GlobalStyle, Mixins} from '../../../styles';
const useStyles = () => {
  const Styles = GlobalStyle();

  const {colors} = useTheme();
  return StyleSheet.create({
    BoxStyle: {
      height: 'auto',
      width: IS_IOS ? deviceWidth - 40 : deviceWidth - 40,
      borderWidth: 0.5,
      borderRadius: 20,
      borderColor: colors.boxBorderColor,
      marginBottom: 15,
      backgroundColor: colors.boxColor,
      marginHorizontal: 20,
      //   paddingVertical: 10,
      shadowOffset: {width: 0, height: 0.2},
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      paddingHorizontal: scaleSize(15),
      paddingVertical: scaleSize(15),
    },
    justifyContentSpaceBetween: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
};

export default useStyles;
