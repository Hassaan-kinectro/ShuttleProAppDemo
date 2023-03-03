import React from 'react';
import AIcon from 'react-native-vector-icons/AntDesign';
import MaIcons from 'react-native-vector-icons/MaterialIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/Feather';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import IIcons from 'react-native-vector-icons/Ionicons';
import EnIcons from 'react-native-vector-icons/Entypo';

const AntIcon = ({
  name = 'warning',
  color = '#000',
  size = 40,
  style = {},
  onPress = null,
}) => {
  return (
    <AIcon
      name={name}
      color={color}
      size={size}
      style={style}
      onPress={onPress ? onPress : null}
    />
  );
};
const MaterialCommunityIcons = ({
  name = 'close',
  color = '#000',
  size = 25,
  style = {},
  onPress = null,
}) => {
  return (
    <MIcon
      name={name}
      color={color}
      size={size}
      style={style}
      onPress={onPress ? onPress : null}
    />
  );
};
const MaterialIcons = ({
  name = 'logout',
  color = '#000',
  size = 25,
  style = {},
  onPress = null,
}) => {
  return (
    <MaIcons
      name={name}
      color={color}
      size={size}
      style={style}
      onPress={onPress ? onPress : null}
    />
  );
};
const FeatherIcons = ({
  name = 'search',
  color = '#000',
  size = 22,
  style = {},
  onPress = null,
}) => {
  return (
    <FIcon
      name={name}
      color={color}
      size={size}
      style={style}
      onPress={onPress ? onPress : null}
    />
  );
};
const FontAwesome5Icons = ({
  name = 'sort-down',
  color = '#000',
  size = 22,
  style = {},
  onPress = null,
}) => {
  return (
    <F5Icon
      name={name}
      color={color}
      size={size}
      style={style}
      onPress={onPress ? onPress : null}
    />
  );
};
const IonIcons = ({
  name = 'ios-arrow-back-circle',
  color = '#000',
  size = 22,
  style = {},
  onPress = null,
}) => {
  return (
    <IIcons
      name={name}
      color={color}
      size={size}
      style={style}
      onPress={onPress ? onPress : null}
    />
  );
};
const OcticonsIcons = ({
  name = 'sort-down',
  color = '#000',
  size = 22,
  style = {},
  onPress = null,
}) => {
  return (
    <Octicons
      name={name}
      color={color}
      size={size}
      style={style}
      onPress={onPress ? onPress : null}
    />
  );
};
export const WarningIcon = props => {
  return <AntIcon name="warning" {...props} />;
};
export const LogoutIcon = props => {
  return <AntIcon name="logout" {...props} />;
};
export const BackIcon = props => {
  return <IIcons name="md-arrow-back-circle" {...props} />;
};
export const PublishIcon = props => {
  return <EnIcons name="paper-plane" {...props} />;
};
export const SettingIcon = props => {
  return <AntIcon name="setting" {...props} />;
};
export const SocialIcon = props => {
  return <AntIcon name="facebook-square" {...props} />;
};
export const FilterIcon = props => {
  return <AntIcon name="filter" {...props} />;
};

export const RocketIcon = props => {
  return <AntIcon name="rocket" {...props} />;
};
export const OrderIcon = props => {
  return <MaterialCommunityIcons name="cart-outline" {...props} />;
};
export const DashboardIcon = props => {
  return <MaterialCommunityIcons name="view-dashboard-outline" {...props} />;
};
export const CloseIcon = props => {
  return <MaterialCommunityIcons name="close" {...props} />;
};
export const ThreeDotsIcon = props => {
  return <MaterialCommunityIcons name="dots-vertical" {...props} />;
};
export const CircleCheckIcon = props => {
  return <MaterialCommunityIcons name="checkbox-marked-circle" {...props} />;
};
export const CircleBlankIcon = props => {
  return (
    <MaterialCommunityIcons name="checkbox-blank-circle-outline" {...props} />
  );
};
export const BackArrowIcon = props => {
  return <MaterialIcons name="arrow-back" {...props} />;
};
export const NotificationIcon = props => {
  return <MaterialIcons name="notifications-active" {...props} />;
};
export const StoryIcon = props => {
  return <MaterialIcons name="amp-stories" {...props} />;
};
export const WorkspaceIcon = props => {
  return <MaterialIcons name="workspaces-outline" {...props} />;
};
export const SearchIcon = props => {
  return <FeatherIcons name="search" {...props} />;
};
export const ProductIcon = props => {
  return <FontAwesome5Icons name="shopping-bag" {...props} />;
};
export const DownArrowIcon = props => {
  return <FontAwesome5Icons name="sort-down" {...props} />;
};
export const LibraryAdd = props => {
  return <MaterialIcons name="library-add" {...props} />;
};
export const PlusIcon = props => {
  return <OcticonsIcons name="plus" {...props} />;
};
export const DeleteIcon = props => {
  return <MaterialIcons name="delete-outline" {...props} />;
};
export const CrossIcon = props => {
  return <MIcon name="close" {...props} />;
};
