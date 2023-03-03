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
  Platform,
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
import {previewHelper} from './helper';
import InstaStory from 'react-native-insta-story';
import {FONT_FAMILY} from '../../utils/constants';
import {IS_IOS, deviceHeight, deviceWidth} from '../../utils/orientation';

const StoryList = ({publishedStories, currentProfile, setPublishedStories}) => {
  const [modalVisible, setModalVisible] = React.useState({
    data: null,
    open: false,
  });
  const [data, setData] = React.useState([]);
  const navigation = useNavigation();

  const {colors} = useTheme();
  const [tapped, setTapped] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const styles = useStyles();
  const workspace = useSelector(state => state.workspace.workspace);
  const userId = useSelector(
    state => state && state.user && state.user.user && state.user.user.id,
  );

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

  const ok = previewHelper(currentProfile, publishedStories, userId);
  console.log(ok, 'this is ok for published stories');
  return (
    <View>
      <View style={[Styles.flexDirectionRow]}>
        <TouchableOpacity
          style={styles.CreateprofileIcon}
          onPress={() => {
            navigation.navigate(Routes.SHOWSTORY, {
              currentProfile: currentProfile,
            });
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
        <View style={{width: deviceWidth - 130}}>
          <InstaStory
            data={ok && ok.length > 0 ? ok : []}
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
            showAvatarText={false}
            horizontal={true}
            resizeMode="contain"
            avatarSize={48}
            style={{
              // bottom: 7,
              backgroundColor: 'red',
            }}
          />
        </View>
      </View>
      <View style={styles.hairline2} />
    </View>
  );
};

export default StoryList;
