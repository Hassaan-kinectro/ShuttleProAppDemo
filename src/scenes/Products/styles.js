import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {IS_IOS} from '../../utils/orientation';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    listContainer: {
      paddingTop: 10,
    },
    flex: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mB50: {marginBottom: 70},
    addProductIcon: {
      position: 'absolute',
      height: 60,
      width: 60,
      right: 20,
      // bottom: 85,
      bottom: IS_IOS ? 100 : 95,
      borderRadius: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    addProductIconLibrary: {
      position: 'absolute',
      height: 42,
      width: 42,
      right: 30,
      bottom: IS_IOS ? 170 : 160,
      borderRadius: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    addProductIconLibraryTransfor: {
      transform: [{scaleX: -1}],
    },
    opacity: {
      opacity: 1,
    },
  });
};
export default useStyles;
