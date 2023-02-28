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
  const {name} = props;
  const [validationCheck, setValidationCheck] = React.useState({
    msg: '',
    state: false,
  });
  const [imageNotSelectCheck, setImageNotSelectCheck] = React.useState(false);
  const pickMultiImage = async () => {
    try {
      ImagePicker.openPicker({
        multiple: true,
        mediaType: props?.type,
      })
        .then(image => {
          if (image?.length > 3) {
            return showMessage({
              message: '',
              description: `Maximum 3 ${props?.text} are allowed.`,
              type: 'DANGER',
            });
          } else if (image?.length === 0) {
            return showMessage({
              message: '',
              description: `Atleast select 1 ${props?.text}`,
              type: 'DANGER',
            });
          } else {
            let test = false;
            test = image?.filter(file => {
              if (file.size > 1024 * 1024 * 5) {
                return true;
              } else {
                return false;
              }
            });
            if (test.length !== 0) {
              return showMessage({
                message: '',
                description: `${props?.text} must less then 5mb.`,
                type: 'DANGER',
              });
            } else {
              props?.setFieldValue(name, image);
              setImageNotSelectCheck(false);
              setValidationCheck({state: true, msg: `${image.length}`});
            }
          }
        })
        .catch(e => {
          setValidationCheck({
            state: false,
            msg: '',
          });
          props?.setFieldValue(name, []);
          setImageNotSelectCheck(true);
        });
    } catch (e) {}
  };
  // error={props.touched.productName && props.errors.productName}
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
            Drag and drop {props?.text}(s) to upload, or{' '}
            <Text style={styles.underLineBrowser} color={colors.TextColor}>
              browse.
            </Text>
          </Text>

          {validationCheck?.state ? (
            <View>
              <Text style={Styles.textCenter}>
                {validationCheck.msg} {props?.text} selected.
              </Text>
            </View>
          ) : (
            <></>
          )}
          {
            ((props?.required && imageNotSelectCheck) ||
              props.errors[props?.name]) && (
              <View>
                <Text style={styles.textCenterError}>
                  {props.errors[props.name]}
                </Text>
              </View>
            )
            // ) : (
            //   <></>
            // )
          }
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Uploader;
