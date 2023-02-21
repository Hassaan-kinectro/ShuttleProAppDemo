/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import Loader from '../../../components/Loader';
import {useTheme} from '@react-navigation/native';
import useStyles from '../styles';
import {deviceHeight, deviceWidth, IS_IOS} from '../../../utils/orientation';
import LinearGradient from 'react-native-linear-gradient';
import {FONT_FAMILY} from '../../../utils/constants';
import {Mixins, Text, GlobalStyle, Colors} from '../../../styles';
import CircularImage from '../../../components/CircularImage';
import {useSelector} from 'react-redux';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import {CloseIcon} from '../../../icons';
import {PUBLISH} from '../../../utils/imagesPath';

const StoryModal = ({
  data,
  visible,
  setModalVisible,
  loading,
  values,
  selectedImages,
  FormData,
}) => {
  const {colors} = useTheme();
  const theme = useSelector(state => state.themeChange.theme);
  const Styles = GlobalStyle();

  const styles = useStyles();
  console.log(values.pageName, values.pagelogo);
  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={false}
        style={{position: 'relative'}}
        visible={visible}>
        <Swiper loop={false} autoplay={true} showsPagination={true}>
          {data &&
            data.length > 0 &&
            data.map((image, index) => {
              return (
                <View key={`${index}`} style={styles.slide}>
                  {loading && (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        zIndex: 999,
                        height: '100%',
                        width: '100%',
                      }}>
                      <Loader />
                    </View>
                  )}
                  <FastImage
                    style={styles.image2}
                    source={{
                      uri: image,
                    }}
                    onLoadEnd={() => !loading}
                    resizeMode="contain"
                  />
                </View>
              );
            })}
        </Swiper>

        <TouchableOpacity
          style={{
            flex: 1,
            position: 'absolute',
            zIndex: 999,
            left: deviceWidth / 2.5,
            bottom: deviceHeight / 7.5,
          }}
          onPress={() => {
            if (!loading) {
              FormData(values, selectedImages);
              setModalVisible(false);
            }
          }}>
          {loading ? (
            <ActivityIndicator style={styles.publishicon} />
          ) : (
            <Image
              source={PUBLISH}
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}
        </TouchableOpacity>
        <View style={styles.containerModal}>
          <View style={Styles.flexCenter}>
            <CircularImage
              img={
                values && values.pagelogo ? values.pagelogo : values.pageicon
              }
              name={values.pageName}
              style={styles.HeaderImage5}
            />
          </View>

          <View style={Styles.flex2Start}>
            <View>
              <Text
                lines={1}
                size={Mixins.scaleFont(16)}
                style={[styles.headerText]}>
                {values && values.pageName}
              </Text>
              <Text
                lines={1}
                size={Mixins.scaleFont(5)}
                style={[styles.headerText2]}>
                a few seconds ago
              </Text>
            </View>
          </View>
          <View style={Styles.flex3End}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <CloseIcon size={30} color={Colors.WHISPER} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StoryModal;
