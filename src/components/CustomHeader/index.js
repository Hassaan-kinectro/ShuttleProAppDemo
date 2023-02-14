import React, {useState} from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import CircularImage from '../CircularImage';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import {Hamburger, HeaderDark, HeaderLight} from '../../utils/imagesPath';
import useStyles from './styles';
import {Styles, Text} from '../../styles';
import TextField from '../TextField';
import {FONT_FAMILY} from '../../utils/constants';

const CustomHeader = ({
  navigation,
  name,
  searchIcon = false,
  onSearchText = () => {},
}) => {
  const theme = useSelector(state => state.themeChange.theme);
  const workspaceImage = useSelector(
    state => state.workspace.workspace.workspace.icon.thumb.url,
  );
  const workspaceName = useSelector(
    state => state.workspace.workspace.workspace.name,
  );
  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = React.useState('');

  const {colors} = useTheme();
  const styles = useStyles();

  const onSearchChange = text => {
    setSearch(text);
    onSearchText && onSearchText(text);
  };
  const OnSearch = () => {
    Keyboard.dismiss();
    onSearchText && onSearchText(search);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={theme === 'DARK' ? HeaderDark : HeaderLight}>
        <View style={styles.headerContainer}>
          {!searchVisible && (
<<<<<<< HEAD
            <>
              {name && name === 'Stories' && (
                <>
                  <TouchableOpacity
                    style={styles.menuIcon}
                    onPress={() => navigation.toggleDrawer()}>
                    <Image source={Hamburger} style={styles.hamburgerStyle} />
                  </TouchableOpacity>
                  <Text
                    size={24}
                    color={colors.TextColor}
                    fontFamily={FONT_FAMILY.SEMI_BOLD}
                    style={styles.headerText2}>
                    {name}
                  </Text>
                </>
              )}
              {name && name === 'Profiles' && (
                <>
                  <TouchableOpacity
                    style={styles.menuIcon}
                    onPress={() => navigation.toggleDrawer()}>
                    <Image source={Hamburger} style={styles.hamburgerStyle} />
                  </TouchableOpacity>
                  <Text
                    size={24}
                    color={colors.TextColor}
                    fontFamily={FONT_FAMILY.SEMI_BOLD}
                    style={styles.headerText2}>
                    {name}
                  </Text>
                </>
              )}
              {name && name === 'Order' && (
                <>
                  <TouchableOpacity
                    style={styles.menuIcon}
                    onPress={() => navigation.toggleDrawer()}>
                    <Image source={Hamburger} style={styles.hamburgerStyle} />
                  </TouchableOpacity>
                  <Text
                    size={24}
                    color={colors.TextColor}
                    fontFamily={FONT_FAMILY.SEMI_BOLD}
                    style={styles.headerText2}>
                    {name}
                  </Text>
                </>
              )}
              {name && name === 'Orders' && (
                <>
                  <TouchableOpacity
                    style={styles.menuIcon}
                    onPress={() => navigation.toggleDrawer()}>
                    <Image source={Hamburger} style={styles.hamburgerStyle} />
                  </TouchableOpacity>
                  <Text
                    size={24}
                    color={colors.TextColor}
                    fontFamily={FONT_FAMILY.SEMI_BOLD}
                    style={styles.headerText}>
                    {name}
                  </Text>
                </>
              )}
            </>
=======
            <View style={[Styles.flexCenterStart, Styles.flexDirectionRow]}>
              <TouchableOpacity
                style={styles.menuIcon}
                onPress={() => navigation.toggleDrawer()}>
                <Image source={Hamburger} style={styles.hamburgerStyle} />
              </TouchableOpacity>
              <Text
                size={24}
                color={colors.TextColor}
                fontFamily={FONT_FAMILY.SEMI_BOLD}
                lines={1}
                style={styles.headerText2}>
                {name}
              </Text>
            </View>
>>>>>>> origin/main
          )}
          {searchVisible && (
            <View style={styles.searchContainer}>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => setSearchVisible(false)}>
                <MIcon name="arrow-back" size={24} color={colors.searchIcon} />
              </TouchableOpacity>
              <TextField
                placeholderTextColor={colors.TextColor}
                style={styles.searchInput}
                placeholder="Search"
                label="Search"
                hideLabel
                name="search"
                onChangeText={onSearchChange}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                blurOnSubmit={false}
                fontSize={14}
                hideError
                onSubmitEditing={() => {
                  OnSearch();
                }}
                clearIcon
                search
              />
              <TouchableOpacity style={styles.searchIcon} onPress={OnSearch}>
                <FIcon name="search" size={22} color={colors.TextColor} />
              </TouchableOpacity>
            </View>
          )}
          {!searchVisible && (
            <View style={styles.rightIconsContainer}>
<<<<<<< HEAD
              {name && name === 'Stories' && (
                <>
                  <TouchableOpacity
                    style={styles.profileIcon}
                    onPress={() => {}}>
                    <CircularImage
                      img={workspaceImage}
                      name={workspaceName}
                      style={styles.HeaderImage}
                    />
                    <View style={styles.active} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.logoutIcon}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <F5Icon
                      name="sort-down"
                      size={24}
                      color={colors.searchIcon}
                    />
                  </TouchableOpacity>
                </>
              )}
              {name && name === 'Profiles' && (
                <>
                  <TouchableOpacity
                    style={styles.profileIcon}
                    onPress={() => {}}>
                    <CircularImage
                      img={workspaceImage}
                      name={workspaceName}
                      style={styles.HeaderImage}
                    />
                    <View style={styles.active} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.logoutIcon}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <F5Icon
                      name="sort-down"
                      size={24}
                      color={colors.searchIcon}
                    />
                  </TouchableOpacity>
                </>
              )}
              {name && name === 'Order' && (
                <>
                  <TouchableOpacity
                    style={styles.profileIcon}
                    onPress={() => {}}>
                    <CircularImage
                      img={workspaceImage}
                      name={workspaceName}
                      style={styles.HeaderImage}
                    />
                    <View style={styles.active} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.logoutIcon}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <F5Icon
                      name="sort-down"
                      size={24}
                      color={colors.searchIcon}
                    />
                  </TouchableOpacity>
                </>
              )}
              {name && name === 'Orders' && (
                <>
                  <TouchableOpacity
                    style={styles.searchIcon}
                    onPress={() => setSearchVisible(true)}>
                    <FIcon name="search" size={22} color={colors.searchIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.profileIcon}
                    onPress={() => {}}>
                    <CircularImage
                      img={workspaceImage}
                      name={workspaceName}
                      style={styles.HeaderImage}
                    />
                    <View style={styles.active} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.logoutIcon}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <F5Icon
                      name="sort-down"
                      size={24}
                      color={colors.searchIcon}
                    />
                  </TouchableOpacity>
                </>
=======
              {searchIcon && onSearchText && (
                <TouchableOpacity
                  style={styles.searchIcon}
                  onPress={() => setSearchVisible(true)}>
                  <FIcon name="search" size={22} color={colors.searchIcon} />
                </TouchableOpacity>
>>>>>>> origin/main
              )}
              <TouchableOpacity style={styles.profileIcon} onPress={() => {}}>
                <CircularImage
                  img={workspaceImage}
                  name={workspaceName}
                  style={styles.HeaderImage}
                />
                <View style={styles.active} />
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

export default CustomHeader;
