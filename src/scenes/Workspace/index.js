import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {Colors, GlobalStyle, Mixins, Text} from '../../styles';
import {StackActions} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  deviceHeight,
  IS_IOS,
  getFixedHeaderHeight,
} from '../../utils/orientation';
import {Logout} from '../../navigations';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import AIcon from 'react-native-vector-icons/AntDesign';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {GetWorkSpaceUser} from '../../services/Workspace';
import WorkspaceListItem from '../../components/WorkspaceListItem';
import Wrapper from '../../components/Wrapper';
import {UserContext} from '../../context/userContext';

import {
  Dark,
  Light,
  HeaderBG,
  HeaderDark,
  HeaderLight,
} from '../../utils/imagesPath';
import {FONT_FAMILY} from '../../utils/constants';
const Workspace = props => {
  const [workspaceList, setWorkspaceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {workspace, setWorkspaces, route, navigation} = props;
  const theme = useSelector(state => state.themeChange.theme);
  const {colors} = useTheme();
  const styles = useStyles();
  const Styles = GlobalStyle();
  const {t} = useTranslation();
  let context = React.useContext(UserContext);
  const {setAuth, setUserName, setOrganization_id, setUserRole, setUserId} =
    context;
  useEffect(() => {
    getRecord();
  }, []);
  React.useEffect(() => {
    if (route.params && route.params.refresh) {
      setRefresh(route.params.refresh);
      onRefresh();
    }
  }, [route.params]);
  const getRecord = () => {
    setLoading(true);
    GetWorkSpaceUser()
      .then(res => {
        if (res.status === 200 && res.data.length > 0) {
          setTimeout(() => {
            setWorkspaceList(res.data);
            setLoading(false);
          }, 300);
        } else {
          setTimeout(() => {
            setWorkspaceList([]);
            setLoading(false);
          }, 300);
        }
      })
      .catch(err => {
        setTimeout(() => {
          setWorkspaceList([]);
          setLoading(false);
        }, 300);
      });
  };
  const onRefresh = () => {
    setRefresh(true);
    GetWorkSpaceUser().then(res => {
      if (res.status === 200 && res.data.length > 0) {
        setRefresh(false);
        setWorkspaceList(res.data);
      } else {
        setRefresh(false);
      }
    });
  };
  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View
        style={{
          overflow: 'hidden',
          shadowRadius: 1,
          shadowOpacity: 50,
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
          marginBottom: 15,
          borderBottomWidth: 1,
          borderColor: colors.boxBorderColor,
          borderWidth: 0.5,
          shadowOffset: {width: 0, height: 15},
          elevation: 5,
        }}>
        <ImageBackground
          style={{
            shadowOffset: {width: 0, height: 0.2},
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          }}
          source={theme === 'DARK' ? HeaderDark : HeaderLight}>
          <View
            style={{
              marginLeft: 21,
              marginTop: 70,
              marginBottom: 15,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              height: IS_IOS ? 50 : 40,
            }}>
            <Text
              size={24}
              color={colors.TextHeader}
              fontFamily={FONT_FAMILY.SEMI_BOLD}>
              Workspaces
            </Text>
            <MaterialIcons
              name="logout"
              color={colors.TextColor}
              size={25}
              style={{paddingRight: 15}}
              onPress={() =>
                Logout(
                  navigation,
                  setAuth,
                  setUserName,
                  setOrganization_id,
                  setUserRole,
                  setUserId,
                )
              }
            />
          </View>
        </ImageBackground>
      </View>
      <View
        style={[
          Styles.alignItemsCenter,
          Styles.flexCenter,
          {
            shadowOffset: {width: 0, height: 0.2},
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
          },
        ]}>
        <View style={{height: 10}} />
        {loading ? (
          <View style={[Styles.w100, Styles.h100, Styles.Centered]}>
            {loading && (
              <ActivityIndicator
                type={'ThreeBounce'}
                size={30}
                color={colors.textColorLight}
              />
            )}
          </View>
        ) : (
          <FlatList
            data={workspaceList}
            nestedScrollEnabled={true}
            removeClippedSubviews={true}
            maxToRenderPerBatch={40}
            initialNumToRender={40}
            windowSize={1}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            extraData={loading}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
                colors={[colors.background]}
                tintColor={colors.themeIcon}
              />
            }
            onEndReachedThreshold={0.5}
            ListEmptyComponent={() =>
              !loading && workspaceList.length === 0 ? (
                <View
                  style={[
                    Styles.flexCenter,
                    {
                      height: (deviceHeight - getFixedHeaderHeight() - 40) / 2,
                    },
                  ]}>
                  <AIcon
                    name="warning"
                    color={colors.textColorLight}
                    size={40}
                    style={{paddingBottom: 10}}
                  />
                  <Text
                    numberOfLines={1}
                    color={colors.textColorLight}
                    size={16}>
                    Workspaces Not Available
                  </Text>
                </View>
              ) : null
            }
            renderItem={({item}) => {
              return (
                <WorkspaceListItem
                  item={item}
                  key={item.workspace.id}
                  navigation={props.navigation}
                  workspace={workspace}
                  setWorkspaces={setWorkspaces}
                />
              );
            }}
          />
        )}
      </View>
    </Wrapper>
  );
};
export default Workspace;
