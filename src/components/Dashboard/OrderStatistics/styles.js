import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {deviceWidth} from '../../../utils/orientation';

const useStyles = () => {
  const {colors} = useTheme();
  const space = deviceWidth / 30;
  const cardHeight = 260;
  return StyleSheet.create({
    carHeight: {
      height: cardHeight,
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
      width: (deviceWidth - space) / 2.05,
      alignItems: 'center',
      paddingVertical: cardHeight / 15,
    },
    inactiveDotStyle: {
      backgroundColor: colors.TextColor,
    },
    dotStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 8,
      backgroundColor: colors.secondary,
    },
  });
};
export const getCardStyle = (colors, color) => {
  return {
    backgroundColor: colors[color],
  };
};
export default useStyles;
