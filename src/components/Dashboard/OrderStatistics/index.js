import React, {useState, useRef, useEffect} from 'react';
import {View, ActivityIndicator, TouchableOpacity} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import useStyles, {getCardStyle} from './styles';
import {Text} from '../../../styles';
import {deviceWidth} from '../../../utils/orientation';
import {DateFormat, FONT_FAMILY, Routes} from '../../../utils/constants';
import * as Constants from '../Constants';
import {
  statisticsDefaultValue,
  fetchDaysOrders,
  fetchCriticalOrders,
  fetchReturnOrders,
} from '../helper';
import dayjs from 'dayjs';
const OrderStatistics = ({date, startDate, endDate}) => {
  const styles = useStyles();
  const navigation = useNavigation();
  const {colors} = useTheme();
  const isCarousel = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [data, setData] = useState(statisticsDefaultValue);
  const workspaceId = useSelector(state => state.workspace.workspaceId);

  useEffect(() => {
    fetchDaysOrders(workspaceId, date, setData);
  }, [workspaceId, date]);
  useEffect(() => {
    fetchCriticalOrders(workspaceId, startDate, endDate, setData);
  }, [workspaceId, startDate, endDate]);
  useEffect(() => {
    fetchReturnOrders(workspaceId, startDate, endDate, setData);
  }, [workspaceId, startDate, endDate]);
  const onNavigate = (d, type) => {
    if (d.statusType) {
      let params = {
        startDate,
        endDate,
        status_type: d.statusType,
      };
      if (type === Constants.IN_PROGRESS) {
        params.startDate = dayjs(endDate)
          .subtract(d.start, 'days')
          .format(DateFormat);
        params.endDate = dayjs(endDate)
          .subtract(d.end, 'days')
          .format(DateFormat);
      }
      navigation.navigate(Routes.ORDERS, {
        screen: Routes.ORDERSLIST,
        params: params,
      });
    }
  };
  const _renderItem = ({item, index}) => {
    return (
      <View style={[styles.cardStyle, getCardStyle(colors, item.color)]}>
        {!item.loading ? (
          <>
            <View style={styles.cardHeader}>
              <Text fontFamily={FONT_FAMILY.SEMI_BOLD} size={16}>
                {item.label}
              </Text>
            </View>
            <View style={styles.cardContainer}>
              {item.data.map(d => {
                return (
                  <TouchableOpacity
                    onPress={() => onNavigate(d, item.type)}
                    key={d.label + d.value}
                    style={styles.cardItem}>
                    <Text size={11}>{d.label}</Text>
                    <Text size={13} fontFamily={FONT_FAMILY.SEMI_BOLD}>
                      {d.value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        ) : (
          <View style={styles.loaderStyle}>
            <ActivityIndicator size={30} color={colors.textColorLight} />
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={styles.carHeight}>
      <Carousel
        layout={'default'}
        ref={isCarousel}
        data={data}
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
        dotsLength={data.length}
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

export default OrderStatistics;
