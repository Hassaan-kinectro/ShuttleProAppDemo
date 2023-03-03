/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, {useRef} from 'react';
import CustomHeader from '../../../components/CustomHeader';
import {useSelector} from 'react-redux';
import {Dark, Light} from '../../../utils/imagesPath';
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
import {CloseIcon} from '../../../icons';
import {showMessage} from 'react-native-flash-message';

const defaultValue = {id: null, loading: false};
const headerHeight = 32 * 2;

const ShowStory = props => {
  const {navigation, route} = props;
  const Profile = route && route.params && route.params.profile;
  const currentProfile = route && route.params && route.params.currentProfile;
  const styles = useStyles();
  const {colors} = useTheme();
  const name = 'Stories';
  const Styles = GlobalStyle();
  const theme = useSelector(state => state.themeChange.theme);
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const workspaceIcon = useSelector(
    state =>
      state &&
      state.workspace &&
      state.workspace.workspace &&
      state.workspace.workspace.workspace &&
      state.workspace.workspace.workspace.icon &&
      state.workspace.workspace.workspace.icon.thumb &&
      state.workspace.workspace.workspace.icon.thumb.url,
  );
  console.log(workspaceIcon, 'this is workspace icons');
  const userId = useSelector(
    state => state && state.user && state.user.user && state.user.user.id,
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

  // React.useEffect(() => {
  //   if (route.params && route.params.refresh) {
  //     setRefresh(route.params.refresh);
  //     onRefresh();
  //   }
  // }, [route.params]);

  const handleDelete = async (id, setIsDeleting) => {
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
          description: 'Publish Rejected Successfully',
          type: 'success',
        });
      } else {
        showMessage({
          message: res.message,
          description: 'Not Rejected',
          type: 'DANGER',
        });
        setIsDeleting(false);
      }
    });
  };

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

  const ok = previewHelper2(
    Stories,
    currentProfile ? currentProfile : Profile,
    userId,
    workspaceIcon,
  );
  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={styles.Wrapper}>
        <CustomHeader name={name} navigation={navigation} />
        {loading ? (
          <View style={[Styles.Centered]}>{loading && <Loader />}</View>
        ) : (
          <>
            <InstaStory
              data={ok}
              duration={5}
              onStart={item => console.log(item)}
              unPressedBorderColor={'#54788c'}
              pressedBorderColor={'transparent'}
              onClose={item => console.log('close: ', item)}
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
                marginTop: 20,
                marginHorizontal: 10,
              }}
              showAvatarText={true}
              horizontal={false}
              resizeMode="contain"
              avatarTextStyle={{color: '#fff'}}
              customItemComponent={(i, index, handleStoryItemPress) => {
                console.log(i, 'this is i');
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
                        onPress={() => handleStoryItemPress(i)}
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
                      </TouchableOpacity>
                      <TouchableOpacity style={{flex: 4}}>
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
                      <View style={{}}>
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
                        borderColor: colors.boxBorderColor,
                        borderWidth: 1,
                        marginHorizontal: 10,
                      }}
                    />
                  </>
                );
              }}
            />
          </>
        )}
      </View>
    </Wrapper>
  );
};

export default ShowStory;
