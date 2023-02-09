import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../utils/constants';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    BoxStyle: {
      height: 'auto',
      borderRadius: 20,
      marginBottom: 10,
    },
    pB10: {
      paddingBottom: 10,
    },
    Wrapper: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    flex: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 400,
    },
    text: {color: colors.TextColor},
    container: {
      flex: 1,
    },
    header: {
      position: 'absolute',
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 999,
    },
    subHeader: {
      // height: headerHeight / 2,
      width: '100%',
      paddingHorizontal: 10,
    },
    fontFamily: FONT_FAMILY.REGULAR,
  });
};

export default useStyles;
