import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Styles} from '../../styles';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    listContainer: {
      paddingTop: 10,
      paddingHorizontal: 5,
      paddingBottom: 120,
    },
    customInputStyle: {
      height: 45,
      paddingVertical: 0,
      borderRadius: 15,
      paddingLeft: 15,
      borderColor: colors.borderColor,
      backgroundColor: colors.gradient1,
    },
    createProductButton: {
      backgroundColor: colors.button,
      width: 40,
      height: 40,
      borderRadius: 5,
    },
    searchProductButton: {
      backgroundColor: colors.button,
      width: 35,
      height: 35,
      borderRadius: 5,
      marginLeft: 2,
    },
    height: {height: 580},
    image: {
      width: '100%',
      height: '100%',
    },
    filterContainer: {
      alignItems: 'flex-end',
      paddingHorizontal: 15,
      paddingTop: 10,
    },
    filterStyle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.searchIconBackground,
      ...Styles.justifyContentCenter,
      ...Styles.alignItemsCenter,
    },
    filterIcon: {},
  });
};
export default useStyles;
