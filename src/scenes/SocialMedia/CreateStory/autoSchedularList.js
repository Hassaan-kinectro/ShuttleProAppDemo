import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useRef} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import useStyles, {getCardStyle} from '../styles';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {deviceWidth} from '../../../utils/orientation';
import {FONT_FAMILY} from '../../../utils/constants';
import FastImage from 'react-native-fast-image';

const AutoSchedularList = ({item}) => {
  const styles = useStyles();
  const navigation = useNavigation;
  const {colors} = useTheme();
  const isCarousel = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  const _renderItem = ({item, index}) => {
    console.log(item.url, 'this is itemaaaaaa');
    return (
      <View style={[styles.cardStyle, getCardStyle(colors, item.color)]}>
        <>
          <FastImage
            source={{uri: item.url}}
            // resizeMode={FastImage.resizeMode.contain}
            style={styles.image}
          />
          {/* <View style={styles.cardHeader}>
            <Text fontFamily={FONT_FAMILY.SEMI_BOLD} size={16}>
              {item.date}
            </Text>
          </View>
          <View style={styles.cardContainer}>
            <Text fontFamily={FONT_FAMILY.SEMI_BOLD} size={16}>
              abc
            </Text>
            {item &&
              item.images &&
              item.images.length > 0 &&
              item.images.map(d => {
                console.log(d, 'this is d');
                return (
                  <Image
                    source={{uri: item.url}}
                    style={{width: 50, height: 50}}
                  />
                );
              })}
          </View> */}
        </>
      </View>
    );
  };
  return (
    <View style={styles.carHeight}>
      <Text>{item.date}</Text>
      <Carousel
        layout={'default'}
        ref={isCarousel}
        data={item && item.images}
        firstItem={currentIndex}
        renderItem={_renderItem}
        sliderWidth={deviceWidth}
        sliderHeight={deviceWidth / 1.2}
        itemHeight={deviceWidth / 1.2}
        itemWidth={deviceWidth - 80}
        onSnapToItem={index => setCurrentIndex(index)}
        // autoplay
        loop
      />
      <Pagination
        dotsLength={item && item.images && item.images.length}
        activeDotIndex={currentIndex}
        carouselRef={isCarousel}
        dotStyle={styles.dotStyle}
        containerStyle={styles.paginationStyle}
        tappableDots={true}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.9}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default AutoSchedularList;
