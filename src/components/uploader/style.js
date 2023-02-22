import {StyleSheet} from 'react-native';
import {deviceWidth, IS_IOS, IS_PAD} from '../../utils/orientation';
import {scaleSize} from '../../styles/mixins';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../utils/constants';
import {Mixins} from '../../styles';
const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    boxBack: {
      // backgroundColor:''
      borderRadius: 15,
      minHeight: 90,
      flex: 1,
      marginVertical: 6,
      justifyContent: 'center',
      alignContent: 'center',
    },
    underLineBrowser: {
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
  });
};

export default useStyles;