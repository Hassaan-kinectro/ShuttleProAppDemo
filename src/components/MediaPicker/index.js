import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import useStyles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Styles, Text} from '../../styles';
import {useTheme} from '@react-navigation/native';
// import ImagePicker from 'react-native-image-crop-picker';

const MediaPicker = () => {
  const styles = useStyles();
  const {colors} = useTheme();

  const pickMultiImage = () => {
    // ImagePicker.openPicker({
    //   multiple: true,
    // }).then(images => {
    //   console.log(images);
    // });
  };
  const pickMultiVideo = () => {
    // {ImageCropPicker}.openPicker({
    //   multiple: true,
    // }).then(images => {
    //   console.log(images);
    // });
  };

  return (
    <View>
      <LinearGradient
        colors={['rgba(134, 181, 237, 0.4)', 'rgba(134, 181, 237, 0.4)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        useAngle={true}
        angle={89.91}
        style={styles.boxBack}>
        <TouchableOpacity onPress={pickMultiImage}>
          <Text style={Styles.textCenter}>
            Drag and drop Images(s) to upload, or
          </Text>
          <Text style={styles.underLineBrowser}>browse.</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={['rgba(134, 181, 237, 0.4)', 'rgba(134, 181, 237, 0.4)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        useAngle={true}
        angle={89.91}
        style={styles.boxBack}>
        <TouchableOpacity onPress={pickMultiVideo}>
          <Text style={Styles.textCenter}>
            Drag and drop Videos(s) to upload, or
          </Text>
          <Text style={styles.underLineBrowser}>browse.</Text>
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.boxBack}>
        <Text>Video</Text>
      </View>
      {/* <View style={styles.boxBack}>
        <Text>image</Text>
      </View>
      <View style={styles.boxBack}>
        <Text>image</Text>
      </View> */}
    </View>
  );
};

export default MediaPicker;
