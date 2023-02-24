import {Button, TouchableOpacity, View} from 'react-native';
import React from 'react';
import useStyles from './style';
import {Styles, Text} from '../../styles';
import {useTheme} from '@react-navigation/native';
import Uploader from '../uploader';
import DocumentPicker from 'react-native-document-picker';
import LinearGradient from 'react-native-linear-gradient';
import {showMessage} from 'react-native-flash-message';
import {MediaData} from '../uploader/helper';

const MediaPicker = props => {
  const styles = useStyles();
  const {colors} = useTheme();
  // console.log(props, 'props data uploader');

  const pickAudio = async () => {
    try {
      console.log('User cancelled the picker');

      const result = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.audio],
      });
      console.log('\n', result);
      if (result?.length > 3) {
        return showMessage({
          message: '',
          description: 'Audios not more than 3',
          type: 'DANGER',
        });
      } else if (result?.length === 0) {
        return showMessage({
          message: '',
          description: 'Atleast select 1 Audios',
          type: 'DANGER',
        });
      } else {
        let test = [];
        test = result?.filter(file => {
          if (file.size > 1024 * 1024 * 5) {
            return file;
          }
        });
        console.log(test, 'test for audio');
        if (test?.length !== 0) {
          return showMessage({
            message: '',
            description: 'Audios must less then 5mb.',
            type: 'DANGER',
          });
        } else {
          console.log(result, 'result data');
          props?.setFieldValue('audiofile', result);
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error while picking audio', err);
      }
    }
  };

  return (
    <View style={Styles.mT15}>
      {MediaData &&
        MediaData.map((data, index) => {
          return (
            <View key={index}>
              <Uploader
                type={data.type}
                name={data.name}
                text={data.text}
                {...props}
              />
            </View>
          );
        })}
      {/* <Uploader type="image" name={'images'} text="Image" {...props} />
      <Uploader type="video" name={'videofile'} text="Video" {...props} />
      <Uploader
        type="image"
        name={'mobileImages'}
        text="Mobile Image"
        {...props}
      /> */}
      <TouchableOpacity onPress={pickAudio}>
        <LinearGradient
          colors={['rgba(134, 181, 237, 0.4)', 'rgba(134, 181, 237, 0.4)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          useAngle={true}
          angle={89.91}
          style={styles.boxBack}>
          <Text style={Styles.textCenter} color={colors.TextColor}>
            Drag and drop Audio(s) to upload, or{' '}
            <Text style={styles.underLineBrowser} color={colors.TextColor}>
              browse.
            </Text>
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default MediaPicker;
