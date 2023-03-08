/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {SetWorkspace} from '../../modules/workspace';
import {useQuery} from '@apollo/client';
import {Styles, Text} from '../../styles';
import {useSelector} from 'react-redux';
import Wrapper from '../../components/Wrapper';
import {Dark, Light} from '../../utils/imagesPath';
import CustomHeader from '../../components/CustomHeader';
import {GET_NOTIFICATION_UPDATES} from '../../graphql';
import {deviceHeight, getFixedHeaderHeight} from '../../utils/orientation';
import {WarningIcon} from '../../icons';
import NotitficationListItem from '../../components/NotificationListItem';
import Loader from '../../components/Loader';
import {
  redirectToScreen,
  setMarkAsRead,
  setMarkAsReadAll,
  setNotificationsData,
  setUnReadToggle,
  defaultValue,
  pageLimit,
  setOnRefresh,
  setLoadMore,
} from './helper';
import {FONT_FAMILY, Routes} from '../../utils/constants';
import ToggleSwitch from '../../components/Switch';
import styles from '../../styles/style';

const Notifications = ({navigation}) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const theme = useSelector(state => state.themeChange.theme);
  const [refresh, setRefresh] = useState(false);
  const workspace = useSelector(state => state.workspace.workspace);
  const userId = useSelector(state => state.user.userId);
  const [notifications, setNotifications] = useState(defaultValue);
  const {data, loading} = useQuery(GET_NOTIFICATION_UPDATES, {
    fetchPolicy: 'no-cache',
    variables: {
      userId: userId ? userId.toString() : '',
      limit: pageLimit.toString(),
    },
    pollInterval: 3000,
  });
  useEffect(() => {
    setNotificationsData(data, setNotifications);
  }, [data]);
  const onRefresh = useCallback(() => {
    setOnRefresh(setRefresh, userId, setNotifications);
  }, [userId]);
  const markAsRead = item => {
    setMarkAsRead(item, setNotifications);
  };
  const markAsReadAll = useCallback(() => {
    setMarkAsReadAll(userId, setNotifications);
  }, [userId]);
  const unReadToggle = useCallback(val => {
    setUnReadToggle(setNotifications);
  }, []);
  const navigateTo = useCallback(
    (item, screen) => {
      dispatch(SetWorkspace(item));
      navigation.navigate(Routes.WORKSPACE, screen);
    },
    [dispatch, navigation],
  );
  const onPress = useCallback(
    item => {
      redirectToScreen(item, workspace, setNotifications, navigateTo);
    },
    [navigateTo, workspace],
  );
  const loadMore = useCallback(() => {
    setLoadMore(notifications, userId, setNotifications);
  }, [notifications, userId]);
  const renderFooter = useCallback(() => {
    if (!notifications.loadMoreLoading) {
      return null;
    }
    return (
      <View
        style={[
          {
            ...Styles.w100,
            ...Styles.justifyContentCenter,
            ...Styles.flexCenter,
            ...Styles.alignItemsCenter,
            height: 80,
          },
        ]}>
        <Loader />
      </View>
    );
  }, [notifications.loadMoreLoading]);
  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={Styles.flex}>
        <CustomHeader
          name={t('notifications')}
          navigation={navigation}
          backIcon={true}
          drawer={false}
        />

        {/* <CheckBox value={false} onValueChange={newValue => markAsReadAll} /> */}
        <View
          style={[
            Styles.mV10,
            Styles.pL10,
            Styles.pR10,
            Styles.flexDirectionRow,
            Styles.alignItemsCenter,
            Styles.justifyContentSpaceBetween,
          ]}>
          <View style={[Styles.flexDirectionRow, Styles.alignItemsCenter]}>
            <TouchableOpacity onPress={markAsReadAll}>
              <Text
                size={12}
                fontFamily={FONT_FAMILY.BOLD}
                color={colors.fontPrimary}>
                Read All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[Styles.flexDirectionRow, Styles.alignItemsCenter]}>
            <Text size={12} style={Styles.pR10}>
              Only show unread
            </Text>
            <ToggleSwitch
              value={!notifications.showAll}
              onChange={unReadToggle}
            />
          </View>
        </View>
        {loading ? (
          <View style={[Styles.w100, Styles.h100, Styles.Centered]}>
            {loading && <Loader />}
          </View>
        ) : (
          <FlatList
            data={notifications.record}
            nestedScrollEnabled={true}
            removeClippedSubviews={true}
            maxToRenderPerBatch={40}
            initialNumToRender={40}
            contentContainerStyle={[Styles.pB30]}
            keyExtractor={item => item._id.toString()}
            onEndReached={loadMore}
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
                colors={[colors.background]}
                tintColor={colors.themeIcon}
              />
            }
            swipeThreshold={0.01}
            onEndReachedThreshold={0.01}
            ListEmptyComponent={() =>
              !loading && notifications.data.length === 0 ? (
                <View
                  style={[
                    Styles.flexCenter,
                    {
                      height: (deviceHeight - getFixedHeaderHeight() - 40) / 2,
                    },
                  ]}>
                  <WarningIcon
                    color={colors.textColorLight}
                    size={40}
                    style={Styles.pB10}
                  />
                  <Text
                    numberOfLines={1}
                    color={colors.textColorLight}
                    size={16}>
                    {t('notifications.not.available')}
                  </Text>
                </View>
              ) : null
            }
            renderItem={({item, index}) => {
              return (
                <NotitficationListItem
                  key={item._id}
                  item={item}
                  onPress={onPress}
                  markAsRead={markAsRead}
                />
              );
            }}
          />
        )}
      </View>
      {notifications.loading && (
        <View style={Styles.backDropLoader}>
          <Loader color={colors.white} />
        </View>
      )}
    </Wrapper>
  );
};

export default Notifications;
