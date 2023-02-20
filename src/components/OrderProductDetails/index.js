/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Text, GlobalStyle} from '../../styles';
import {ResolveImages} from '../../utils/urlParser';
import FastImage from 'react-native-fast-image';
import {TransformPrice} from '../../utils/Parser';
import useStyles from './styles';
import OrderRowItem from './OrderRowItem';

const OrderProductDetails = (item, {check}) => {
  const Styles = GlobalStyle();
  const styles = useStyles();
  let img = null;
  img = ResolveImages(
    item.item && item.item.product ? item.item.product : null,
  );
  return (
    <View style={[Styles.pB10]}>
      <View style={styles.inline}>
        <Text lines={4} style={styles.textStyle}>
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
        style={[
          Styles.flex,
          Styles.flexDirectionRow,
          Styles.justifyContentSpaceBetween,
        ]}>
        <View style={[Styles.flex]}>
          <FastImage
            style={[styles.productImage]}
            source={{uri: img.uri}}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={[styles.textBoxContainer]}>
          <View style={[Styles.flex, Styles.flexDirectionColumn]}>
            <OrderRowItem
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
            <OrderRowItem
              name={'Product Varient'}
              value={
                item.item.product_variants && item.item.product_variants.variant
                  ? item.item.product_variants.variant
                  : 'N/A'
              }
            />
            <OrderRowItem
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
    </View>
  );
};
export default OrderProductDetails;
