/* eslint-disable react-native/no-inline-styles */
import {Text, View, FlatList} from 'react-native';
import React from 'react';
import {defaultPosts, setInstagramPosts, fetchNextInstPosts} from '../helper';
import {GET_INSTAGRAM_ALL_POSTS} from '../../../graphql';
import {useQuery} from '@apollo/client';
import SinglePost from '../SinglePost';
import {GlobalStyle} from '../../../styles';
import {
  IS_IOS,
  deviceHeight,
  getFixedHeaderHeight,
} from '../../../utils/orientation';
import Loader from '../../../components/Loader';
import useStyles from '../styles';
import AIcon from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import ShuttlePost from '../ShuttlePost';
const Instagram = ({currentProfile, users}) => {
  const {access_token, page_id, workspace_id, profile_type, name, page_icon} =
    currentProfile;
  const Styles = GlobalStyle();
  const styles = useStyles();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const headerHeight = 32 * 2;
  const [posts, setPosts] = React.useState(defaultPosts);
  const [loadmore, setLoadmore] = React.useState(false);
  const {data, loading, refetch} = useQuery(GET_INSTAGRAM_ALL_POSTS, {
    fetchPolicy: 'no-cache',
    variables: {
      workspaceId: workspace_id,
      pageId: page_id,
      accessToken: access_token,
    },
    pollInterval: 5000,
  });

  React.useEffect(() => {
    setInstagramPosts(data, setPosts);
  }, [data]);

  const fetchMoreData = React.useCallback(async () => {
    setLoadmore(true);
    fetchNextInstPosts(posts.next, setPosts, workspace_id, page_id);
    setLoadmore(false);
  }, [page_id, posts.next, workspace_id]);

  const renderFooter = () => {
    if (!loadmore) {
      return null;
    }
    return (
      <View style={[]}>
        <Loader />
      </View>
    );
  };

  return (
    <>
      {loading ? (
        <View style={{marginBottom: deviceHeight - 600}}>
          {loading && <Loader />}
        </View>
      ) : (
        <FlatList
          data={posts && posts.data && posts.data.length > 0 ? posts.data : []}
          extraData={loading}
          nestedScrollEnabled={true}
          removeClippedSubviews={true}
          maxToRenderPerBatch={40}
          initialNumToRender={40}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: IS_IOS ? 180 : 120,
          }}
          keyExtractor={(item, index) => `${index}`}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refresh}
          //     onRefresh={() =>
          //       onRefresh(setRefresh, GetWorkSpaceUser, setWorkspaceList)
          //     }
          //     colors={[colors.background]}
          //     tintColor={colors.themeIcon}
          //   />
          // }
          onEndReachedThreshold={0.5}
          onEndReached={fetchMoreData}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={() =>
            !loading && posts && posts.data && posts.data.length === 0 ? (
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
                <Text numberOfLines={1} color={colors.textColorLight} size={16}>
                  {t('social.profiles.not.available')}
                </Text>
              </View>
            ) : null
          }
          renderItem={({item, index}) => {
            return (
              <>
                {item.workspaceId ? (
                  <>
                    <ShuttlePost
                      post={item}
                      name={name}
                      users={users}
                      pageIcon={page_icon && page_icon.url ? page_icon.url : ''}
                      profileType={profile_type}
                      setPosts={setPosts}
                      currentProfile={currentProfile}
                      refetch={refetch}
                    />
                    <View style={styles.hairline} />
                  </>
                ) : (
                  <>
                    <SinglePost
                      key={item.id}
                      post={item}
                      name={name}
                      pageIcon={page_icon}
                      profileType={profile_type}
                    />
                    <View style={styles.hairline} />
                  </>
                )}
              </>
            );
          }}
        />
      )}
    </>
  );
};

export default Instagram;
