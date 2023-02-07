import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {deviceWidth} from '../../utils/orientation';
import {Colors} from '../../styles';

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
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 6,
      paddingVertical: 8,
      elevation: 5,
    },
    container: {
      flex: 1,
      paddingLeft: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pT21: {
      paddingTop: 21,
    },
    pT15: {
      paddingTop: 15,
    },
    pT10: {
      paddingTop: 10,
    },
    fS10: {fontSize: 10},

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
    dot: {
      backgroundColor: Colors.CURIOUS_BLUE,
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 10,
    },
    hairline: {
      borderColor: colors.boxBorderColor,
      borderWidth: 1,
      width: '100%',
      paddingHorizontal: 15,
      marginTop: 11,
    },
    inline: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 52,
      flexDirection: 'row',
    },
    Outline: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginLeft: 10,
      flexDirection: 'row',
      marginVertical: 10,
    },
    textBox: {
      backgroundColor: colors.LightBackground,
      color: '#5285D4',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 5,
      borderColor: colors.LightBackground,
      borderRadius: 10,
      marginRight: 10,
    },
    text: {
      color: '#5285D4',
      borderColor: colors.LightBackground,
      borderRadius: 10,
    },
    w50: {
      padding: 10,
      alignItems: 'center',
      width: (deviceWidth - 40) / 2,
      borderRadius: 120,
      borderWidth: 1,
      borderColor: colors.LightBackground,
    },
    tabBar: {
      flex: 1,
      padding: 3,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.LightBackground,
      marginHorizontal: 8,
      borderRadius: 150,
      marginVertical: 10,
    },
    mT10: {
      marginTop: 10,
    },
    fS12: {
      fontSize: 12,
    },
    mL10: {
      marginLeft: 10,
    },
    font: {
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: '600',
    },
    mT12: {marginTop: 12},
    mT5: {marginTop: 5},
    bg: {backgroundColor: '#5285D4'},
    bgLight: {backgroundColor: colors.LightBackground},
    white: {color: '#fff'},
  });
};

export default useStyles;
