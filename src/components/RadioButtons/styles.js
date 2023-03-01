import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';

const useStyles = () => {
  const theme = useSelector(state => state.themeChange.theme);
  const {colors} = useTheme();
  return StyleSheet.create({
    radio: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 10,
    },
    radioIcon: {
      width: 15,
      height: 15,
      borderRadius: 15 / 2,
      borderWidth: 2,
      borderColor: colors.button,
      marginRight: 5,
    },
    radioIconSelected: {
      backgroundColor: colors.button,
    },
    text: {
      color: theme === 'DARK' ? '#fff' : '#000',
    },
  });
};

export default useStyles;
