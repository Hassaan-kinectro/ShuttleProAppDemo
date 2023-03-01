/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  RefreshControl,
} from 'react-native';
import CircularImage from '../CircularImage';
import {useTheme} from '@react-navigation/native';
import {ADDSTORY, FACEBOOK, INSTAGRAM} from '../../utils/imagesPath';
import {useSelector} from 'react-redux';
import useStyles from './styles';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../utils/constants';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import {Styles} from '../../styles';
import {CloseIcon} from '../../icons';
import {Colors, Mixins} from '../../styles';
import {onRefresh} from '../../scenes/SocialMedia/PublishedStories/helper';

const StoryList = ({publishedStories, currentProfile, setPublishedStories}) => {
  const [modalVisible, setModalVisible] = React.useState({
    data: null,
    open: false,
  });
  const navigation = useNavigation();

  const {colors} = useTheme();
  const [tapped, setTapped] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const styles = useStyles();
  const workspace = useSelector(state => state.workspace.workspace);
  const workspaceIcon =
    workspace && workspace.workspace && workspace.workspace.icon
      ? workspace.workspace.icon.thumb.url
      : null;
  const workspaceName =
    workspace && workspace.workspace && workspace.workspace.name
      ? workspace.workspace.name
      : null;
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const profileType = currentProfile && currentProfile.profile_type;

  return (
    <>
      <View>
        <FlatList
          data={publishedStories && publishedStories}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() =>
                onRefresh(
                  setRefresh,
                  setPublishedStories,
                  profileType,
                  workspaceId,
                )
              }
              colors={[colors.background]}
              tintColor={colors.themeIcon}
            />
          }
          contentContainerStyle={Styles.pL10}
          ListHeaderComponent={() => (
            <View style={[Styles.flexDirectionRow]}>
              <TouchableOpacity
                style={styles.CreateprofileIcon}
                onPress={() => {
                  navigation.navigate(Routes.SHOWSTORY);
                }}>
                <View style={styles.HeaderImage}>
                  <F5Icon
                    name="th-list"
                    size={16}
                    color={colors.fontPrimary}
                    style={Styles.textCenter}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CreateprofileIcon}
                onPress={() => {
                  navigation.navigate(Routes.CREATESTORY, {
                    currentProfile: currentProfile,
                  });
                }}>
                <CircularImage
                  img={workspaceIcon}
                  name={workspaceName}
                  style={styles.HeaderImage}
                />
                <Image source={ADDSTORY} style={styles.active3} />
              </TouchableOpacity>
            </View>
          )}
          renderItem={({item}) => {
            return (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={styles.profileIcon2}
                  onPress={() => {
                    setModalVisible({data: item, open: true});
                    setTapped(true);
                  }}>
                  {item && item.type === 'instagram' && (
                    <>
                      <CircularImage
                        img={
                          item && item.pagelogo ? item.pagelogo : item.pageicon
                        }
                        name={item.pageName}
                        style={[styles.userImage]}
                      />
                      <Image source={INSTAGRAM} style={styles.active2} />
                    </>
                  )}
                  {item && item.type === 'facebook' && (
                    <>
                      <CircularImage
                        img={
                          item && item.pagelogo ? item.pagelogo : item.pageicon
                        }
                        name={item.pageName}
                        style={[styles.userImage]}
                      />
                      <Image source={FACEBOOK} style={styles.active2} />
                    </>
                  )}
                </TouchableOpacity>
              </React.Fragment>
            );
          }}
        />
      </View>
      <View style={styles.hairline2} />
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={false}
          style={{backgroundColor: colors.background}}
          visible={modalVisible.open}>
          <Swiper showsPagination={true}>
            {modalVisible.data &&
              modalVisible.data.images &&
              modalVisible.data.images.length > 0 &&
              modalVisible.data.images.map((image, index) => {
                return (
                  <View key={index} style={styles.slide}>
                    <FastImage
                      style={styles.image2}
                      source={{
                        uri: image,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                );
              })}
          </Swiper>
          <View style={styles.containerModal}>
            <View style={Styles.flexCenter}>
              <CircularImage
                img={
                  currentProfile &&
                  currentProfile.page_icon &&
                  currentProfile.page_icon.thumb &&
                  currentProfile.page_icon.thumb.url
                    ? currentProfile.page_icon.thumb.url
                    : currentProfile.page_icon.url
                }
                name={currentProfile.name}
                style={styles.HeaderImage5}
              />
            </View>
            <View style={Styles.flex2Start}>
              <View>
                <Text
                  lines={1}
                  size={Mixins.scaleFont(16)}
                  style={[styles.headerText]}>
                  {currentProfile && currentProfile.name}
                </Text>
                <Text
                  lines={1}
                  size={Mixins.scaleFont(5)}
                  style={[styles.headerText2, {marginLeft: 10, width: 250}]}>
                  (Published)
                </Text>
              </View>
            </View>
            <View style={Styles.flex3End}>
              <TouchableOpacity
                onPress={() => setModalVisible({data: null, open: false})}>
                <CloseIcon size={30} color={Colors.WHISPER} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default StoryList;
