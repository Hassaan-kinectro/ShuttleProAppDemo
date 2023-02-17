import {View, Image} from 'react-native';
import React from 'react';
import useStyles from './styles';
import {Text} from '../../styles';
import {SHOPIFY, WOOCOMMERCE} from '../../utils/imagesPath';
import {getImageUrl} from './helper';
import {ThreeDotsIcon} from '../../icons';

const ProductListItem = ({item}) => {
  const styles = useStyles();
  return (
    <>
      <View style={styles.BoxStyle}>
        <View style={styles.container2}>
          <Text style={styles.productNameSty}>{item.name}</Text>
          <Text style={styles.widthDash}>-</Text>
          <Text style={styles.font}>{item.code}</Text>
          <View style={styles.iconSty}>
            {item &&
            item.store_type &&
            item.store_type.toUpperCase() === 'SHOPIFY' ? (
              <Image
                source={SHOPIFY}
                alt="SHOPIFY"
                style={styles.woocommerceStyle}
              />
            ) : item &&
              item.store_type &&
              item.store_type.toUpperCase() === 'WOOCOMMERCE' ? (
              <Image
                source={WOOCOMMERCE}
                alt="WOOCOMMERCE"
                style={styles.woocommerceStyle}
              />
            ) : (
              <Text />
            )}
            <ThreeDotsIcon size={22} />
          </View>
        </View>
        <View style={styles.container2}>
          {/* <Text>{getImageUrl(item.product_attachments)}</Text> */}
          <Image
            source={{uri: getImageUrl(item.product_attachments)}}
            alt={item.name}
            style={styles.productImageSty}
          />
          <View style={styles.container2}>
            <View>
              <View style={styles.widthBTW}>
                <Text style={styles.subBoxFontHead}>Preference</Text>
                <Text style={styles.subBoxFontPara}>{item.preference}</Text>
              </View>
              <View style={styles.widthBTW}>
                <Text style={styles.subBoxFontHead}>Quantity</Text>
                <Text style={styles.subBoxFontPara}>{item.quantity}</Text>
              </View>
            </View>
            <View>
              <View style={styles.widthBTW}>
                <Text style={styles.subBoxFontHead}>Category</Text>
                <Text style={styles.subBoxFontPara}>
                  {item.product_categories[0].category.name}
                </Text>
              </View>
              <View style={styles.widthBTW}>
                <Text style={styles.subBoxFontHead}>Price</Text>
                <Text style={styles.subBoxFontPara}>
                  Rs: {item.sale_price ? item.sale_price : item.price}/-
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ProductListItem;
