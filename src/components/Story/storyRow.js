import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import useStyles from './styles';
import {PUBLISH} from '../../utils/imagesPath';
import {Text} from '../../styles';
import Share from 'react-native-share';
import {
  convertImageTobase64,
  convertToBase64,
  ResolveStoryImageList,
} from '../../utils/urlParser';
const StoryRow = ({item}) => {
  const styles = useStyles();
  const [base64, setBase64] = React.useState(true);
  const [imageUrl, setImageUrl] = React.useState(
    'https://www.imgonline.com.ua/examples/rays-of-light-in-the-sky.jpg',
  );

  const shareImage = async imageURL => {
    try {
      let resultImage = await convertImageTobase64(imageUrl);

      const result = await Share.open({
        url: resultImage.image,
        title: 'Share Image',
        social: Share.Social.INSTAGRAM,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared with ${result.activityType}`);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Cancelled');
      }
    } catch (error) {
      console.log(error, 'this is errror');
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
