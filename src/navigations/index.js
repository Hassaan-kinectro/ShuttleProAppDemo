/* eslint-disable no-unused-vars */
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
import {showMessage} from 'react-native-flash-message';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UpdateTheme} from '../modules/theme/action';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AIcon from 'react-native-vector-icons/AntDesign';
import StoryLoading from '../scenes/StoryLoading';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const StackCommonOptions = () => {
  const {colors} = useTheme();
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
const StackCommonHeaderOptions = (
  navigation,
  back = false,
  check,
  setAuth,
  setUserName,
  setOrganization_id,
  setUserRole,
  setUserId,
  setWorkspaces,
) => {
  const {colors} = useTheme();

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
        <MaterialIcons
          name="logout"
          color={colors.icon}
          size={25}
          style={{paddingRight: 15}}
          onPress={() =>
            AppLogout(
              navigation,
              setAuth,
              setUserName,
              setOrganization_id,
              setUserRole,
              setUserId,
              setWorkspaces,
            )
          }
        />
      ),
    };
  } else if (check) {
    return {
      headerRight: () => (
        <MaterialIcons
          name="logout"
          color={colors.icon}
          size={25}
          style={{paddingRight: 15}}
          onPress={() =>
            AppLogout(
              navigation,
              setAuth,
              setUserName,
              setOrganization_id,
              setUserRole,
              setUserId,
              setWorkspaces,
            )
          }
        />
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

export const AppLogout = async (
  navigation,
  setAuth,
  setUserName,
  setOrganization_id,
  setUserRole,
  setUserId,
) => {
  await setAuth(false);
  await setUserName(null),
    await setOrganization_id(null),
    await setUserRole(null),
    await setUserId(null);
  await SignOut();
  navigation.dispatch(StackActions.replace('login'));
};

const ThemeIcon = () => {
  const theme = useSelector(state => state.themeChange.theme);
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(true);

  const {colors} = useTheme();
  const Styles = GlobalStyle();

  React.useEffect(() => {
    AsyncStorage.getItem('Theme').then(res => {
      if (res === 'DARK') {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, []);
  const setVisibility = React.useCallback(() => {
    if (theme === 'DARK') {
      setVisible(false);
      setTheme('LIGHT');
      dispatch(UpdateTheme('LIGHT'));
    } else {
      setVisible(true);
      setTheme('DARK');
      dispatch(UpdateTheme('DARK'));
    }
  }, [theme]);
  return (
    <TouchableOpacity
      style={Styles.ThemeIcon}
      activeOpacity={0.7}
      onPress={() => {
        setVisibility();
      }}>
      {visible ? (
        <Feather
          name="sun"
          color={colors.themeIcon}
          size={25}
          style={{paddingRight: 15}}
          onPress={() => {
            setVisibility();
          }}
        />
      ) : (
        <Feather
          name="moon"
          color={colors.themeIcon}
          size={30}
          style={{paddingRight: 15}}
          onPress={() => {
            setVisibility();
          }}
        />
      )}
    </TouchableOpacity>
  );
};
const Orders = () => {
  return (
    <Stack.Navigator
      screenOptions={StackCommonOptions}
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
  const {navigation} = props;
  const workspaceIcon = useSelector(
    state => state.workspace.workspace.workspace.icon.thumb.url,
  );
  const workspaceName = useSelector(
    state => state.workspace.workspace.workspace.name,
  );
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const {colors} = useTheme();
  const Styles = GlobalStyle();

  return (
    <DrawerContentScrollView
      style={{backgroundColor: colors.background}}
      {...props}>
      <View
        style={[Styles.flexCenter, Styles.flexDirectionColumn, {height: 180}]}>
        <ThemeIcon />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.WORKSPACE);
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
          navigation.navigate(Routes.WORKSPACE);
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
          navigation.navigate(Routes.DRAWER, {
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
        onPress={() =>
          AppLogout(
            navigation,
            props.setAuth,
            props.setOrganization_id,
            props.setUserRole,
            props.setUserName,
            props.setUserId,
          )
        }
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
const DrawerNavigator = ({
  setAuth,
  setUserName,
  setOrganization_id,
  setUserRole,
  setUserId,
}) => {
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
        <CustomDrawerContent
          {...props}
          setAuth={setAuth}
          setUserId={setUserId}
          setOrganization_id={setOrganization_id}
          setUserRole={setUserRole}
          setUserName={setUserName}
        />
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
        {props => (
          <BottomTabNavigator
            {...props}
            setAuth={setAuth}
            setUserId={setUserId}
            setOrganization_id={setOrganization_id}
            setUserRole={setUserRole}
            setUserName={setUserName}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
const BottomTabNavigator = () => {
  const {colors} = useTheme();
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
                <AIcon name="creditcard" size={size} color={color} />
                <View style={tabStyles.button} />
              </View>
            ) : (
              <AIcon name="creditcard" size={size} color={color} />
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
        }}
        component={Orders}
      />
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
                <AIcon name="inbox" size={size} color={color} />
                <View style={tabStyles.button} />
              </View>
            ) : (
              <AIcon name="inbox" size={size} color={color} />
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
const WorkspaceNavigator = ({
  setAuth,
  setUserName,
  setOrganization_id,
  setUserRole,
  setUserId,
}) => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.WORKSPACE}
      screenOptions={[StackCommonOptions]}>
      <Stack.Screen
        name={Routes.WORKSPACE}
        headerMode="screen"
        options={({navigation}) => ({
          headerShown: false,
          ...StackCommonHeaderOptions(
            navigation,
            false,
            true,
            setAuth,
            setUserName,
            setOrganization_id,
            setUserRole,
          ),
        })}>
        {props => (
          <Workspace
            {...props}
            setAuth={setAuth}
            setUserName={setUserName}
            setOrganization_id={setOrganization_id}
            setUserRole={setUserRole}
            setUserId={setUserId}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name={Routes.DRAWER} options={{headerShown: false}}>
        {props => (
          <DrawerNavigator
            {...props}
            setAuth={setAuth}
            setUserId={setUserId}
            setOrganization_id={setOrganization_id}
            setUserRole={setUserRole}
            setUserName={setUserName}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const Navigation = ({setAuth, theme}) => {
  const [userId, setUserId] = React.useState(null);
  const [userName, setUserName] = React.useState(null);
  const [userRole, setUserRole] = React.useState(null);
  const [organization_id, setOrganization_id] = React.useState(null);
  const user = useSelector(state => state.user.user);

  React.useEffect(() => {
    if (user) {
      setUserId(user.id);
      setUserName(user.name);
      setUserRole(user.role);
      setOrganization_id(user.organization_id);
    }
  }, [user]);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={Routes.LOADING}
        screenOptions={StackCommonOptions}>
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
          {props => (
            <Login
              {...props}
              setAuth={setAuth}
              setUserId={setUserId}
              setOrganization_id={setOrganization_id}
              setUserRole={setUserRole}
              setUserName={setUserName}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name={Routes.WORKSPACES} options={HIDE_HEADER}>
          {props => (
            <WorkspaceNavigator
              {...props}
              setAuth={setAuth}
              setUserId={setUserId}
              setOrganization_id={setOrganization_id}
              setUserRole={setUserRole}
              setUserName={setUserName}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
