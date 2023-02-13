/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
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

const StoryList = ({publishedStories}) => {
  const [modalVisible, setModalVisible] = React.useState({
    data: null,
    open: false,
  });

  const {colors} = useTheme();
  const [tapped, setTapped] = React.useState(false);
  const workspaceIcon = useSelector(
    state => state.workspace.workspace.workspace.icon.thumb.url,
  );
  const workspaceName = useSelector(
    state => state.workspace.workspace.workspace.name,
  );

  const styles = useStyles();
  console.log(publishedStories, 'publishedStories', publishedStories.length);
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
            <>
              <TouchableOpacity
                style={styles.profileIcon}
                onPress={() => Alert.alert('Create Story', 'Coming Soon')}>
                <CircularImage
                  img={workspaceIcon}
                  name={workspaceName}
                  style={styles.HeaderImage}
                />
                <Image source={ADDSTORY} style={styles.active3} />
              </TouchableOpacity>
            </>
          )}
          renderItem={({item, index}) => {
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
                        {
                          borderColor: tapped ? '#D8ECFF' : '#2B7C84',
                          borderWidth: 3,
                        },
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
                        {
                          borderColor: tapped ? '#D8ECFF' : '#2B7C84',
                          borderWidth: 3,
                        },
                      ]}
                    />
                    <Image source={FACEBOOK} style={styles.active2} />
                  </>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
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
