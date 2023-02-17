/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Text,
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
import Form from './form';
import Story from './story';
import CreateStory from '../../scenes/SocialMedia/CreateStory';

const StoryList = ({
  publishedStories,
  open,
  loading,
  closeModal,
  currentProfile,
}) => {
  const [modalVisible, setModalVisible] = React.useState({
    data: null,
    open: false,
  });
  const navigation = useNavigation();

  const {colors} = useTheme();
  const [tapped, setTapped] = React.useState(false);
  const styles = useStyles();
  const workspaceIcon = useSelector(
    state => state.workspace.workspace.workspace.icon.thumb.url,
  );
  const workspaceName = useSelector(
    state => state.workspace.workspace.workspace.name,
  );

  return (
    <>
      <View
        style={{
          borderColor: colors.boxBorderColor,
        }}>
        <FlatList
          data={publishedStories && publishedStories}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.CreateprofileIcon}
                onPress={() => {
                  navigation.navigate(Routes.SHOWSTORY);
                }}>
                <CircularImage
                  img={workspaceIcon}
                  name={workspaceName}
                  style={styles.HeaderImage}
                />
                <F5Icon
                  name="th-list"
                  size={15}
                  color={colors.button}
                  style={styles.active3}
                />
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
            <React.Fragment key={item.id}>
              return (
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
                      style={[
                        styles.userImage,
                        // {
                        //   borderColor: tapped ? '#D8ECFF' : '#2B7C84',
                        //   borderWidth: 3,
                        // },
                      ]}
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
                      style={[
                        styles.userImage,
                        // {
                        //   borderColor: tapped ? '#D8ECFF' : '#2B7C84',
                        //   borderWidth: 3,
                        // },
                      ]}
                    />
                    <Image source={FACEBOOK} style={styles.active2} />
                  </>
                )}
              </TouchableOpacity>
              );
            </React.Fragment>;
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
          <Swiper autoplay={true} showsPagination={true}>
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
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible({data: null, open: false})}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    </>
  );
};

export default StoryList;
