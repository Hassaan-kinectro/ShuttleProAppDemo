/* eslint-disable radix */
import React from 'react';
import {View} from 'react-native';
import {Text, Mixins, GlobalStyle} from '../../styles';
import {showMessage} from 'react-native-flash-message';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Clipboard from '@react-native-community/clipboard';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TransformPrice} from '../../utils/Parser';
import OrderActivity from '../../scenes/Orders/OrderActivity';
import OrderTimeline from '../../scenes/Orders/OrderTimeline';
import useStyles from './styles';
import {useTranslation} from 'react-i18next';
import OrderCard from '../OrderListItem/orderCard';
const OrderDetail = props => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const {colors} = useTheme();
  const styles = useStyles();
  const Styles = GlobalStyle();
  const {t} = useTranslation();

  const copyToClipboard = async () => {
    let text = '';
    let amount = 0;
    if (props.item && props.item.order_products) {
      props.item.order_products.map(o => {
        let pri = 0;
        if (o.total_amount) {
          pri = parseInt(o.total_amount);
          amount = amount + parseInt(pri);
        } else {
          let quan = o.quantity ? o.quantity : 1;
          pri = parseInt(quan * o.product.sale_price);
          amount = amount + parseInt(pri);
        }
        text += o.product.code + ' : ' + TransformPrice(pri) + '\n';
      });
      if (amount > 0) {
        text += 'DC : ' + TransformPrice(props.item.delivery_cost) + '\n';
        amount += parseInt(props.item.delivery_cost);
        text += 'Total : ' + TransformPrice(amount);
      }
    }
    await Clipboard.setString(text !== '' ? text : 'N/A');
    showMessage({
      message: '',
      description: 'Order Details Copied!',
      type: 'success',
    });
  };

  return (
    <>
      <View style={styles.BoxStyle}>
        <View style={[styles.container, Styles.flexDirectionRow]}>
          <View style={[Styles.flex2Start, Styles.flexDirectionRow]}>
            <Text size={Mixins.scaleFont(12)} color={colors.TextColor}>
              {t('cn')} #
              {props.item.tracking_id ? props.item.tracking_id : 'N/A'}
            </Text>
            <TouchableOpacity
              style={styles.mL10}
              activeOpacity={0.5}
              onPress={copyToClipboard}>
              <MIcon name="content-copy" size={20} color={colors.TextColor} />
            </TouchableOpacity>
          </View>
          <View style={[Styles.flexCenter]}>
            <Text style={[Styles.mB5, styles.fS10]}>{t('cod.amount')}</Text>
          </View>
        </View>
        <OrderCard props={props} />
        <View
          style={[
            Styles.flexDirectionColumn,
            styles.pT10,
            Styles.flex,
            Styles.justifyContentStart,
            Styles.alignItemsStart,
            Styles.pH20,
          ]}>
          <View style={[Styles.flex2Start]}>
            <Text
              style={styles.fS12}
              size={Mixins.scaleFont(16)}
              weight="400"
              color={colors.TextColor}>
              Product Details
            </Text>
          </View>
          <View style={[Styles.flexCenter]}>
            <Text size={12} style={styles.mT5}>
              {props && props.item && props.item.order_products
                ? props.item.order_products.map(k => {
                    return (
                      <View style={styles.Outline}>
                        <View style={styles.textBox}>
                          <Text style={styles.text}>
                            {k && k.product && k.product.name
                              ? k.product.name
                              : 'N/A'}
                          </Text>
                        </View>
                        <View style={styles.textBox}>
                          <Text style={styles.text}>
                            {' '}
                            {k && k.product && k.product.code
                              ? k.product.code
                              : 'N/A'}
                          </Text>
                        </View>
                      </View>
                    );
                  })
                : null}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.tabBar]}>
        <View style={Styles.flexCenter}>
          <TouchableOpacity
            style={[styles.w50, tabIndex === 0 ? styles.bg : styles.bgLight]}
            onPress={() => setTabIndex(0)}>
            <Text
              style={[
                tabIndex === 0 ? styles.white : {color: colors.TextColor},
              ]}>
              Timeline
            </Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.flexCenter}>
          <TouchableOpacity
            style={[styles.w50, tabIndex === 1 ? styles.bg : styles.bgLight]}
            onPress={() => setTabIndex(1)}>
            <Text
              style={[
                tabIndex === 1 ? styles.white : {color: colors.TextColor},
              ]}>
              Activity
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {tabIndex === 0 && <OrderTimeline props={props} />}
      {tabIndex === 1 && <OrderActivity props={props} />}
    </>
  );
};

export default OrderDetail;
