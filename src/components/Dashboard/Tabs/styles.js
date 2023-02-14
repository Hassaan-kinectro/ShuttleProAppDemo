import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {deviceWidth} from '../../../utils/orientation';
import {FONT_FAMILY} from '../../../utils/constants';

const useStyles = () => {
  const {colors} = useTheme();
  const space = deviceWidth / 36;
  return StyleSheet.create({
    tabStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: colors.tabColor,
      marginHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 10,
      borderRadius: 20,
    },
    tabItemStyle: {
      padding: 10,
      minWidth: deviceWidth / 6,
      alignItems: 'center',
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
