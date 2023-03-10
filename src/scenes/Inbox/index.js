/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  View,
  RefreshControl,
  Text,
  FlatList,
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {useRef} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {useSelector} from 'react-redux';
import {Dark, Light} from '../../utils/imagesPath';
import Wrapper from '../../components/Wrapper';
import useStyles from './styles';
import StoryRow from '../../components/Story/storyRow';
import {
  deviceHeight,
  deviceWidth,
  getFixedHeaderHeight,
  IS_IOS,
} from '../../utils/orientation';
import {getStories, onRefresh} from './helper';
import Loader from '../../components/Loader';
import {GlobalStyle} from '../../styles';
import AIcon from 'react-native-vector-icons/AntDesign';
import {useTheme} from '@react-navigation/native';
import StoryList from '../../components/Story/storyContainer';
import {DeleteStoryById} from '../../services/Stories';

const defaultValue = {id: null, loading: false};
const headerHeight = 32 * 2;

const Inbox = props => {
  const {navigation, route} = props;
  const styles = useStyles();
  const {colors} = useTheme();
  const name = 'Stories';
  const Styles = GlobalStyle();
  const theme = useSelector(state => state.themeChange.theme);
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingImages, setLoadingImages] = React.useState(defaultValue);
  const [publishedStories, setPublishedStories] = React.useState([]);
  const [unPublishedStories, setUnPublishedStories] = React.useState([]);

  React.useEffect(() => {
    getStories(
      setLoading,
      setUnPublishedStories,
      setPublishedStories,
      workspaceId,
    );
    return () => {
      setPublishedStories([]);
      setUnPublishedStories([]);
      setLoading(false);
      setLoadingImages(defaultValue);
    };
  }, []);

  React.useEffect(() => {
    if (route.params && route.params.refresh) {
      setRefresh(route.params.refresh);
      onRefresh();
    }
  }, [route.params]);

  const handleDelete = async (id, setIsDeleting) => {
    setIsDeleting(true);
    await DeleteStoryById(id).then(res => {
      if (res.status === 200) {
        setUnPublishedStories(
          unPublishedStories.filter(record => record.id !== id),
        );
        setIsDeleting(false);
      } else {
        setIsDeleting(false);
      }
    });
  };

  return (
    <>
      <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
        <View style={styles.Wrapper}>
          <CustomHeader name={name} navigation={navigation} />
          <View style={[styles.header]}>
            <StoryList publishedStories={publishedStories} />
          </View>
          <View style={styles.hairline} />
          {loading ? (
            <View style={[Styles.Centered]}>{loading && <Loader />}</View>
          ) : (
            <FlatList
              data={[...unPublishedStories]}
              extraData={loading}
              scrollEventThrottle={16}
              nestedScrollEnabled={true}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: IS_IOS ? 180 : 180,

                paddingTop: headerHeight - 40,
              }}
              removeClippedSubviews={true}
              maxToRenderPerBatch={40}
              initialNumToRender={40}
              keyExtractor={(item, index) => `${index}`}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() =>
                    onRefresh(
                      setRefresh,
                      setUnPublishedStories,
                      setPublishedStories,
                      workspaceId,
                    )
                  }
                  colors={[colors.background]}
                  tintColor={colors.themeIcon}
                />
              }
              onEndReachedThreshold={0.5}
              ListEmptyComponent={() =>
                !loading && unPublishedStories.length === 0 ? (
                  <View
                    style={[
                      {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height:
                          (deviceHeight - getFixedHeaderHeight() - 40) / 2,
                      },
                    ]}>
                    <AIcon
                      name="warning"
                      color={colors.textColorLight}
                      size={40}
                      style={styles.pB10}
                    />
                    <Text
                      numberOfLines={1}
                      color={colors.textColorLight}
                      size={16}>
                      <Text style={styles.text}>No Pending Stories </Text>
                    </Text>
                  </View>
                ) : null
              }
              renderItem={({item}) => {
                return (
                  <React.Fragment key={item.id}>
                    <StoryRow
                      handleDelete={handleDelete}
                      item={item}
                      loading={loadingImages.loading}
                      setLoadingImages={setLoadingImages}
                      disabled={
                        loadingImages.id ? loadingImages.id !== item.id : false
                      }
                    />
                  </React.Fragment>
                );
              }}
            />
          )}
        </View>
      </Wrapper>
    </>
  );
};

export default Inbox;
