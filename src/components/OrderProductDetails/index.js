import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Styles, Text, Colors, Mixins, GlobalStyle} from '../../styles';
import {deviceWidth, deviceHeight} from '../../utils/orientation';
import {ResolveImages} from '../../utils/urlParser';
import FastImage from 'react-native-fast-image';
import {TransformPrice} from '../../utils/Parser';
import {useTheme} from '@react-navigation/native';

const columnWidth = deviceWidth / 2 - 20;
const RowItem = item => {
  const {colors} = useTheme();
  const Styles = GlobalStyle();
  const styles = useStyles(colors);
  return (
    <View style={{marginBottom: 10}}>
      <Text
        lines={1}
        color={colors.TextColor}
        style={{
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: '400',
        }}>
        {item.name}
      </Text>
      <Text
        lines={1}
        style={{
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: '600',
        }}>
        {item.value}
      </Text>
    </View>
  );
};

const OrderProductDetails = (item, {check}) => {
  const {colors} = useTheme();
  const Styles = GlobalStyle();
  const styles = useStyles(colors);
  let img = null;
  img = ResolveImages(
    item.item && item.item.product ? item.item.product : null,
  );
  return (
    <>
      <View style={styles.inline}>
        <Text
          style={{
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: '600',
            marginVertical: 11,
          }}>
          {item && item.item && item.item.product && item.item.product.name
            ? item.item.product.name
            : 'N/A'}{' '}
          -{' '}
          {item && item.item && item.item.product && item.item.product.code
            ? item.item.product.code
            : 'N/A'}
        </Text>
        <View />
      </View>

      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: 10,
          marginRight: 52,
          flexDirection: 'row',
        }}>
        <View>
          <View
            style={[
              Styles.alignItemsCenter,
              {
                borderRadius: 5,
                borderColor: colors.boxBorderColor,
                borderWidth: 1,
                marginLeft: 20,
              },
            ]}>
            <FastImage
              style={[styles.productImage]}
              source={{uri: img.uri}}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
        <View>
          <View style={styles.RowWidth}>
            <RowItem
              name={'Amount'}
              value={
                item.item.total_amount
                  ? TransformPrice(item.item.total_amount)
                  : item.item.price
                  ? TransformPrice(item.item.price)
                  : item.item.quantity
                  ? item.item.quantity * item.item.product.sale_price
                  : 1 * item.item.product.sale_price
              }
            />
          </View>
          <View>
            <RowItem
              name={'Product Varient'}
              value={
                item.item.product_variants && item.item.product_variants.variant
                  ? item.item.product_variants.variant
                  : 'N/A'
              }
            />
          </View>
          <View>
            <RowItem
              name={'Box No.'}
              value={
                item.item.product && item.item.product.box_no
                  ? item.item.product.box_no
                  : 'N/A'
              }
            />
          </View>
        </View>
      </View>
    </>
  );
};

const useStyles = colors => {
  return StyleSheet.create({
    halfWidth: {
      width: deviceWidth - 20,
    },
    productImage: {
      // width: deviceWidth / 3,
      // height: deviceHeight / 3,
      width: 115,
      height: 115,
      // backgroundColor: 'pink',
      borderColor: 'transparent',
      borderWidth: 1,
      borderRadius: 1,
    },
    separator: {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.textColor,
      paddingBottom: 8,
      marginBottom: 8,
    },
    container: {
      paddingTop: 10,
      paddingBottom: 20,
    },
    hairline: {
      borderColor: colors.boxBorderColor,
      borderWidth: 1,
      width: '100%',
      paddingHorizontal: 15,
      marginTop: 11,
    },
    inline: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 52,
      flexDirection: 'row',
    },
    RowWidth: {
      width: 100,
    },
  });
};
export default OrderProductDetails;
