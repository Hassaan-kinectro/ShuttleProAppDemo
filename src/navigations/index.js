/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StackActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {tabStyles} from '../styles/tabStyle';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import {IS_ANDROID, IS_IOS} from '../utils/orientation';
import {Routes, HIDE_HEADER} from '../utils/constants';
import {SignOut, setTheme} from '../config/authSettings';
import {Colors, GlobalStyle} from '../styles';
import Loading from '../scenes/Loading';
import Login from '../scenes/Auth/Login';
import Workspace from '../scenes/Workspace';
import Settings from '../scenes/Settings';
import Inbox from '../scenes/Inbox';
import Design from '../scenes/Designs';
import Dashboard from '../scenes/Dashboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import {DrawerLogo} from '../utils/imagesPath';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderScreen from '../scenes/Orders';
import ShowOrder from '../scenes/Orders/ShowOrder';
import {UpdateTheme} from '../modules/theme/action';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AIcon from 'react-native-vector-icons/AntDesign';
import StoryLoading from '../scenes/StoryLoading';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const StackCommonOptions = colors => {
  return {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: colors.boxColor,
      borderBottomWidth: IS_IOS ? 0.1 : 0.3,
      borderBottomColor: colors.borderColor,
    },
    headerTintColor: colors.baseColor,
  };
};
const LogoutButton = (colors, navigation) => {
  return (
    <MaterialIcons
      name="logout"
      color={colors.icon}
      size={25}
      style={{paddingRight: 15}}
      onPress={() => AppLogout(navigation)}
    />
  );
};
const ThemeButton = ({icon, color}) => {
  return (
    <Feather name={icon} color={color} size={25} style={{paddingRight: 15}} />
  );
};
const StackCommonHeaderOptions = (navigation, back = false, check, colors) => {
  if (back) {
    return {
      headerLeft: () => (
        <AIcon
          name="arrowleft"
          color={colors.icon}
          size={28}
          style={{paddingLeft: 15}}
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: () => (
        <LogoutButton colors={colors} navigation={navigation} />
      ),
    };
  } else if (check) {
    return {
      headerRight: () => (
        <LogoutButton colors={colors} navigation={navigation} />
      ),
    };
  } else {
    return {
      headerLeft: () => (
        <AIcon
          name="bars"
          color={colors.icon}
          size={28}
          style={{paddingLeft: 15}}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    };
  }
};

export const AppLogout = async navigation => {
  await SignOut();
  navigation.dispatch(StackActions.replace('login'));
};

const ThemeIcon = ({colors}) => {
  const theme = useSelector(state => state.themeChange.theme);
  const dispatch = useDispatch();
  const Styles = GlobalStyle();

  const setVisibility = React.useCallback(() => {
    const value = theme === 'DARK' ? 'LIGHT' : 'DARK';
    setTheme(value);
    dispatch(UpdateTheme(value));
  }, [theme]);
  return (
    <TouchableOpacity
      style={Styles.ThemeIcon}
      activeOpacity={0.7}
      onPress={setVisibility}>
      {theme === 'DARK' ? (
        <ThemeButton icon={'sun'} color={colors.themeIcon} />
      ) : (
        <ThemeButton icon={'moon'} color={colors.themeIcon} />
      )}
    </TouchableOpacity>
  );
};
const Orders = colors => {
  return (
    <Stack.Navigator
      screenOptions={{...StackCommonOptions(colors)}}
      initialRouteName={Routes.ORDERSLIST}>
      <Stack.Screen
        headerMode="screen"
        options={({navigation}) => ({
          headerShown: false,
          title: 'Orders Screen',
          ...StackCommonHeaderOptions(navigation),
        })}
        name={Routes.ORDERSLIST}
        component={OrderScreen}
      />
      <Stack.Screen
        headerMode="screen"
        options={({navigation}) => ({
          headerShown: false,
          title: 'Show Orders',
          ...StackCommonHeaderOptions(navigation),
        })}
        name={Routes.SHOWORDER}
        component={ShowOrder}
      />
    </Stack.Navigator>
  );
};
const CustomDrawerContent = props => {
  const {navigation, colors} = props;
  const workspaceIcon = useSelector(
    state => state.workspace.workspace.workspace.icon.thumb.url,
  );
  const workspaceName = useSelector(
    state => state.workspace.workspace.workspace.name,
  );
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const Styles = GlobalStyle();
  return (
    <DrawerContentScrollView
      style={{backgroundColor: colors.background}}
      {...props}>
      <View
        style={[Styles.flexCenter, Styles.flexDirectionColumn, {height: 180}]}>
        <ThemeIcon colors={colors} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.WORKSPACES);
          }}>
          {workspaceIcon ? (
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={{uri: workspaceIcon}}
              style={Styles.DrawerLogo}
            />
          ) : (
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={DrawerLogo}
              style={Styles.DrawerLogo}
            />
          )}
          <Text numberOfLines={1} style={Styles.WorkspaceLogoText}>
            {workspaceName}
          </Text>
        </TouchableOpacity>
      </View>
      <DrawerItem
        label="Workspaces"
        activeTintColor={Colors.WHITE}
        activeBackgroundColor={Colors.GRAYLIGHT}
        inactiveTintColor={Colors.GRAY}
        inactiveBackgroundColor={Colors.TRANSPARENT}
        onPress={() => {
          navigation.navigate(Routes.WORKSPACES);
        }}
        icon={({size}) => (
          <MaterialIcons
            name="credit-card"
            size={size}
            color={colors.labelColor}
          />
        )}
        labelStyle={{marginLeft: -10, color: colors.TextColor}}
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: colors.themeIcon,
        }}
      />
      <DrawerItem
        label="Dashboard"
        activeTintColor={Colors.WHITE}
        activeBackgroundColor={Colors.GRAYLIGHT}
        inactiveTintColor={Colors.GRAY}
        inactiveBackgroundColor={Colors.TRANSPARENT}
        onPress={() => {
          navigation.navigate(Routes.DASHBOARD, {
            screen: 'DashboardScreen',
            params: {
              screen: 'DashboardOrders',
              callType: 'dummy',
              params: {},
            },
          });
        }}
        icon={({color, size}) => (
          <AIcon name="home" size={size} color={colors.labelColor} />
        )}
        labelStyle={{marginLeft: -10, color: colors.TextColor}}
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: colors.themeIcon,
        }}
      />

      <DrawerItem
        label="Orders"
        activeTintColor={Colors.WHITE}
        activeBackgroundColor={Colors.GRAYLIGHT}
        inactiveTintColor={Colors.GRAY}
        inactiveBackgroundColor={Colors.TRANSPARENT}
        onPress={() => {
          navigation.navigate(Routes.WORKSPACE, {
            screen: Routes.BOTTOMTAB,
            params: {
              screen: Routes.ORDERS,
              params: {
                screen: 'OrdersList',
                params: {
                  workspaceId: workspaceId,
                },
              },
            },
          });
        }}
        icon={({color, size}) => (
          <AIcon name="laptop" size={size} color={colors.labelColor} />
        )}
        labelStyle={{marginLeft: -10, color: colors.TextColor}}
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: colors.themeIcon,
        }}
      />

      <DrawerItem
        label="Story"
        activeTintColor={Colors.WHITE}
        activeBackgroundColor={Colors.GRAYLIGHT}
        inactiveTintColor={Colors.GRAY}
        inactiveBackgroundColor={Colors.TRANSPARENT}
        onPress={() => {
          navigation.navigate(Routes.INBOX);
        }}
        icon={({color, size}) => (
          <AIcon name="inbox" size={size} color={colors.labelColor} />
        )}
        labelStyle={{marginLeft: -10, color: colors.TextColor}}
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: colors.themeIcon,
        }}
      />

      <DrawerItem
        label="Settings"
        activeTintColor={Colors.WHITE}
        activeBackgroundColor={Colors.GRAYLIGHT}
        inactiveTintColor={Colors.GRAY}
        inactiveBackgroundColor={Colors.TRANSPARENT}
        onPress={() => navigation.navigate(Routes.SETTINGS)}
        icon={({color, size}) => (
          <AIcon name="setting" size={size} color={colors.labelColor} />
        )}
        labelStyle={{marginLeft: -10, color: colors.TextColor}}
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: colors.themeIcon,
        }}
      />
      <DrawerItem
        label="Logout"
        activeTintColor={Colors.WHITE}
        activeBackgroundColor={Colors.GRAYLIGHT}
        inactiveTintColor={Colors.GRAY}
        inactiveBackgroundColor={Colors.TRANSPARENT}
        onPress={() => AppLogout(navigation)}
        icon={({color, size}) => (
          <AIcon name="logout" size={size} color={colors.labelColor} />
        )}
        labelStyle={{marginLeft: -10, color: colors.TextColor}}
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: colors.themeIcon,
        }}
      />
    </DrawerContentScrollView>
  );
};
const DrawerNavigator = () => {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName={Routes.BOTTOMTAB}
      overlayColor={colors.background}
      screenOptions={() => ({
        headerShown: false,
        swipeEnabled: false,
      })}
      drawerContent={props => (
        <CustomDrawerContent colors={colors} {...props} />
      )}
      drawerStyle={{backgroundColor: colors.themeIcon}}
      defaultStatus="closed"
      ScreenOptions={{
        activeTintColor: Colors.WHITE,
        activeBackgroundColor: Colors.GRAYLIGHT,
        inactiveTintColor: Colors.GRAY,
        inactiveBackgroundColor: Colors.WHITE,
        itemStyle: {
          borderBottomWidth: 0.5,
          borderBottomColor: colors.icon,
        },
        labelStyle: {marginLeft: -10},
      }}>
      <Drawer.Screen
        options={{
          drawerIcon: ({color, size}) => (
            <AIcon name="rocket" size={size} color={color} />
          ),
        }}
        name={Routes.BOTTOMTAB}>
        {props => <BottomTabNavigator colors={colors} {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
const BottomTabNavigator = ({colors}) => {
  return (
    <Tab.Navigator
      initialRouteName={Routes.DASHBOARD}
      backBehavior="initialRoute"
      screenOptions={() => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.button,
        tabBarInactiveTintColor: colors.labelColor,
        tabBarShowLabel: false,
        showLabel: false,
        showIcon: true,
        keyboardHidesTabBar: true,
        tabBarStyle: {
          height: IS_ANDROID ? '10%' : '10%',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          backgroundColor: colors.bottomNav,
          shadowOpacity: 0.12,
          shadowRadius: 8.0,
          elevation: 25,
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          borderColor: 'transparent',
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          padding: 5,
          paddingTop: 15,
        },
      })}>
      <Tab.Screen
        name={Routes.DASHBOARD}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <View style={tabStyles.box}>
                <MCIcon
                  name="view-dashboard-outline"
                  size={size}
                  color={color}
                />
                <View style={tabStyles.button} />
              </View>
            ) : (
              <MCIcon name="view-dashboard-outline" size={size} color={color} />
            ),
        }}>
        {props => <Dashboard {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name={Routes.ORDERS}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <View style={tabStyles.box}>
                <AIcon name="laptop" size={size} color={color} />
                <View style={tabStyles.button} />
              </View>
            ) : (
              <AIcon name="laptop" size={size} color={color} />
            ),
        }}>
        {props => <Orders colors={colors} {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name={Routes.DESIGNS}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <View style={tabStyles.box}>
                <MCIcon
                  name="image-multiple-outline"
                  size={size}
                  color={color}
                />
                <View style={tabStyles.button} />
              </View>
            ) : (
              <MCIcon name="image-multiple-outline" size={size} color={color} />
            ),
        }}>
        {props => <Design {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name={Routes.INBOX}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <View style={tabStyles.box}>
                <MaterialIcons name="amp-stories" size={size} color={color} />
                <View style={tabStyles.button} />
              </View>
            ) : (
              <MaterialIcons name="amp-stories" size={size} color={color} />
            ),
        }}>
        {props => <Inbox {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name={Routes.SETTINGS}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <View style={tabStyles.box}>
                <AIcon name="setting" size={size} color={color} />

                <View style={tabStyles.button} />
              </View>
            ) : (
              <AIcon name="setting" size={size} color={color} />
            ),
        }}>
        {props => <Settings {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
const Navigation = ({theme}) => {
  const {colors} = useTheme();
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={Routes.LOADING}
        screenOptions={{...StackCommonOptions(colors)}}>
        <Stack.Screen
          name={Routes.LOADING}
          component={Loading}
          options={HIDE_HEADER}
        />
        <Stack.Screen
          name={Routes.STORYLOADING}
          component={StoryLoading}
          options={HIDE_HEADER}
        />
        <Stack.Screen name={Routes.LOGIN} options={HIDE_HEADER}>
          {props => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name={Routes.WORKSPACES}
          headerMode="screen"
          options={({navigation}) => ({
            headerShown: false,
            ...StackCommonHeaderOptions(navigation, false, true, colors),
          })}>
          {props => <Workspace {...props} />}
        </Stack.Screen>
        <Stack.Screen name={Routes.WORKSPACE} options={{headerShown: false}}>
          {props => <DrawerNavigator {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
