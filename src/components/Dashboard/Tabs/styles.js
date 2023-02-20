import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {deviceWidth} from '../../../utils/orientation';
import {FONT_FAMILY} from '../../../utils/constants';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    tabStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    tabInnerStyle: {
      backgroundColor: colors.tabColor,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 30,
    },
    tabItemStyle: {
      height: 28,
      minWidth: deviceWidth / 6,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    activeTab: {
      backgroundColor: colors.fontPrimary,
    },
    activeText: {
      color: colors.white,
      fontFamily: FONT_FAMILY.BOLD,
    },
    tabText: {
      color: colors.TextColor,
      fontFamily: FONT_FAMILY.SEMI_BOLD,
    },
  });
};
export default useStyles;
