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
import {orderBy} from 'lodash';
import {FONT_FAMILY} from '../../utils/constants';

const CustomHeader = ({
  navigation,
  name,
  searchIcon = false,
  allOrders,
  setOrders,
  page,
  offset,
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
    OnSearchString(text);
  };
  const OnSearchString = text => {
    console.log('hello');
    if (text.length > 0) {
      const result =
        allOrders &&
        allOrders.filter(p => {
          let aa = false;
          if (p.tracking_id) {
            aa = p.tracking_id
              ? p.tracking_id.toLowerCase().includes(text)
              : false;
          }
          if (p && p.customer && p.customer.name) {
            aa = p.customer.name.toLowerCase().includes(text.toLowerCase());
            if (!aa) {
              aa = p.customer.contact.toLowerCase().includes(text);
            }
          }
          return aa;
        });
      setOrders(result);
    } else {
      const totalLength = page * offset;
      setOrders(orderBy(allOrders.slice(0, totalLength)));
    }
  };
  const OnSearch = () => {
    Keyboard.dismiss();
    OnSearchString(search);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={theme === 'DARK' ? HeaderDark : HeaderLight}>
        <View style={styles.headerContainer}>
          {!searchVisible && (
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
              {searchIcon && (
                <TouchableOpacity
                  style={styles.searchIcon}
                  onPress={() => setSearchVisible(true)}>
                  <FIcon name="search" size={22} color={colors.searchIcon} />
                </TouchableOpacity>
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
