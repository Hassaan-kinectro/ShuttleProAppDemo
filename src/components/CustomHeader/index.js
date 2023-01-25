import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import CircularImage from '../CircularImage';
import F5Icon from 'react-native-vector-icons/FontAwesome5';

import {
  HeaderBG,
  Hamburger,
  HeaderDark,
  HeaderLight,
} from '../../utils/imagesPath';

const CustomHeader = ({navigation, name}) => {
  const theme = useSelector(state => state.themeChange.theme);
  const workspaceImage = useSelector(
    state => state.workspace.workspace.workspace.icon.thumb.url,
  );
  const workspaceName = useSelector(
    state => state.workspace.workspace.workspace.name,
  );
  const [searchVisible, setSearchVisible] = useState(false);
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View
      style={{
        overflow: 'hidden',
        shadowRadius: 1,
        shadowOpacity: 0.2,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        marginBottom: 15,
        borderColor: 'transparent',
        borderWidth: 0.5,
      }}>
      <ImageBackground source={theme === 'DARK' ? HeaderDark : HeaderLight}>
        <View style={styles.headerContainer}>
          {!searchVisible && (
            <>
              <TouchableOpacity
                style={styles.menuIcon}
                onPress={() => navigation.toggleDrawer()}>
                <Image source={Hamburger} style={styles.hamburgerStyle} />
              </TouchableOpacity>
              <Text style={styles.headerText}>{name}</Text>
            </>
          )}
          {searchVisible && (
            <View style={styles.searchContainer}>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => setSearchVisible(false)}>
                <MIcon name="arrow-back" size={24} color={colors.searchIcon} />
              </TouchableOpacity>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                left={() => (
                  <MIcon name="search" size={24} color={colors.searchIcon} />
                )}
              />
              <TouchableOpacity
                style={styles.searchIcon}
                onPress={() => setSearchVisible(true)}>
                <FIcon name="search" size={22} color={colors.searchIcon} />
              </TouchableOpacity>
            </View>
          )}
          {!searchVisible && (
            <View style={styles.rightIconsContainer}>
              <TouchableOpacity
                style={styles.searchIcon}
                onPress={() => setSearchVisible(true)}>
                <FIcon name="search" size={22} color={colors.searchIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileIcon}
                onPress={() => {
                  // navigate to settings
                }}>
                <CircularImage
                  img={workspaceImage}
                  name={workspaceName}
                  style={styles.HeaderImage}
                />
                <View
                  style={{
                    // height: 1,
                    // width: '100%',
                    // borderRadius: 100,
                    width: 5,
                    bottom: 0,
                    right: -2,
                    position: 'absolute',
                    borderWidth: 5,
                    borderRadius: 500,
                    borderColor: '#27AE60',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logoutIcon}
                onPress={() => {
                  navigation.goBack();
                }}>
                <F5Icon name="sort-down" size={24} color={colors.searchIcon} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const useStyles = colors => {
  return StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      height: 130,
      paddingTop: 40,
    },
    menuIcon: {},
    headerText: {
      fontWeight: '600',
      fontFamily: 'Raleway',
      fontSize: 24,
      color: colors.TextColor,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    backArrow: {},
    searchInput: {
      flex: 1,
      marginLeft: 8,
      padding: 8,
      // borderWidth: 1,
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
      opacity: 0.8,
      borderRadius: 50,
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
    },
    HeaderImage: {
      width: 33,
      height: 33,
      borderRadius: 50,
    },
    hamburgerStyle: {
      height: 25,
      width: 25,
    },
  });
};

export default CustomHeader;
