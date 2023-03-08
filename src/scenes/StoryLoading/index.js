/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Text} from '../../styles';
import {handleConvert} from './helper';
import Share from 'react-native-share';
import {Routes, FONT_FAMILY} from '../../utils/constants';
import {StackActions} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';
import Wrapper from '../../components/Wrapper';
import {Dark, Light} from '../../utils/imagesPath';
import useStyles from './styles';
import {useSelector} from 'react-redux';

const StoryLoading = message => {
  const {navigation} = message;
  let images =
    message &&
    message.route &&
    message.route.params &&
    message.route.params.images
      ? message.route.params.images
      : [];

  useEffect(() => {
    shareImage(images);
  }, [images]);

  const shareImage = async localImages => {
    const resp = await handleConvert(localImages);

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
      if (ShareResponse.message === 'CANCELED') {
        showMessage({
          message: '',
          description: 'Story is  Cancelled',
          type: 'danger',
        });
        setTimeout(() => {
          navigation.dispatch(StackActions.replace(Routes.WORKSPACES));
        }, 500);
      } else {
        showMessage({
          message: '',
          description: 'Story Shared Successfully',
          type: 'success',
        });
        setTimeout(() => {
          navigation.dispatch(StackActions.replace(Routes.WORKSPACES));
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const styles = useStyles();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const theme = useSelector(state => state.themeChange.theme);

  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={styles.flex}>
        <ActivityIndicator
          type={'ThreeBounce'}
          size={30}
          color={colors.TextColor}
        />
        <Text
          size={20}
          fontFamily={FONT_FAMILY.SEMI_BOLD}
          color={colors.TextColor}>
          {t('stories.loading')}
        </Text>
      </View>
    </Wrapper>
  );
};

export default StoryLoading;
