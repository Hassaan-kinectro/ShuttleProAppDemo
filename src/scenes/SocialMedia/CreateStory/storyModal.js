/* eslint-disable react-native/no-inline-styles */
import {
  Text,
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
import {PUBLISH} from '../../../utils/imagesPath';
import {deviceWidth, IS_IOS} from '../../../utils/orientation';

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
  const styles = useStyles();
  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={false}
        style={{backgroundColor: colors.background, position: 'relative'}}
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 999,
            left: deviceWidth / 2.5,
            top: IS_IOS ? 700 : 600,
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
            <Image style={styles.publishicon} source={PUBLISH} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default StoryModal;
