import React from 'react';
import AIcon from 'react-native-vector-icons/AntDesign';
import MaIcons from 'react-native-vector-icons/MaterialIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/Feather';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
const AntIcon = ({
  name = 'warning',
  color = '#000',
  size = 40,
  style = {},
  onPress = () => {},
}) => {
  return (
    <AIcon
      name={name}
      color={color}
      size={size}
      style={style}
      onPress={onPress}
    />
  );
};
const MaterialCommunityIcons = ({
  name = 'close',
  color = '#000',
  size = 25,
  style = {},
  onPress = () => {},
}) => {
  return (
    <MIcon
      name={name}
      color={color}
      size={size}
      style={style}
      onPress={onPress}
    />
  );
};
const MaterialIcons = ({
  name = 'logout',
  color = '#000',
  size = 25,
  style = {},
  onPress = () => {},
}) => {
  return (
    <MaIcons
      name={name}
      color={color}
      size={size}
      style={style}
      onPress={onPress}
    />
  );
};
const FeatherIcons = ({
  name = 'search',
  color = '#000',
  size = 22,
  style = {},
  onPress = () => {},
}) => {
  return (
    <FIcon
      name={name}
      color={color}
      size={size}
      style={style}
      onPress={onPress}
    />
  );
};
const FontAwesome5Icons = ({
  name = 'sort-down',
  color = '#000',
  size = 22,
  style = {},
  onPress = () => {},
}) => {
  return (
    <F5Icon
      name={name}
      color={color}
      size={size}
      style={style}
      onPress={onPress}
    />
  );
};
export const WarningIcon = props => {
  return <AntIcon name="warning" {...props} />;
};
export const LogoutIcon = props => {
  return <MaterialIcons name="logout" {...props} />;
};
export const CloseIcon = props => {
  return <MaterialCommunityIcons name="close" {...props} />;
};
export const ThreeDotsIcon = props => {
  return <MaterialCommunityIcons name="dots-vertical" {...props} />;
};
export const BackArrowIcon = props => {
  return <MaterialCommunityIcons name="arrow-back" {...props} />;
};
export const SearchIcon = props => {
  return <FeatherIcons name="search" {...props} />;
};
export const DownArrowIcon = props => {
  return <FontAwesome5Icons name="sort-down" {...props} />;
};
