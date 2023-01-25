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
import {Colors, GlobalStyle, Mixins, Spinner, Text} from '../../styles';
import {
  deviceHeight,
  deviceWidth,
  getFixedHeaderHeight,
} from '../../utils/orientation';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import AIcon from 'react-native-vector-icons/AntDesign';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {GetWorkSpaceUser} from '../../services/Workspace';
import WorkspaceListItem from '../../components/WorkspaceListItem';
import Wrapper from '../../components/Wrapper';
import {
  Dark,
  Light,
  HeaderBG,
  HeaderDark,
  HeaderLight,
} from '../../utils/imagesPath';
const Workspace = props => {
  const [workspaceList, setWorkspaceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {workspace, setWorkspaces, route} = props;
  const theme = useSelector(state => state.themeChange.theme);
  const {colors} = useTheme();
  const styles = useStyles();
  const Styles = GlobalStyle();
  const {t} = useTranslation();

  useEffect(() => {
    getRecord();
    console.log('useEFFECT RANN');
  }, []);
  React.useEffect(() => {
    if (route.params && route.params.refresh) {
      console.log('route.params.refresh');
      setRefresh(route.params.refresh);
      onRefresh();
    }
  }, [route.params]);
  const getRecord = () => {
    setLoading(true);
    GetWorkSpaceUser()
      .then(res => {
        console.log(res, 'from workspace');
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
        console.log('from refresh');
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
          shadowColor: colors.background,
          shadowRadius: 1,
          shadowOpacity: 0.9,
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
          marginBottom: 15,
          borderColor: 'transparent',
          borderWidth: 0.5,
        }}>
        <ImageBackground source={theme === 'DARK' ? HeaderDark : HeaderLight}>
          <View
            style={{
              marginLeft: 21,
              marginTop: 70,
              marginBottom: 15,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                fontFamily: 'Raleway',
                color: colors.TextHeader,
              }}>
              Workspaces
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={(Styles.alignItemsCenter, Styles.flexCenter)}>
        <View style={{height: 20}} />
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
                colors={[colors.themeIcon]}
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
                    style={{
                      color: colors.textColorLight,
                      fontSize: Mixins.scaleFont(16),
                    }}>
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
