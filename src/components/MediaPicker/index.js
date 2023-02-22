import {View} from 'react-native';
import React from 'react';
import useStyles from './style';
import {Styles} from '../../styles';
import {useTheme} from '@react-navigation/native';
import Uploader from '../uploader';

const MediaPicker = props => {
  const styles = useStyles();
  const {colors} = useTheme();

  return (
    <View style={Styles.mT15}>
      <Uploader type="image" name={'images'} text="Image" {...props} />
      <Uploader type="video" name={'videoFile'} text="Video" {...props} />
      <Uploader
        type="image"
        name={'mobileImages'}
        text="Mobile Image"
        {...props}
      />
      {/* <Uploader type="audio" name={'audioFile'} text="Audio" {...props} /> */}
    </View>
  );
};

export default MediaPicker;
