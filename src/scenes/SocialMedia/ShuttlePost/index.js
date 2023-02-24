/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, Image} from 'react-native';
import React, {useCallback} from 'react';
import {GlobalStyle, Text} from '../../../styles';
import {FACEBOOK, INSTAGRAM} from '../../../utils/imagesPath';
import useStyles from '../styles';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import CircularImage from '../../../components/CircularImage';
import PopupMenu from '../../../components/PopupMenu';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';
import Loader from '../../../components/Loader';
import FastImage from 'react-native-fast-image';
import {GetMenuList} from '../helper';
import {IS_IOS} from '../../../utils/orientation';
import {FONT_FAMILY} from '../../../utils/constants';
const ShuttlePost = ({post, name, pageIcon, profileType, setPosts}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const Styles = GlobalStyle();

  const getAction = useCallback(
    action => {
      if (action.onClick) {
        action.onClick(post, profileType, setPosts);
      }
    },
    [post, profileType, setPosts],
  );

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
          <CircularImage
            img={pageIcon && pageIcon}
            name={name}
            style={[styles.HeaderIcon, Styles.flex]}
          />
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
                color="#727477"
                fontWeight={400}
                fontFamily={FONT_FAMILY.LIGHT}
                style={{marginLeft: 10}}>
                {post.status ? `(${post.status})` : null}
              </Text>
            </View>
            <Text
              size={10}
              color="#727477"
              fontWeight={400}
              fontFamily={FONT_FAMILY.REGULAR}>
              {post.date
                ? moment(post.date).fromNow()
                : moment(post.created_at).fromNow()}
            </Text>
          </View>
          <PopupMenu
            options={GetMenuList(post.postStatus, post.scheduleId)}
            onClick={getAction}
          />
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
          {post && post.image && post.image.includes('video') ? (
            <View style={styles.imageContainerStyle}>
              <Video
                source={{
                  uri: post.image,
                }}
                rate={1}
                // controls={true}
                style={styles.imageStyle}
                repeat={true}
              />
            </View>
          ) : post && post.carousel && post.carousel.length > 0 ? (
            <Swiper style={{height: 340}} showsPagination={true}>
              {post &&
                post.carousel &&
                post.carousel.map((image, index) => {
                  return (
                    <View key={`${index}`} style={styles.imageContainerStyle}>
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
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default ShuttlePost;
