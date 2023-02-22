import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import useStyles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {Styles, Text} from '../../styles';
import {useTheme} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

const MediaPicker = () => {
  const styles = useStyles();
  const {colors} = useTheme();

  const pickMultiImage = async () => {
    // try {
    //   launchCamera(options, async response => {
    //     console.log(response, ' response start from here>>>>');

    //     if (response.didCancel) {
    //       console.log('User cancelled image picker');
    //     } else if (response.error) {
    //       console.log('ImagePicker Error: ', response.error);
    //     } else if (response.customButton) {
    //       console.log('User tapped custom button: ', response.customButton);
    //     } else {
    //       const source = {uri: response.uri};
    //       // Do something with the selected image
    //     }
    //   });
    // } catch (e) {
    //   console.log(' start from here>>>>', e, 'error on catah >>>>>');
    // }

    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {});
    } catch (e) {}
  };
  const pickMultiVideo = () => {
    // {ImageCropPicker}.openPicker({
    //   multiple: true,
    // }).then(images => {
    //   console.log(images);
    // });
  };

  return (
    <View style={Styles.mT15}>
      <TouchableOpacity onPress={pickMultiImage}>
        <LinearGradient
          colors={['rgba(134, 181, 237, 0.4)', 'rgba(134, 181, 237, 0.4)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          useAngle={true}
          angle={89.91}
          style={styles.boxBack}>
          <Text style={Styles.textCenter} color="#3D3D3D">
            Drag and drop Images(s) to upload, or
          </Text>
          <Text style={styles.underLineBrowser} color="#3D3D3D">
            browse.
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickMultiVideo}>
        <LinearGradient
          colors={['rgba(134, 181, 237, 0.4)', 'rgba(134, 181, 237, 0.4)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          useAngle={true}
          angle={89.91}
          style={styles.boxBack}>
          <Text style={Styles.textCenter} color="#3D3D3D">
            Drag and drop Videos(s) to upload, or
          </Text>
          <Text style={styles.underLineBrowser} color="#3D3D3D">
            browse.
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickMultiVideo}>
        <LinearGradient
          colors={['rgba(134, 181, 237, 0.4)', 'rgba(134, 181, 237, 0.4)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          useAngle={true}
          angle={89.91}
          style={styles.boxBack}>
          <Text style={Styles.textCenter} color="#3D3D3D">
            Drag and drop Audio(s) to upload, or
          </Text>
          <Text style={styles.underLineBrowser} color="#3D3D3D">
            browse.
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickMultiVideo}>
        <LinearGradient
          colors={['rgba(134, 181, 237, 0.4)', 'rgba(134, 181, 237, 0.4)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          useAngle={true}
          angle={89.91}
          style={styles.boxBack}>
          <Text style={Styles.textCenter} color="#3D3D3D">
            Drag and drop Mobile Image(s) to upload, or
          </Text>
          <Text style={styles.underLineBrowser} color="#3D3D3D">
            browse.
          </Text>
        </LinearGradient>
      </TouchableOpacity>
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
