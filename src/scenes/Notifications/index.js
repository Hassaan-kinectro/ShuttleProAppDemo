import React, {useState, useEffect} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
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
const Notifications = ({navigation}) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const theme = useSelector(state => state.themeChange.theme);
  const [refresh, setRefresh] = useState(false);
  const workspaceId = useSelector(state => state.workspace.workspaceId);
  const [notifications, setNotifications] = useState({
    count: 0,
    data: [],
  });
  const {data, loading} = useQuery(GET_NOTIFICATION_UPDATES, {
    fetchPolicy: 'no-cache',
    variables: {workspaceId: workspaceId ? workspaceId.toString() : ''},
    // pollInterval: 3000,
  });
  useEffect(() => {
    if (
      data &&
      data.getAllNotificationUpdates &&
      data.getAllNotificationUpdates.length > 0
    ) {
      const count = data.getAllNotificationUpdates.reduce(
        (prev, n) => (!n.isRead ? prev + 1 : prev),
        0,
      );
      setNotifications({
        count: count,
        data: data.getAllNotificationUpdates.filter(d => !d.isRead),
      });
    }
  }, [data]);
  const onRefresh = setRefresh => {};

  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={Styles.flex}>
        <CustomHeader
          name={t('notifications')}
          navigation={navigation}
          backIcon={true}
          drawer={false}
        />
        {loading ? (
          <View style={[Styles.w100, Styles.h100, Styles.Centered]}>
            {loading && <Loader />}
          </View>
        ) : (
          <FlatList
            data={notifications.data}
            nestedScrollEnabled={true}
            removeClippedSubviews={true}
            maxToRenderPerBatch={40}
            initialNumToRender={40}
            contentContainerStyle={Styles.pT10}
            keyExtractor={item => item._id.toString()}
            //   ListHeaderComponent={() => (
            //     <Tabs
            //       filterValues={filterValues}
            //       setFilterValues={setFilterValues}
            //     />
            //   )}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => onRefresh(setRefresh)}
                colors={[colors.background]}
                tintColor={colors.themeIcon}
              />
            }
            onEndReachedThreshold={0.5}
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
              return <NotitficationListItem key={item._id} item={item} />;
            }}
          />
        )}
      </View>
    </Wrapper>
  );
};

export default Notifications;
