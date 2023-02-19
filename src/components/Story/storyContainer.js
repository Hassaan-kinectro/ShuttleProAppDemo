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
import {Styles} from '../../styles';

const StoryList = ({publishedStories, currentProfile}) => {
  const [modalVisible, setModalVisible] = React.useState({
    data: null,
    open: false,
  });
  const navigation = useNavigation();

  const {colors} = useTheme();
  const [tapped, setTapped] = React.useState(false);
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

  return (
    <>
      <View>
        <FlatList
          data={publishedStories && publishedStories}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
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
