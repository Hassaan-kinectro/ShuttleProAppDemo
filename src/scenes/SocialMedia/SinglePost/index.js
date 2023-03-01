/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import {GlobalStyle, Text} from '../../../styles';
import {FACEBOOK, INSTAGRAM} from '../../../utils/imagesPath';
import useStyles from '../styles';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import CircularImage from '../../../components/CircularImage';
import Video from 'react-native-video';
import {IS_IOS} from '../../../utils/orientation';

import {FONT_FAMILY} from '../../../utils/constants';
const SinglePost = ({post, name, pageIcon, profileType}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const Styles = GlobalStyle();

  return (
    <>
      <View style={styles.postCard}>
        <View
          style={[
            Styles.flex,
            Styles.flexDirectionRow,
            Styles.justifyContentCenter,
            Styles.alignItemsCenter,
          ]}>
          <TouchableOpacity
            onPress={() => {
              if (post && post.permalink && post.permalink !== null) {
                Linking.openURL(`${post.permalink}`);
              }
            }}>
            <CircularImage
              img={
                pageIcon && pageIcon.thumb && pageIcon.thumb.url
                  ? pageIcon.thumb.url
                  : pageIcon.url
              }
              name={name}
              style={[styles.HeaderIcon, Styles.flex]}
            />
          </TouchableOpacity>
          {profileType === 'facebook' && (
            <FastImage source={FACEBOOK} style={styles.activePostfb} />
          )}
          {profileType === 'instagram' && (
            <FastImage source={INSTAGRAM} style={styles.activePostinsta} />
          )}

          <View style={styles.flex10Start}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text
                size={14}
                color={colors.TextColor}
                fontWeight={400}
                fontFamily={FONT_FAMILY.REGULAR}>
                {name}
              </Text>
              <Text
                size={14}
                color={colors.TextColor}
                fontWeight={400}
                fontFamily={FONT_FAMILY.LIGHT}
                style={{marginLeft: 10}}>
                {post.status ? `(${post.status})` : null}
              </Text>
            </View>
            <Text
              size={10}
              color={colors.TextColor}
              fontWeight={400}
              fontFamily={FONT_FAMILY.REGULAR}>
              {post.date
                ? moment(post.date).fromNow()
                : moment(post.created_at).fromNow()}
            </Text>
          </View>
        </View>
        <Text
          numberOfLines={5}
          style={[
            styles.text,
            {marginTop: 15, marginBottom: 10, marginHorizontal: 5},
          ]}>
          {post.message ? post.message : post.caption ? post.caption : ''}
        </Text>
        <View style={[Styles.flexCenter]}>
          {post.image && post.image.includes('video') ? (
            <View style={styles.imageContainerStyle}>
              {IS_IOS ? (
                <Video
                  source={{
                    uri: post.image,
                  }}
                  rate={1}
                  controls={true}
                  style={styles.imageStyle}
                  resizeMode="cover"
                />
              ) : (
                <Video
                  source={{
                    uri: post.image,
                  }}
                  rate={1}
                  // controls={true}
                  style={styles.imageStyle}
                  resizeMode="cover"
                />
              )}
            </View>
          ) : post && post.carousel && post.carousel.length > 0 ? (
            <Swiper style={{height: 340}} showsPagination={true}>
              {post &&
                post.carousel &&
                post.carousel.map((image, index) => {
                  return (
                    <View key={`${index}`} style={styles.imageContainerStyle2}>
                      <FastImage
                        style={styles.imageStyle}
                        source={{
                          uri: image && image.src ? image.src : image,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                  );
                })}
            </Swiper>
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
    </>
  );
};

export default SinglePost;
