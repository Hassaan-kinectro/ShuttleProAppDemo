import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const useStyles = () => {
  const theme = useSelector(state => state.themeChange.theme);

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
      borderColor: theme === 'DARK' ? '#fff' : '#000',
      marginRight: 5,
    },
    radioIconSelected: {
      backgroundColor: theme === 'DARK' ? '#fff' : '#000',
    },
    text: {
      color: theme === 'DARK' ? '#fff' : '#000',
    },
  });
};

export default useStyles;
