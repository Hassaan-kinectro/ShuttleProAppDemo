/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React from 'react';
import useStyles from './styles';
import {PUBLISH, DELETE, INSTAGRAM, FACEBOOK} from '../../utils/imagesPath';
import {Text, Mixins} from '../../styles';
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import Share from 'react-native-share';
import {handleConvert} from './helper';
import CircularImage from '../CircularImage';
import {UpdateStoryById} from '../../services/Stories';
import FastImage from 'react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import Loader from '../Loader';
import {deviceWidth, IS_IOS} from '../../utils/orientation';
import LinearGradient from 'react-native-linear-gradient';
import {FONT_FAMILY} from '../../utils/constants';

const defaultValue = {id: null, loading: false};
const StoryRow = ({
  item,
  setLoadingImages,
  loading,
  disabled,
  handleDelete,
}) => {
  const styles = useStyles();
  const [imageUrl, setImageUrl] = React.useState([]);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isloading, SetIsLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(true);
  const [tapped, setTapped] = React.useState(false);

  const colors = useTheme();
  React.useEffect(() => {
    item && item.images && item.images.length > 0 && setImageUrl(item.images);
  }, []);

  const shareInstagramImage = async (urls, id) => {
    setLoadingImages({id: item.id, loading: true});
    SetIsLoading(true);
    await UpdateStoryById(id).then(res => {
      if (res.status === 200) {
        SetIsLoading(false);
      } else {
        SetIsLoading(false);
      }
    });

    const resp = await handleConvert(urls);
    let list = [];
    resp.forEach(async image => {
      list.push(image.image);
    });
    const shareOptions = {
      title: 'Share Images to Instagram',
      failOnCancel: false,
      urls: list,
      type: 'image/*',
      social: Share.Social.INSTAGRAM,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log('The response', JSON.stringify(ShareResponse, null, 2));
      setLoadingImages(defaultValue);
    } catch (error) {
      setLoadingImages(defaultValue);
    }
  };
  const shareFacebookImage = async (urls, id) => {
    setLoadingImages({id: item.id, loading: true});
    SetIsLoading(true);
    await UpdateStoryById(id).then(res => {
      if (res.status === 200) {
        SetIsLoading(false);
      } else {
        SetIsLoading(false);
      }
    });
    const resp = await handleConvert(urls);
    let list = [];
    resp.forEach(async image => {
      list.push(image.image);
    });
    const shareOptions = {
      title: 'Share Images to Facebook',
      failOnCancel: false,
      urls: list,
      type: 'image/*',
      social: Share.Social.FACEBOOK,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log('The response', JSON.stringify(ShareResponse, null, 2));
      setLoadingImages(defaultValue);
    } catch (error) {
      setLoadingImages(defaultValue);
    }
  };

  console.log(loading, disabled, item.id);
  return (
    <>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => {
              if (!loading) {
                setModalVisible(true);
                setTapped(true);
              }
            }}>
            {item && item.type === 'instagram' && (
              <>
                <CircularImage
                  img={item && item.pagelogo ? item.pagelogo : item.pageicon}
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
                  img={item && item.pagelogo ? item.pagelogo : item.pageicon}
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
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <Text numberOfLines={1} style={styles.text}>
            {item.pageName}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            {item.createdAt
              ? moment(item.createdAt).format('DD MMM YYYY | hh:mm')
              : moment(item.created_at).format('YYYY-MM-DD hh:mm')}
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          {item &&
            item.id &&
            item.type === 'instagram' &&
            item.status === 'ready' && (
              <>
                <TouchableOpacity
                  style={{left: 13}}
                  disabled={disabled}
                  onPress={() => {
                    if (!loading) {
                      shareInstagramImage(imageUrl, item.id);
                    }
                  }}>
                  {loading && !disabled ? (
                    <ActivityIndicator style={styles.image} />
                  ) : (
                    <Image style={styles.image} source={PUBLISH} />
                  )}
                </TouchableOpacity>
              </>
            )}
          {item &&
            item.id &&
            item.type === 'facebook' &&
            item.status === 'ready' && (
              <>
                <TouchableOpacity
                  style={{left: 13}}
                  disabled={disabled}
                  onPress={() => {
                    if (!loading) {
                      shareFacebookImage(imageUrl, item.id);
                    }
                  }}>
                  {loading && !disabled ? (
                    <ActivityIndicator style={styles.image} />
                  ) : (
                    <Image style={styles.image} source={PUBLISH} />
                  )}
                </TouchableOpacity>
              </>
            )}
          {item &&
            item.id &&
            item.type === 'instagram' &&
            item.status === 'published' && (
              <>
                <View style={{left: 13}} disabled={disabled}>
                  {loading && !disabled ? (
                    <ActivityIndicator style={styles.image} />
                  ) : (
                    <Image style={styles.image} source={PUBLISH} />
                  )}
                </View>
              </>
            )}
          {item &&
            item.id &&
            item.type === 'facebook' &&
            item.status === 'published' && (
              <>
                <View style={{left: 13}} disabled={disabled}>
                  {loading && !disabled ? (
                    <ActivityIndicator style={styles.image} />
                  ) : (
                    <Image style={styles.image} source={PUBLISH} />
                  )}
                </View>
              </>
            )}
          {item && isDeleting ? (
            <ActivityIndicator style={styles.image} />
          ) : (
            <TouchableOpacity
              onPress={() =>
                Alert.alert('Delete Story', 'Do you want to Delete story', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => handleDelete(item.id, setIsDeleting),
                  },
                ])
              }>
              <Image style={styles.image} source={DELETE} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.hairline} />
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={false}
          style={{backgroundColor: colors.background, position: 'relative'}}
          visible={modalVisible}>
          <Swiper loop={false} autoplay={true} showsPagination={true}>
            {item &&
              item.images &&
              item.images.length > 0 &&
              item.images.map((image, index) => {
                console.log(item.type);
                return (
                  <View key={index} style={styles.slide}>
                    {imageLoading && (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'absolute',
                          zIndex: 999,
                          height: '100%',
                          width: '100%',
                        }}>
                        <Loader />
                      </View>
                    )}
                    <FastImage
                      style={styles.image2}
                      source={{
                        uri: image,
                      }}
                      onLoadEnd={() => setImageLoading(false)}
                      resizeMode="contain"
                    />
                  </View>
                );
              })}
          </Swiper>
          {item &&
            item.id &&
            item.type === 'instagram' &&
            item.status === 'published' && (
              <>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    zIndex: 999,
                    left: deviceWidth / 2.5,
                    top: IS_IOS ? 700 : 600,
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 0.9}}
                    colors={['#131', '#3662A8']}
                    style={styles.linearGradient}>
                    {loading ? (
                      <ActivityIndicator
                        type={'ThreeBounce'}
                        size={30}
                        color={colors.textColorLight}
                      />
                    ) : (
                      <Text
                        size={Mixins.scaleFont(16)}
                        fontFamily={FONT_FAMILY.REGULAR}
                        color="#fff"
                        style={[styles.buttonText2]}>
                        Published
                      </Text>
                    )}
                  </LinearGradient>
                </View>
              </>
            )}
          {item &&
            item.id &&
            item.type === 'instagram' &&
            item.status === 'ready' && (
              <>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    zIndex: 999,
                    left: deviceWidth / 2.5,
                    top: IS_IOS ? 700 : 600,
                  }}
                  onPress={() => {
                    if (!loading) {
                      shareFacebookImage(imageUrl, item.id);
                    }
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 0.9}}
                    colors={['#139A5C', '#3662A8']}
                    style={styles.linearGradient}>
                    {loading ? (
                      <ActivityIndicator
                        type={'ThreeBounce'}
                        size={30}
                        color={colors.textColorLight}
                      />
                    ) : (
                      <Text
                        size={Mixins.scaleFont(16)}
                        fontFamily={FONT_FAMILY.REGULAR}
                        color="#fff"
                        style={[styles.buttonText2]}>
                        Publish
                      </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          {item &&
            item.id &&
            item.type === 'facebook' &&
            item.status === 'published' && (
              <>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    zIndex: 999,
                    left: deviceWidth / 2.5,
                    top: IS_IOS ? 700 : 600,
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 0.9}}
                    colors={['#131', '#3662A8']}
                    style={styles.linearGradient}>
                    {loading ? (
                      <ActivityIndicator
                        type={'ThreeBounce'}
                        size={30}
                        color={colors.textColorLight}
                      />
                    ) : (
                      <Text
                        size={Mixins.scaleFont(16)}
                        fontFamily={FONT_FAMILY.REGULAR}
                        color="#fff"
                        style={[styles.buttonText2]}>
                        Published
                      </Text>
                    )}
                  </LinearGradient>
                </View>
              </>
            )}
          {item &&
            item.id &&
            item.type === 'facebook' &&
            item.status === 'ready' && (
              <>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    zIndex: 999,
                    left: deviceWidth / 2.5,
                    top: IS_IOS ? 700 : 600,
                  }}
                  onPress={() => {
                    if (!loading) {
                      shareFacebookImage(imageUrl, item.id);
                    }
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 0.9}}
                    colors={['#139A5C', '#3662A8']}
                    style={styles.linearGradient}>
                    {loading ? (
                      <ActivityIndicator
                        type={'ThreeBounce'}
                        size={30}
                        color={colors.textColorLight}
                      />
                    ) : (
                      <Text
                        size={Mixins.scaleFont(16)}
                        fontFamily={FONT_FAMILY.REGULAR}
                        color="#fff"
                        style={[styles.buttonText2]}>
                        Publish
                      </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    </>
  );
};

export default StoryRow;
