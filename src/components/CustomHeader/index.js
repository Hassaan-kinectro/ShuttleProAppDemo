import React, {useState} from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import CircularImage from '../CircularImage';
import {Hamburger, HeaderDark, HeaderLight} from '../../utils/imagesPath';
import {
  BackArrowIcon,
  SearchIcon,
  DownArrowIcon,
  LogoutIcon,
  NotificationIcon,
} from '../../icons';
import useStyles from './styles';
import {Styles, Text} from '../../styles';
import TextField from '../TextField';
import PopupMenu from '../PopupMenu';
import {FONT_FAMILY, Routes} from '../../utils/constants';
import {AppLogout} from '../../navigations';

const CustomHeader = ({
  navigation,
  name,
  searchIcon = false,
  backIcon = false,
  drawer = true,
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
            <View style={[Styles.flexCenterStart, Styles.flexDirectionRow]}>
              {drawer && (
                <TouchableOpacity
                  style={styles.menuIcon}
                  onPress={() => navigation.toggleDrawer()}>
                  <Image source={Hamburger} style={styles.hamburgerStyle} />
                </TouchableOpacity>
              )}
              {backIcon && !drawer && (
                <TouchableOpacity
                  style={styles.menuIcon}
                  onPress={() => navigation.goBack()}>
                  <BackArrowIcon size={28} color={colors.searchIcon} />
                </TouchableOpacity>
              )}
              <Text
                size={24}
                color={colors.TextColor}
                fontFamily={FONT_FAMILY.SEMI_BOLD}
                lines={1}
                style={styles.headerText2}>
                {name}
              </Text>
            </View>
          )}
          {searchVisible && (
            <View style={styles.searchContainer}>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => setSearchVisible(false)}>
                <BackArrowIcon size={28} color={colors.searchIcon} />
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
              <TouchableOpacity
                style={[styles.searchIcon, styles.searchMargin]}
                onPress={OnSearch}>
                <SearchIcon size={22} color={colors.TextColor} />
              </TouchableOpacity>
            </View>
          )}
          {!searchVisible && (
            <View style={styles.rightIconsContainer}>
              {searchIcon && onSearchText && (
                <TouchableOpacity
                  style={styles.searchIcon}
                  onPress={() => setSearchVisible(true)}>
                  <SearchIcon size={22} color={colors.searchIcon} />
                </TouchableOpacity>
              )}
              <PopupMenu
                HeaderAnchor={() => (
                  <View
                    style={[
                      Styles.flexDirectionRow,
                      Styles.justifyContentCenter,
                      Styles.alignItemsCenter,
                    ]}>
                    <View style={styles.profileIcon}>
                      <CircularImage
                        img={workspaceImage}
                        name={workspaceName}
                        style={styles.HeaderImage}
                      />
                      <View style={styles.active} />
                    </View>
                    <View style={styles.logoutIcon}>
                      <DownArrowIcon size={24} color={colors.searchIcon} />
                    </View>
                  </View>
                )}
                options={[
                  {
                    label: 'Notifications',
                    icon: (
                      <NotificationIcon size={18} color={colors.fontPrimary} />
                    ),
                    onClick: () => {
                      navigation.navigate(Routes.NOTIFICATIONS);
                    },
                  },
                  {
                    label: 'Logout',
                    icon: <LogoutIcon size={18} color={colors.fontPrimary} />,
                    onClick: () => {
                      console.log('The button');
                      AppLogout(navigation);
                    },
                  },
                ]}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default CustomHeader;
