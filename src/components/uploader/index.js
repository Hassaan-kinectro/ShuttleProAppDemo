import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {Styles, Text} from '../../styles';
import LinearGradient from 'react-native-linear-gradient';
import useStyles from './style';
import {useTheme} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

const Uploader = props => {
  const styles = useStyles();
  const {colors} = useTheme();

  const pickMultiImage = async () => {
    try {
      ImagePicker.openPicker({
        multiple: true,
        mediaType: props?.type,
      }).then(image => {
        if (image?.length > 3 || image?.length === 0) {
        } else {
          let test = false;
          test = image?.filter(file => {
            if (file.size > 1024 * 1024 * 5) {
              return true;
            }
          });
          if (test) {
            return showMessage({
              message: '',
              description: `${props?.text} must less then 5mb.`,
              type: 'DANGER',
            });
          } else {
            props?.setFieldValue(props?.name, image);
          }
        }
      });
    } catch (e) {
      console.log(' start from here>>>>', e, 'error on catah >>>>>');
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={pickMultiImage}>
        <LinearGradient
          colors={['rgba(134, 181, 237, 0.4)', 'rgba(134, 181, 237, 0.4)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          useAngle={true}
          angle={89.91}
          style={styles.boxBack}>
          <Text style={Styles.textCenter} color={colors.TextColor}>
            Drag and drop {props?.text}(s) to upload, or
          </Text>
          <Text style={styles.underLineBrowser} color={colors.TextColor}>
            browse.
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Uploader;
