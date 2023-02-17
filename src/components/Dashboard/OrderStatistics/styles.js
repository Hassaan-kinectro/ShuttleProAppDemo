import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {deviceWidth} from '../../../utils/orientation';

const useStyles = () => {
  const {colors} = useTheme();
  const space = deviceWidth / 30;
  const cardHeight = 180;
  return StyleSheet.create({
    carHeight: {
      height: cardHeight,
      marginBottom: 40,
    },
    cardStyle: {
      borderRadius: 15,
      height: '100%',
    },
    cardHeader: {
      paddingVertical: cardHeight / 16,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderHalfOpacity,
    },
    loaderStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardItem: {
      width: (deviceWidth - space - 80) / 2.05,
      alignItems: 'center',
      paddingVertical: cardHeight / 10,
    },
    paginationStyle: {
      position: 'absolute',
      bottom: -30,
      padding: 0,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
    },
    inactiveDotStyle: {
      backgroundColor: colors.TextColor,
    },
    dotStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: -2,
      backgroundColor: colors.fontPrimary,
    },
  });
};
export const getCardStyle = (colors, color) => {
  return {
    backgroundColor: colors[color],
  };
};
export default useStyles;
