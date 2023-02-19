import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {scaleSize} from '../../styles/mixins';
import {deviceWidth} from '../../utils/orientation';

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      height: 125,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 6,
    },
    container2: {
      overflow: 'hidden',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      borderWidth: 0.5,
      borderColor: colors.boxBorderColor,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      height: 120,
      paddingTop: 40,
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
