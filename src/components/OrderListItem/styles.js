import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {deviceWidth, IS_ANDROID, IS_IOS} from '../../utils/orientation';
import {Colors, Mixins} from '../../styles';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    BoxStyle: {
      height: 'auto',
      borderWidth: 1,
      borderRadius: 20,
      borderColor: colors.boxBorderColor,
      marginBottom: 10,
      backgroundColor: colors.boxColor,
      marginHorizontal: 10,
      shadowColor: colors.black,
      paddingTop: 15,
      paddingHorizontal: 15,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 5,
    },
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
    flex2Start: {
      flex: 2,
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    flexMinBox: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
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
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 22,
      flexDirection: 'row',
    },
    mT12: {
      marginTop: 12,
    },
    mT5: {
      marginTop: 5,
    },
    left10: {
      // left: IS_ANDROID ? 10 : 0,
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
      marginTop: 5,
    },
    pB10: {
      paddingBottom: 10,
    },
    errorText: {
      color: colors.textColorLight,
      fontSize: Mixins.scaleFont(12),
      paddingBottom: 10,
    },
    container: {
      flex: 1,
      // paddingLeft: 20,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: '#000',
    },
    pT15: {
      paddingTop: 15,
    },
    pT10: {
      paddingTop: 10,
    },
    pT5: {
      paddingTop: 5,
    },
  });
};

export default useStyles;
