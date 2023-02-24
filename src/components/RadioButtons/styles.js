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
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme === 'DARK' ? '#fff' : 'lightblue',
      marginRight: 5,
    },
    radioIconSelected: {
      backgroundColor: theme === 'DARK' ? '#fff' : 'lightblue',
    },
  });
};

export default useStyles;
