/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React from 'react';
import useStyles from './styles';
import {PUBLISH} from '../../utils/imagesPath';
import {Text} from '../../styles';
import Share from 'react-native-share';
import {handleConvert} from './helper';
import {Modal, View, Image, TouchableOpacity, Animated} from 'react-native';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import CircularImage from '../CircularImage';

const StoryRow = ({item}) => {
  const [imageUrl, setImageUrl] = React.useState([]);
  React.useEffect(() => {
    item && item.images && item.images.length > 0 && setImageUrl(item.images);
  }, []);
  const styles = useStyles();
  const [modalVisible, setModalVisible] = React.useState(false);

  const shareImage = async imageUrl => {
    const resp = await handleConvert(imageUrl);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <CircularImage
              img={item && item.pagelogo ? item.pagelogo : item.pageicon}
              name={item.pageName}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container2}>
          <Text numberOfLines={1} style={styles.name}>
            {item.pageName}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            {item.createdAt
              ? moment(item.createdAt).format('DD MMM YYYY | hh:mm')
              : moment(item.created_at).format('YYYY-MM-DD hh:mm')}
          </Text>
        </View>
        <View style={styles.container3}>
          <TouchableOpacity onPress={() => shareImage(imageUrl)}>
            <Image style={styles.image} source={PUBLISH} />
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
                console.log(image, 'flag80', index);
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
