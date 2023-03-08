/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  View,
  RefreshControl,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import CustomHeader from '../../../components/CustomHeader';
import {useSelector} from 'react-redux';
import {Dark, Light, FACEBOOK, INSTAGRAM} from '../../../utils/imagesPath';
import Wrapper from '../../../components/Wrapper';
import useStyles from '../styles';
import StoryRow from '../../../components/Story/storyRow';
import {IS_IOS} from '../../../utils/orientation';
import {getStories, onRefresh} from './helper';
import Loader from '../../../components/Loader';
import {GlobalStyle, Text} from '../../../styles';
import {useTheme} from '@react-navigation/native';
import {DeleteStoryById} from '../../../services/Stories';
import _ from 'lodash';
import {previewHelper2} from '../../../components/Story/helper';
import InstaStory from 'react-native-insta-story';
import {FONT_FAMILY} from '../../../utils/constants';
import {CloseIcon, WarningIcon} from '../../../icons';
import {showMessage} from 'react-native-flash-message';

const defaultValue = {id: null, loading: false};
const headerHeight = 32 * 2;

const ShowStory = props => {
  const {navigation, route} = props;
  const Profile = route && route.params && route.params.profile;
  const currentProfile = route && route.params && route.params.currentProfile;
  const openId = (route && route.params && route.params.openId) || '';
  const styles = useStyles();
  const {colors} = useTheme();
  const name = 'Stories';
  const Styles = GlobalStyle();
  const theme = useSelector(state => state.themeChange.theme);
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const workspace = useSelector(state => state.workspace.workspace);
  const workspaceIcon =
    workspace && workspace.workspace && workspace.workspace.icon
      ? workspace.workspace.icon.thumb.url
      : null;
  const workspaceName =
    workspace && workspace.workspace && workspace.workspace.name
      ? workspace.workspace.name
      : null;
  const userId = useSelector(
    state => state && state.user && state.user.user && state.user.user.id,
  );
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState(openId);
  const [loadingImages, setLoadingImages] = React.useState(defaultValue);
  const [publishedStories, setPublishedStories] = React.useState([]);
  const [unPublishedStories, setUnPublishedStories] = React.useState([]);

  React.useEffect(() => {
    getStories(
      setLoading,
      setUnPublishedStories,
      setPublishedStories,
      currentProfile.page_id,
      selected,
    );
    return () => {
      setPublishedStories([]);
      setUnPublishedStories([]);
      setLoading(false);
      setLoadingImages(defaultValue);
    };
  }, [selected]);
  React.useEffect(() => {
    if (openId) {
      setSelected(openId);
    }
  }, [openId]);

  const handleDelete = useCallback(
    async (id, setIsDeleting) => {
      setIsDeleting(true);
      await DeleteStoryById(id).then(res => {
        if (res.status === 200) {
          setUnPublishedStories(
            unPublishedStories.filter(record => record.id !== id),
          );
          setPublishedStories(
            publishedStories.filter(record => record.id !== id),
          );
          setIsDeleting(false);
          showMessage({
            message: res.message,
            description: 'Story Deleted Successfully',
            type: 'success',
          });
        } else {
          showMessage({
            message: res.message,
            description: 'Failed',
            type: 'DANGER',
          });
          setIsDeleting(false);
        }
      });
    },
    [unPublishedStories, unPublishedStories],
  );

  const sorted = _.sortBy(unPublishedStories, function (dateObj) {
    const date = new Date(dateObj.shareAt);
    return date;
  });

  const Stories = [
    ..._.sortBy(unPublishedStories, function (dateObj) {
      const date = new Date(dateObj?.shareAt);
      return date;
    })?.reverse(),
    ..._.sortBy(publishedStories, function (dateObj) {
      const date = new Date(dateObj?.shareAt);
      return date;
    })?.reverse(),
  ];

  const stories = previewHelper2(
    Stories,
    currentProfile ? currentProfile : Profile,
    userId,
    workspaceIcon,
    workspaceName,
  );
  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={styles.Wrapper}>
        <CustomHeader name={name} navigation={navigation} />
        {loading ? (
          <View style={[Styles.Centered]}>{loading && <Loader />}</View>
        ) : !loading && stories && stories.length > 0 ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                key={stories.length}
                refreshing={refresh}
                onRefresh={() =>
                  onRefresh(
                    setRefresh,
                    setUnPublishedStories,
                    setPublishedStories,
                    currentProfile.page_id,
                    selected,
                  )
                }
                colors={[colors.background]}
                tintColor={colors.themeIcon}
              />
            }>
            {selected && (
              <View
                style={[
                  Styles.flexCenterEnd,
                  Styles.alignItemsEnd,
                  Styles.pV5,
                  Styles.pR10,
                ]}>
                <TouchableOpacity
                  style={[
                    Styles.flexDirectionRow,
                    Styles.alignItemsCenter,
                    {
                      backgroundColor: colors.tabColor,
                      borderRadius: 5,
                      padding: 6,
                      paddingLeft: 10,
                    },
                  ]}
                  onPress={() => setSelected('')}>
                  <Text size={12}>{selected.substr(0, 10)}...</Text>
                  <CloseIcon
                    size={18}
                    color={colors.fontPrimary}
                    style={Styles.pL10}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View key={Math.random().toString(36).slice(2)}>
              <InstaStory
                data={stories}
                duration={5}
                // onStart={item => console.log(item)}
                unPressedBorderColor={'#54788c'}
                pressedBorderColor={'transparent'}
                // onClose={item => console.log('close: ', item)}
                customSwipeUpComponent={
                  <View>
                    <Text />
                  </View>
                }
                customCloseComponent={
                  <CloseIcon size={24} color={colors.TextColor} />
                }
                style={{
                  flex: 1,
                  marginBottom: IS_IOS ? 100 : 150,
                  marginTop: 0,
                  marginHorizontal: 10,
                }}
                showAvatarText={true}
                horizontal={false}
                resizeMode="contain"
                avatarTextStyle={{color: '#fff'}}
                customItemComponent={(i, index, handleStoryItemPress) => {
                  return (
                    <>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: 'row',
                          marginVertical: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => handleStoryItemPress(i, index)}
                          style={{flex: 1}}>
                          <Image
                            style={styles.avatar}
                            source={{uri: i.user_image}}
                            defaultSource={
                              Platform.OS === 'ios'
                                ? './assets/images/no_avatar.png'
                                : null
                            }
                          />
                          {i && i.item && i.item.type === 'facebook' ? (
                            <Image source={FACEBOOK} style={styles.active2} />
                          ) : (
                            <Image source={INSTAGRAM} style={styles.active2} />
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{flex: 4}}
                          onPress={() => handleStoryItemPress(i, index)}>
                          <>
                            <Text
                              size={12}
                              color={colors.TextColor}
                              fontFamily={FONT_FAMILY.REGULAR}
                              numberOfLines={1}
                              ellipsizeMode={'tail'}>
                              {i.user_name}
                            </Text>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode={'tail'}
                              size={12}
                              color={colors.TextColor}
                              style={{marginTop: 10}}
                              fontFamily={FONT_FAMILY.REGULAR}>
                              {i.date}
                            </Text>
                          </>
                        </TouchableOpacity>
                        <View>
                          <StoryRow
                            currentProfile={
                              currentProfile ? currentProfile : Profile
                            }
                            navigation={navigation}
                            handleDelete={handleDelete}
                            item={i && i.item}
                            loading={loadingImages.loading}
                            setLoadingImages={setLoadingImages}
                            disabled={
                              loadingImages.id
                                ? loadingImages.id !== i && i.item && i.item.id
                                : false
                            }
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          height: 1,
                          backgroundColor: colors.boxBorderColor,
                          marginHorizontal: 10,
                        }}
                      />
                    </>
                  );
                }}
              />
            </View>
          </ScrollView>
        ) : (
          <View style={[Styles.flexCenter]}>
            <WarningIcon color={colors.textColorLight} size={40} />
            <Text
              numberOfLines={1}
              color={colors.textColorLight}
              size={16}
              style={{marginTop: 10}}>
              No Stories Available
            </Text>
          </View>
        )}
      </View>
    </Wrapper>
  );
};

export default ShowStory;
