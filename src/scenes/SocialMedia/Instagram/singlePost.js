import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {FACEBOOK, INSTAGRAM} from '../../../utils/imagesPath';
import useStyles from '../styles';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {useTheme} from '@react-navigation/native';

const SinglePost = ({post, name, pageIcon, profileType}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  return (
    <>
      <View style={styles.postCard} />
    </>
  );
};

export default SinglePost;
