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
import {
  DashboardIcon,
  LogoutIcon,
  OrderIcon,
  ProductIcon,
  RocketIcon,
  SettingIcon,
  SocialIcon,
  StoryIcon,
  WorkspaceIcon,
} from '../icons';
import {IS_ANDROID, IS_IOS} from '../utils/orientation';
import {Routes, HIDE_HEADER} from '../utils/constants';
import {SignOut, setTheme} from '../config/authSettings';
import {Colors, GlobalStyle} from '../styles';
import Loading from '../scenes/Loading';
import Login from '../scenes/Auth/Login';
import Workspaces from '../scenes/Workspaces';
import Notifications from '../scenes/Notifications';
import Settings from '../scenes/Settings';
import Products from '../scenes/Products';
import Dashboard from '../scenes/Dashboard';
import SocialMediaProfile from '../scenes/SocialMedia';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import {DrawerLogo} from '../utils/imagesPath';
import OrderScreen from '../scenes/Orders';
import ShowOrder from '../scenes/Orders/ShowOrder';
import {UpdateTheme} from '../modules/theme/action';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AIcon from 'react-native-vector-icons/AntDesign';
import StoryLoading from '../scenes/StoryLoading';
import ShowStory from '../scenes/SocialMedia/ShowStory';
import CreateStory from '../scenes/SocialMedia/CreateStory';
import CreateProduct from '../scenes/Products/create product';
import CreateOrders from '../scenes/Orders/CreateOrders';

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
          ...StackCommonHeaderOptions(navigation, false, true, colors),
        })}
        name={Routes.ORDERSLIST}
        component={OrderScreen}
      />
      <Stack.Screen
        headerMode="screen"
        options={({navigation}) => ({
          headerShown: false,
          title: 'Show Orders',
          ...StackCommonHeaderOptions(navigation, false, true, colors),
        })}
        name={Routes.SHOWORDER}
        component={ShowOrder}
      />
      <Stack.Screen
        headerMode="screen"
        options={({navigation}) => ({
          headerShown: false,
          title: 'Show Orders',
          ...StackCommonHeaderOptions(navigation),
        })}
        name={Routes.CREATEORDERS}
        component={CreateOrders}
      />
    </Stack.Navigator>
  );
};
const Product = colors => {
  return (
    <Stack.Navigator
      screenOptions={{...StackCommonOptions(colors)}}
      initialRouteName={Routes.PRODUCTSLIST}>
      <Stack.Screen
        headerMode="screen"
        options={({navigation}) => ({
          headerShown: false,
          title: 'Product Screen',
          ...StackCommonHeaderOptions(navigation, false, true, colors),
        })}
        name={Routes.PRODUCTSLIST}
        component={Products}
      />
      <Stack.Screen
        headerMode="screen"
        options={({navigation}) => ({
          headerShown: false,
          title: 'Create Product Screen',
          ...StackCommonHeaderOptions(navigation, false, true, colors),
        })}
        name={Routes.CREATEPRODUCTS}
        component={CreateProduct}
      />
    </Stack.Navigator>
  );
};
const SOCIALMEDIA = () => {
  return (
    <Stack.Navigator
      screenOptions={StackCommonOptions}
      initialRouteName={Routes.SOCIALPROFILELIST}>
      <Stack.Screen
        headerMode="screen"
        options={({navigation}) => ({
          headerShown: false,
          title: 'Social Media',
          ...StackCommonHeaderOptions(navigation),
        })}
        name={Routes.SOCIALPROFILELIST}
        component={SocialMediaProfile}
      />
      <Stack.Screen
        headerMode="screen"
        options={({navigation}) => ({
          headerShown: false,
          title: 'Show Story',
          ...StackCommonHeaderOptions(navigation),
        })}
        name={Routes.SHOWSTORY}
        component={ShowStory}
      />
      <Stack.Screen
        headerMode="screen"
        options={({navigation}) => ({
          headerShown: false,
          title: 'Create Story',
          ...StackCommonHeaderOptions(navigation),
        })}
        name={Routes.CREATESTORY}
        component={CreateStory}
      />
    </Stack.Navigator>
  );
};
const CustomDrawerContent = props => {
  const {navigation, colors} = props;
  const workspace = useSelector(state => state.workspace.workspace);
  const workspaceIcon =
    workspace && workspace.workspace && workspace.workspace.icon
      ? workspace.workspace.icon.thumb.url
      : null;
  const workspaceName =
    workspace && workspace.workspace && workspace.workspace.name
      ? workspace.workspace.name
      : null;
  const workspaceId =
    (workspace && workspace.workspace && workspace.workspace.id) || null;
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
          <WorkspaceIcon size={size} color={colors.labelColor} />
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
          <DashboardIcon size={size} color={colors.labelColor} />
        )}
        labelStyle={{marginLeft: -10, color: colors.TextColor}}
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: colors.themeIcon,
        }}
      />
      <DrawerItem
        label="Products"
        activeTintColor={Colors.WHITE}
        activeBackgroundColor={Colors.GRAYLIGHT}
        inactiveTintColor={Colors.GRAY}
        inactiveBackgroundColor={Colors.TRANSPARENT}
        onPress={() => {
          navigation.navigate(Routes.PRODUCTS, {
            screen: 'ProductsScreen',
          });
        }}
        icon={({color, size}) => (
          <ProductIcon size={size} color={colors.labelColor} />
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
          <OrderIcon size={size} color={colors.labelColor} />
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
          <StoryIcon size={size} color={colors.labelColor} />
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
          <SettingIcon size={size} color={colors.labelColor} />
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
          <LogoutIcon size={size} color={colors.labelColor} />
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
            <RocketIcon size={size} color={color} />
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
                <DashboardIcon size={size} color={color} />
                <View style={tabStyles.button} />
              </View>
            ) : (
              <DashboardIcon size={size} color={color} />
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
                <OrderIcon size={size} color={color} />
                <View style={tabStyles.button} />
              </View>
            ) : (
              <OrderIcon size={size} color={color} />
            ),
        }}>
        {props => <Orders colors={colors} {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name={Routes.PRODUCTS}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <View style={tabStyles.box}>
                <ProductIcon size={size} color={color} />
                <View style={tabStyles.button} />
              </View>
            ) : (
              <ProductIcon size={size} color={color} />
            ),
        }}>
        {props => <Product {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name={Routes.SOCIALPROFILE}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <View style={tabStyles.box}>
                <SocialIcon size={size} color={color} />
                <View style={tabStyles.button} />
              </View>
            ) : (
              <SocialIcon size={size} color={color} />
            ),
        }}
        component={SOCIALMEDIA}
      />
      <Tab.Screen
        name={Routes.SETTINGS}
        options={{
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <View style={tabStyles.box}>
                <SettingIcon size={size} color={color} />
                <View style={tabStyles.button} />
              </View>
            ) : (
              <SettingIcon size={size} color={color} />
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
          {props => <Workspaces {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name={Routes.NOTIFICATIONS}
          headerMode="screen"
          options={({navigation}) => ({
            headerShown: false,
            ...StackCommonHeaderOptions(navigation, false, true, colors),
          })}>
          {props => <Notifications {...props} />}
        </Stack.Screen>
        <Stack.Screen name={Routes.WORKSPACE} options={{headerShown: false}}>
          {props => <DrawerNavigator {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
