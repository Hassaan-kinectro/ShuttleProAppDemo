import {View} from 'react-native';
import React from 'react';
import {Text} from '../../../styles';
import {FACEBOOK, INSTAGRAM} from '../../../utils/imagesPath';
import useStyles from '../styles';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import AIcon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import CircularImage from '../../../components/CircularImage';
const SinglePost = ({post, name, pageIcon, profileType}) => {
  const styles = useStyles();
  const {colors} = useTheme();

  return (
    <>
      <View style={styles.postCard}>
        <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 5}}>
          <CircularImage
            img={
              pageIcon && pageIcon.thumb && pageIcon.thumb.url
                ? pageIcon.thumb.url
                : pageIcon.url
            }
            name={name}
            style={[styles.HeaderImagepost, {flex: 1}]}
          />
          {profileType === 'facebook' && (
            <FastImage source={FACEBOOK} style={styles.activePost} />
          )}
          {profileType === 'instagram' && (
            <FastImage source={INSTAGRAM} style={styles.activePost} />
          )}
          <View style={[{flex: 5}]}>
            <Text numberOfLines={1} style={[styles.text]}>
              {name}
            </Text>
            <Text numberOfLines={1} style={[styles.text]}>
              {post.date
                ? moment(post.date).format('DD MMM YYYY | hh:mm')
                : moment(post.created_at).format('YYYY-MM-DD hh:mm')}
            </Text>
          </View>
        </View>
        <Text
          numberOfLines={5}
          style={[styles.text, {marginVertical: 10, marginHorizontal: 5}]}>
          {post.message ? post.message : post.caption ? post.caption : ''}
        </Text>
        <View>
          {post.type === 'carousel' && profileType === 'instagram' && (
            <Text numberOfLines={1} style={[styles.text]}>
              {name}
            </Text>
          )}
          {post.image && post.image.includes('video') ? (
            <View style={styles.imageContainerStyle}>
              <AIcon
                name="warning"
                color={colors.textColorLight}
                size={40}
                style={styles.pB10}
              />
              <Text numberOfLines={1} color={colors.textColorLight} size={16}>
                Wait! Image is loading...
              </Text>
            </View>
          ) : (
            <View style={styles.imageContainerStyle}>
              <FastImage
                source={{
                  uri: post.image,
                }}
                style={{height: 222, width: 320}}
                resizeMode="cover"
              />
            </View>
          )}
        </View>
      </View>
      <View style={styles.hairline} />
    </>
  );
};

export default SinglePost;
