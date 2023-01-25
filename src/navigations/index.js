import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StackActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';

import {showMessage} from 'react-native-flash-message';
import {IS_ANDROID, IS_IOS} from '../utils/orientation';
import {Routes, HIDE_HEADER} from '../utils/constants';
import {SignOut, setTheme, setAuth} from '../config/authSettings';
import {Colors, GlobalStyle} from '../styles';
import Loading from '../scenes/Loading';
import Login from '../scenes/Auth/Login';
import Workspace from '../scenes/Workspace';
import Settings from '../scenes/Settings';
import Inbox from '../scenes/Inbox';
import Design from '../scenes/Designs';
import Dashboard from '../scenes/Dashboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../context/userContext';
import FastImage from 'react-native-fast-image';
import {DrawerLogo} from '../utils/imagesPath';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderScreen from '../scenes/Orders';
import ShowOrder from '../scenes/Orders/ShowOrder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UpdateTheme} from '../modules/theme/action';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AIcon from 'react-native-vector-icons/AntDesign';

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
  }
  // if (check) {
  //   return {
  //     headerRight: () => (
  //       <TouchableOpacity style={[styles.Download]} onPress={() => {onDownload(item);}}
  //         disabled={item.download !== 'Done'}
  //       >

  //         {loading === false ? (
  //           <MIcon name="save-alt" size={23} color={item.download === 'Done' ? Colors.WHITE : '#BDBCBC'} />) : (
  //           <Spinner
  //             type={'ThreeBounce'}
  //             size={30}
  //             color={Colors.PRIMARY}
  //           />
  //         )}
  //     )}
  // }
  else if (check) {
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

const AppLogout = async (
  navigation,
  setAuth,
  setUserName,
  setOrganization_id,
  setUserRole,
  setUserId,
  setWorkspaces,
) => {
  await setAuth(false);
  await setUserName(null),
    await setOrganization_id(null),
    await setUserRole(null),
    // await setWorkspaces(null),
    await setUserId(null);
  await SignOut();
  navigation.dispatch(StackActions.replace('login'));
};

export const Logout = async (
  navigation,
  setAuth,
  setUserName,
  setOrganization_id,
  setUserRole,
  setUserId,
  setWorkspaces,
) => {
  await setAuth(false);
  await setUserName(null),
    await setOrganization_id(null),
    await setUserRole(null),
    // await setWorkspaces(null),
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
  console.log('Visible---->>>>', visible, theme);

  React.useEffect(() => {
    AsyncStorage.getItem('Theme').then(res => {
      console.log('---Theme->>>', res);
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
          title: 'Orders',
          ...StackCommonHeaderOptions(navigation),
        })}
        name={Routes.ORDERSLIST}
        component={OrderScreen}
      />
      <Stack.Screen
        headerMode="screen"
        options={({navigation}) => ({
          headerShown: false,
          title: 'Orders',
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
  let context = React.useContext(UserContext);
  const {colors} = useTheme();
  const Styles = GlobalStyle();
  const {userRole, workspace} = context;
  const img =
    workspace &&
    workspace.workspace &&
    workspace.workspace.icon &&
    workspace.workspace.icon.thumb
      ? workspace.workspace.icon.thumb.url
      : null;
  const name =
    workspace && workspace.workspace && workspace.workspace.name
      ? workspace.workspace.name
      : null;
  return (
    <DrawerContentScrollView
      style={{backgroundColor: colors.background}}
      {...props}>
      <View
        style={[Styles.flexCenter, Styles.flexDirectionColumn, {height: 180}]}>
        <ThemeIcon />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('workspace');
          }}>
          {img ? (
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={{uri: img}}
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
            {name}
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
          navigation.navigate('workspace');
        }}
        icon={({color, size}) => (
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
                  workspaceId: workspace.workspace.id,
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
          userRole === 'Store Manager'
            ? showMessage({
                message: 'Disabled',
                description: 'You are not authorized',
                type: 'danger',
              })
            : navigation.navigate(Routes.INBOX);
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
  notificationCount,
  setNotificationCount,
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
      openByDefault={false}
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
            notificationCount={notificationCount}
            setNotificationCount={setNotificationCount}
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
const BottomTabNavigator = ({
  notificationCount,
  setNotificationCount,
  setAuth,
  setUserName,
  setOrganization_id,
  setUserRole,
  setUserId,
}) => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={Routes.DASHBOARD}
      backBehavior="initialRoute"
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          height: IS_ANDROID ? '10%' : '10%',
          borderColor: 'transparent',
          backgroundColor: colors.background,
          position: 'absolute',
          overflow: 'hidden',
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          left: 0,
          bottom: 0,
          right: 0,
          padding: 5,
          paddingTop: 15,
        },
      })}
      tabBarOptions={{
        showLabel: false,
        scrollEnabled: true,
        activeTintColor: colors.button,
        inactiveTintColor: colors.labelColor,
        showIcon: true,
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name={Routes.DASHBOARD}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  shadowColor: '#258082',
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 11.14,

                  elevation: 17,
                }}>
                <AIcon name="creditcard" size={size} color={color} />
                <View
                  style={{
                    height: 5,
                    width: 25,
                    backgroundColor: '#258082',
                    borderRadius: 5,
                    marginTop: 15,
                  }}
                />
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
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  shadowColor: '#258082',
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 11.14,

                  elevation: 17,
                }}>
                <AIcon name="laptop" size={size} color={color} />
                <View
                  style={{
                    height: 5,
                    width: 25,
                    backgroundColor: '#258082',
                    borderRadius: 5,
                    marginTop: 15,
                  }}
                />
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
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  shadowColor: '#258082',
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 11.14,

                  elevation: 17,
                }}>
                <MCIcon
                  name="image-multiple-outline"
                  size={size}
                  color={color}
                />
                <View
                  style={{
                    height: 5,
                    width: 25,
                    backgroundColor: '#258082',
                    borderRadius: 5,
                    marginTop: 15,
                  }}
                />
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
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  shadowColor: '#258082',
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 11.14,
                  elevation: 17,
                }}>
                <AIcon name="inbox" size={size} color={color} />
                <View
                  style={{
                    height: 5,
                    width: 25,
                    backgroundColor: '#258082',
                    borderRadius: 5,
                    marginTop: 15,
                  }}
                />
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
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  shadowColor: '#258082',
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 11.14,
                  elevation: 17,
                }}>
                <AIcon name="setting" size={size} color={color} />

                <View
                  style={{
                    height: 5,
                    width: 25,
                    backgroundColor: '#258082',
                    borderRadius: 5,
                    marginTop: 15,
                  }}
                />
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
  notificationCount,
  setNotificationCount,
  setAuth,
  setUserName,
  setOrganization_id,
  setUserRole,
  workspace,
  setWorkspaces,
  setUserId,
  userRole,
  userName,
  organization_id,
  userId,
}) => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.WORKSPACE}
      screenOptions={[StackCommonOptions]}>
      <Stack.Screen
        name={Routes.WORKSPACE}
        headerMode="screen"
        options={({navigation}) => ({
          // title: 'Workspace123',
          headerShown: false,
          ...StackCommonHeaderOptions(
            navigation,
            false,
            true,
            setAuth,
            setUserName,
            setOrganization_id,
            setUserRole,
            setWorkspaces,
          ),
        })}>
        {props => (
          <Workspace
            {...props}
            workspace={workspace}
            setWorkspaces={setWorkspaces}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name={Routes.DRAWER} options={{headerShown: false}}>
        {props => (
          <DrawerNavigator
            {...props}
            notificationCount={notificationCount}
            setNotificationCount={setNotificationCount}
            setAuth={setAuth}
            setUserId={setUserId}
            setOrganization_id={setOrganization_id}
            setUserRole={setUserRole}
            setUserName={setUserName}
            workspace={workspace}
            setWorkspaces={setWorkspaces}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name={Routes.ORDERS}
        options={{headerShown: false}}
        component={Orders}
      />
    </Stack.Navigator>
  );
};

const Navigation = ({
  notificationCount,
  setNotificationCount,
  setAuth,
  setUserName,
  setOrganization_id,
  setUserRole,
  workspace,
  setWorkspaces,
  setUserId,
  userRole,
  userName,
  organization_id,
  userId,
  theme,
}) => {
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
        <Stack.Screen name={Routes.WORKSPACE} options={HIDE_HEADER}>
          {props => (
            <WorkspaceNavigator
              {...props}
              notificationCount={notificationCount}
              setNotificationCount={setNotificationCount}
              setAuth={setAuth}
              setUserId={setUserId}
              setOrganization_id={setOrganization_id}
              setUserRole={setUserRole}
              setUserName={setUserName}
              workspace={workspace}
              setWorkspaces={setWorkspaces}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name={Routes.HOME} options={HIDE_HEADER}>
          {props => <DrawerNavigator {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
