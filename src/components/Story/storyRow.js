/* eslint-disable no-unused-vars */
import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import useStyles from './styles';
import {PUBLISH} from '../../utils/imagesPath';
import {Text} from '../../styles';
import Share from 'react-native-share';
import {handleConvert} from './helper';
const StoryRow = ({item}) => {
  const styles = useStyles();
  const [imageUrl, setImageUrl] = React.useState([
    'https://www.imgonline.com.ua/examples/rays-of-light-in-the-sky.jpg',
    'https://thumbs.dreamstime.com/b/african-safari-asian-animals-theme-illustration-filled-many-animals-white-border-image-african-safari-asian-163740578.jpg',
  ]);

  let base64Images;

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
          <Image style={styles.image} source={item.img} />
        </View>
        <View style={styles.container2}>
          <Text numberOfLines={1} style={styles.text}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            {item.date}
          </Text>
        </View>
        <View style={styles.container3}>
          <TouchableOpacity onPress={() => shareImage(imageUrl)}>
            <Image style={styles.image} source={PUBLISH} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.hairline} />
    </>
  );
};

export default StoryRow;
