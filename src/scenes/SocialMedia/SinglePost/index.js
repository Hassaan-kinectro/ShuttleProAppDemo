/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {GlobalStyle, Text} from '../../../styles';
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
  const Styles = GlobalStyle();

  return (
    <>
      <View style={styles.postCard}>
        <View style={[Styles.flex, Styles.flexDirectionRow, styles.mh5]}>
          <CircularImage
            img={
              pageIcon && pageIcon.thumb && pageIcon.thumb.url
                ? pageIcon.thumb.url
                : pageIcon.url
            }
            name={name}
            style={[styles.HeaderIcon, Styles.flex]}
          />
          {profileType === 'facebook' && (
            <FastImage source={FACEBOOK} style={styles.activePost} />
          )}
          {profileType === 'instagram' && (
            <FastImage source={INSTAGRAM} style={styles.activePost} />
          )}
          <View style={styles.flex10Start}>
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
          <View style={{backgroundColor: 'blue'}}>
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
                  style={styles.imageStyle}
                  resizeMode="cover"
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default SinglePost;
