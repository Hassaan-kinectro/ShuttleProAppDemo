import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {scaleSize} from '../../styles/mixins';
import {deviceWidth} from '../../utils/orientation';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      overflow: 'hidden',
      shadowRadius: 1,
      shadowOpacity: 50,
      borderBottomLeftRadius: 35,
      borderBottomRightRadius: 35,
      marginBottom: 10,
      borderBottomWidth: 1,
      height: 130,
      borderColor: colors.boxBorderColor,
      borderWidth: 0.5,
      shadowOffset: {width: 0, height: 15},
      elevation: 5,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      height: 140,
      paddingTop: 40,
      elevation: 5,
    },
    menuIcon: {},
    headerText: {
      marginRight: scaleSize(120),
    },
    headerText2: {
      maxWidth: deviceWidth / 2,
      marginLeft: 10,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    backArrow: {paddingBottom: 10},
    searchInput: {
      width: deviceWidth - 120,
      // backgroundColor: 'red',
      marginLeft: 8,
      padding: 8,
      borderBottomWidth: 1,
      color: colors.button,
      borderBottomColor: colors.button,
      borderRadius: 1,
      fontSize: 16,
      backgroundColor: 'transparent',
    },
    rightIconsContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    icon: {
      padding: 8,
    },
    searchIcon: {
      padding: 5,
      backgroundColor: colors.searchIconBackground,
      opacity: 2,
      borderRadius: 50,
    },
    searchMargin: {
      marginBottom: 10,
    },
    profileIcon: {
      borderColor: colors.searchIconBackground,
      borderWidth: 2,
      borderRadius: 100,
      marginLeft: 5,
      position: 'relative',
    },
    logoutIcon: {
      padding: 8,
      paddingBottom: 15,
    },
    HeaderImage: {
      width: 32,
      height: 32,
      borderRadius: 50,
    },
    hamburgerStyle: {
      height: 25,
      width: 25,
    },
    active: {
      width: 5,
      bottom: 0,
      right: -2,
      position: 'absolute',
      borderWidth: 5,
      borderRadius: 500,
      borderColor: '#27AE60',
    },
  });
};

export default useStyles;
