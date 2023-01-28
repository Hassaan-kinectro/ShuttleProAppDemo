import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {deviceWidth, IS_IOS} from '../../utils/orientation';
import {Colors, Mixins} from '../../styles';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    listItem: {
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
      width: deviceWidth - 30,
      backgroundColor: colors.boxColor,
      padding: 8,
      borderWidth: 0.5,
      borderRadius: 20,
      borderColor: colors.boxBorderColor,
      marginBottom: 5,
      marginTop: IS_IOS ? 5 : 5,
      marginHorizontal: 5,
    },
    TrackingId: {
      width: deviceWidth - 100,
    },
    halfWidth: {
      width: (deviceWidth - 40) / 2,
    },
    inlineText: {
      width: (deviceWidth - 130) / 2,
    },
    textAlignment: {
      textAlign: 'right',
      alignSelf: 'stretch',
      textAlignVertical: 'center',
    },
    copyIcon: {
      position: 'absolute',
      top: 0,
      right: 5,
      justifyContent: 'space-between',
      width: 40,
    },
    mT10: {marginTop: 10},
    fS10: {fontSize: 10},
    dot: {
      backgroundColor: Colors.CURIOUS_BLUE,
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 10,
    },
    hairline: {
      borderColor: colors.boxBorderColor,
      borderWidth: 0.5,
      width: '100%',
      paddingHorizontal: 15,
      marginTop: 11,
    },
    inline: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 52,
      flexDirection: 'row',
    },
    mT12: {
      marginTop: 12,
    },
    mT5: {
      marginTop: 5,
    },
    productContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    center: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pR5: {
      paddingRight: 5,
    },
    w25: {
      width: 25,
    },
    mT20: {
      marginTop: 20,
    },
    pB10: {
      paddingBottom: 10,
    },
    errorText: {
      color: colors.textColorLight,
      fontSize: Mixins.scaleFont(16),
      paddingBottom: 20,
    },
  });
};

export default useStyles;
