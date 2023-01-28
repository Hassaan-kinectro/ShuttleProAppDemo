import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Colors, Mixins, GlobalStyle} from '../../styles';
import {deviceWidth} from '../../utils/orientation';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Clipboard from '@react-native-community/clipboard';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TransformPrice} from '../../utils/Parser';
import OrderActivity from '../../scenes/Orders/OrderActivity';
import OrderTimeline from '../../scenes/Orders/OrderTimeline';

const OrderDetail = props => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const Styles = GlobalStyle();

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
      <View style={[styles.listItem]}>
        <View
          style={[
            Styles.flexDirectionRow,
            Styles.alignItemsCenter,
            styles.mT10,
          ]}>
          <View style={[Styles.flex, Styles.justifyContentCenter]}>
            <View style={styles.inline}>
              <View style={Styles.flexDirectionRow}>
                <Text style={styles.fS12} weight="400" color={colors.TextColor}>
                  CN # {props.item.tracking_id ? props.item.tracking_id : 'N/A'}
                </Text>
                <TouchableOpacity
                  style={styles.mL10}
                  activeOpacity={0.5}
                  onPress={copyToClipboard}>
                  <MIcon
                    name="content-copy"
                    size={20}
                    color={colors.TextColor}
                    onPress={copyToClipboard}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={[Styles.mB5, styles.fS10]}>COD Amount</Text>
              </View>
            </View>
            <View style={styles.inline}>
              <View />
              <View>
                <Text style={styles.font}>
                  {props.item.cod_amount
                    ? TransformPrice(props.item.cod_amount)
                    : 'N/A'}
                  .00
                </Text>
              </View>
            </View>
            <View style={{marginTop: 12}}>
              <View style={styles.inline}>
                <View>
                  <Text
                    style={{fontSize: 12}}
                    size={Mixins.scaleFont(16)}
                    weight="600"
                    color={colors.TextColor}>
                    {props.item.customer && props.item.customer.name
                      ? props.item.customer.name
                      : 'N/A'}
                  </Text>
                </View>
                <View>
                  <Text style={[Styles.mB5, {fontSize: 10}]}>Booking Date</Text>
                </View>
              </View>
              <View style={styles.inline}>
                <View>
                  <TouchableOpacity onPress={() => {}}>
                    <Text style={[styles.font, styles.mT5]}>
                      Ph #{' '}
                      {props.item.customer && props.item.customer.contact
                        ? props.item.customer.contact
                        : 'N/A'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.font}>
                    {moment(props.item.updated_at).format('DD MMM, YYYY')}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.mT12}>
              <View style={styles.inline}>
                <View>
                  <Text
                    style={styles.fS12}
                    size={Mixins.scaleFont(16)}
                    weight="400"
                    color={colors.TextColor}>
                    Address
                  </Text>
                </View>
                <View />
              </View>
              <View style={styles.inline}>
                <View>
                  <Text style={[styles.font, styles.mT5]}>
                    {props.item.customer && props.item.customer.address
                      ? props.item.customer.address
                      : 'N/A'}{' '}
                  </Text>
                </View>
                <View />
              </View>
            </View>
            <View style={styles.mT12}>
              <View style={styles.inline}>
                <View>
                  <Text
                    style={styles.fS12}
                    size={Mixins.scaleFont(16)}
                    weight="400"
                    color={colors.TextColor}>
                    Product Details
                  </Text>
                </View>
                <View />
              </View>
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
            </View>
          </View>
        </View>
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.w50, tabIndex === 0 ? styles.bg : styles.bgLight]}
          onPress={() => setTabIndex(0)}>
          <Text
            style={[tabIndex === 0 ? styles.white : {color: colors.TextColor}]}>
            Timeline
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.w50, tabIndex === 1 ? styles.bg : styles.bgLight]}
          onPress={() => setTabIndex(1)}>
          <Text
            style={[tabIndex === 1 ? styles.white : {color: colors.TextColor}]}>
            Activity
          </Text>
        </TouchableOpacity>
      </View>
      {tabIndex === 0 && <OrderTimeline props={props} />}
      {tabIndex === 1 && <OrderActivity props={props} />}
    </>
  );
};
const useStyles = colors => {
  return StyleSheet.create({
    listItem: {
      width: deviceWidth - 30,
      backgroundColor: colors.boxColor,
      padding: 8,
      borderWidth: 0.5,
      borderRadius: 20,
      borderColor: colors.boxBorderColor,
      marginBottom: 5,
      marginHorizontal: 5,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
    },
    TrackingId: {
      width: deviceWidth - 100,
    },
    halfWidth: {
      width: (deviceWidth - 40) / 2,
    },
    inlineText: {
      width: (deviceWidth - 130) / 2,
    },
    textAlignment: {
      textAlign: 'right',
      alignSelf: 'stretch',
      textAlignVertical: 'center',
    },
    copyIcon: {
      position: 'absolute',
      top: 0,
      right: 5,
      justifyContent: 'space-between',
      width: 40,
    },
    dot: {
      backgroundColor: Colors.CURIOUS_BLUE,
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 10,
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
      flexWrap: 'wrap',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 52,
      flexDirection: 'row',
    },
    Outline: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginLeft: 10,
      flexDirection: 'row',
      marginVertical: 10,
    },
    textBox: {
      backgroundColor: colors.LightBackground,
      color: '#5285D4',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 5,
      borderColor: colors.LightBackground,
      borderRadius: 10,
      marginRight: 10,
    },
    text: {
      color: '#5285D4',
      borderColor: colors.LightBackground,
      borderRadius: 10,
    },
    w50: {
      padding: 10,
      alignItems: 'center',
      width: (deviceWidth - 40) / 2,
      borderRadius: 120,
      borderWidth: 1,
      borderColor: colors.LightBackground,
    },
    tabBar: {
      display: 'flex',
      justifyContent: 'space-between',
      AlignItems: 'center',
      flexDirection: 'row',
      backgroundColor: colors.LightBackground,
      padding: 3,
      marginTop: 15,
      borderRadius: 150,
    },
    mT10: {
      marginTop: 10,
    },
    fS12: {
      fontSize: 12,
    },
    fS10: {
      fontSize: 12,
    },
    mL10: {
      marginLeft: 10,
    },
    font: {
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: '600',
    },
    mT12: {marginTop: 12},
    mT5: {marginTop: 5},
    bg: {backgroundColor: '#5285D4'},
    bgLight: {backgroundColor: colors.LightBackground},
    white: {color: '#fff'},
  });
};

export default OrderDetail;
