import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import useStyles from '../styles';
import {deviceHeight, deviceWidth} from '../../../utils/orientation';
import CircularImage from '../../../components/CircularImage';
import {GlobalStyle, Mixins, Colors} from '../../../styles';
import {CloseIcon} from '../../../icons';
const StoryPreview = ({values, visible, setModalVisible, currentProfile}) => {
  const styles = useStyles();
  const Styles = GlobalStyle();
  console.log(values, currentProfile, 'this is values');
  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={false}
        style={{position: 'relative'}}
        visible={visible}>
        <Swiper loop={false} autoplay={true} showsPagination={true}>
          {values &&
            values.length > 0 &&
            values.map((image, index) => {
              return (
                <View key={`${index}`} style={styles.slide}>
                  <FastImage
                    style={styles.image2}
                    source={{
                      uri: image.url,
                    }}
                    resizeMode="contain"
                  />
                </View>
              );
            })}
        </Swiper>
        {values &&
          values.length > 0 &&
          values.map(i => {
            return (
              <>
                <View style={styles.containerModal}>
                  <View style={Styles.flexCenter}>
                    <CircularImage
                      img={i && i.header && i.header.profileImage}
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
                        {i && i.header && i.header.heading}
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
              </>
            );
          })}
      </Modal>
    </View>
  );
};

export default StoryPreview;
