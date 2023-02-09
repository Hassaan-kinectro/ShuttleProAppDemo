/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React from 'react';
import useStyles from './styles';
import {PUBLISH} from '../../utils/imagesPath';
import {Text} from '../../styles';
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import Share from 'react-native-share';
import {handleConvert} from './helper';
import CircularImage from '../CircularImage';
const defaultValue = {id: null, loading: false};
const StoryRow = ({item, setLoadingImages, loading, disabled}) => {
  const styles = useStyles();
  const [imageUrl, setImageUrl] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  React.useEffect(() => {
    item && item.images && item.images.length > 0 && setImageUrl(item.images);
  }, []);
  const shareImage = async urls => {
    setLoadingImages({id: item.id, loading: true});
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
  console.log(loading, disabled, item.id);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => {
              if (!loading) {
                setModalVisible(true);
              }
            }}>
            <CircularImage
              img={item && item.pagelogo ? item.pagelogo : item.pageicon}
              name={item.pageName}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <Text lines={1} style={styles.text}>
            {item.pageName}
          </Text>
          <Text lines={1} style={styles.text}>
            {item.createdAt
              ? moment(item.createdAt).format('DD MMM YYYY | hh:mm')
              : moment(item.created_at).format('YYYY-MM-DD hh:mm')}
          </Text>
        </View>
        <View style={styles.container3}>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => {
              if (!loading) {
                shareImage(imageUrl);
              }
            }}>
            {loading && !disabled ? (
              <ActivityIndicator style={styles.image} />
            ) : (
              <Image style={styles.image} source={PUBLISH} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.hairline} />
      <View style={{flex: 1}}>
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <Swiper loop={true} autoplay={true} showsPagination={false}>
            {item &&
              item.images &&
              item.images.length > 0 &&
              item.images.map((image, index) => {
                return (
                  <View key={index} style={styles.slide}>
                    <Image
                      style={styles.image2}
                      source={{
                        uri: 'https://s3-shuttlepro-bucket.s3.amazonaws.com/workspaces/Moaz/product_attachment/12158/default/41975/NC127__3_.jpg',
                      }}
                    />
                  </View>
                );
              })}
          </Swiper>
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
