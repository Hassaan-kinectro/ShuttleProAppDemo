/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {View, FlatList, RefreshControl, ImageBackground} from 'react-native';
import {GlobalStyle, Text} from '../../styles';
import {deviceHeight, getFixedHeaderHeight} from '../../utils/orientation';
import useStyles from './styles';
import {AppLogout} from '../../navigations';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import AIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {GetWorkSpaceUser} from '../../services/Workspace';
import WorkspaceListItem from '../../components/WorkspaceListItem';
import Wrapper from '../../components/Wrapper';
import {Dark, Light, HeaderDark, HeaderLight} from '../../utils/imagesPath';
import {FONT_FAMILY} from '../../utils/constants';
import {onRefresh, getRecord} from './helper';
import Loader from '../../components/Loader';
import RawText from '../../styles/text';

const Workspace = props => {
  const [auth, setAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [organization_id, setOrganization_id] = useState(null);
  const [workspaceList, setWorkspaceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {route, navigation} = props;
  const theme = useSelector(state => state.themeChange.theme);
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const Styles = GlobalStyle();
  const {t} = useTranslation();
  useEffect(() => {
    getRecord(setLoading, GetWorkSpaceUser, setWorkspaceList);
    return () => {
      setWorkspaceList([]);
    };
  }, []);
  React.useEffect(() => {
    if (route.params && route.params.refresh) {
      setRefresh(route.params.refresh);
      onRefresh();
    }
  }, [route.params]);

  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={styles.wrapperStyle}>
        <ImageBackground source={theme === 'DARK' ? HeaderDark : HeaderLight}>
          <View style={styles.container}>
            <RawText
              children={t('workspaces')}
              size={24}
              color={colors.TextHeader}
              fontFamily={FONT_FAMILY.SEMI_BOLD}
            />
            <MaterialIcons
              name="logout"
              color={colors.TextColor}
              size={25}
              style={styles.pR}
              onPress={() =>
                AppLogout(
                  navigation,
                  setAuth,
                  setUserId,
                  setUserName,
                  setUserRole,
                  setOrganization_id,
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
          Styles.flatList,
          styles.innerContainer,
        ]}>
        <View style={styles.h10} />
        {loading ? (
          <View style={[Styles.w100, Styles.h100, Styles.Centered]}>
            {loading && <Loader />}
          </View>
        ) : (
          <FlatList
            data={workspaceList}
            extraData={loading}
            nestedScrollEnabled={true}
            removeClippedSubviews={true}
            maxToRenderPerBatch={40}
            initialNumToRender={40}
            keyExtractor={(item, index) => `${index}`}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() =>
                  onRefresh(setRefresh, GetWorkSpaceUser, setWorkspaceList)
                }
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
                    style={styles.pB10}
                  />
                  <RawText
                    children={t('workspaces.not.available')}
                    size={16}
                    lines={1}
                    color={colors.textColorLight}
                  />
                </View>
              ) : null
            }
            renderItem={({item}) => {
              return (
                <WorkspaceListItem
                  item={item}
                  key={item.id}
                  navigation={props.navigation}
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
