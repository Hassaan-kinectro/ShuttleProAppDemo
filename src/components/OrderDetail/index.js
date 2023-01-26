import React from 'react';
import {View, StyleSheet, Platform, Linking} from 'react-native';
import {Text, Colors, Mixins, GlobalStyle} from '../../styles';
import {deviceWidth} from '../../utils/orientation';
import {showMessage} from 'react-native-flash-message';
import moment from 'moment';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Clipboard from '@react-native-community/clipboard';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TransformPrice} from '../../utils/Parser';
import OrderActivity from '../../scenes/Orders/OrderActivity';
import OrderTimeline from '../../scenes/Orders/OrderTimeline';
const OrderDetail = props => {
  const navigation = useNavigation();
  const [visibleStatusChange, setStatusChangeVisibility] =
    React.useState(false);
  const [activityType, setActivityType] = React.useState('');
  const [visibleActivity, setActivityVisibility] = React.useState(false);
  const [visibleActivitySelector, setActivityVisibilitySelector] =
    React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [visibleProduct, setProductVisibility] = React.useState(false);
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const Styles = GlobalStyle();
  const ModelClose = React.useCallback(() => {
    setStatusChangeVisibility(false);
  }, [visibleStatusChange]);
  const ShowModal = React.useCallback(() => {
    setStatusChangeVisibility(true);
  }, [visibleStatusChange]);
  const ActivityModelClose = React.useCallback(() => {
    setActivityType('');
    setActivityVisibility(false);
  }, [visibleActivity]);
  const ShowActivityModal = React.useCallback(() => {
    setActivityVisibility(true);
  }, [visibleActivity]);
  const ActivitySelectorModelClose = React.useCallback(() => {
    setActivityVisibilitySelector(false);
  }, [visibleActivity]);
  const ShowActivitySelectorModal = React.useCallback(() => {
    setActivityVisibilitySelector(true);
  }, [visibleActivity]);
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
  const CopyPhoneNumberToClipboard = async () => {
    let text =
      props.item.customer && props.item.customer.contact
        ? props.item.customer.contact
        : 'N/A';
    await Clipboard.setString(text);
    showMessage({
      message: '',
      description: 'Phone Number Copied!',
      type: 'success',
    });
  };
  const CopyTrackingNumberToClipboard = async () => {
    let text = props.item.tracking_id ? props.item.tracking_id : 'N/A';
    await Clipboard.setString('Tracking Id : ' + text);
    showMessage({
      message: '',
      description: 'Tracking Id Copied!',
      type: 'success',
    });
  };
  const OpenActivity = type => {
    setActivityType(type);
    openDialScreen();
    ShowActivityModal();
  };
  const openDialScreen = () => {
    let phone =
      props.item.customer && props.item.customer.contact
        ? props.item.customer.contact
        : null;
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${phone}`;
    } else {
      number = `tel:${phone}`;
    }
    Linking.openURL(number);
  };
  let customersObj = props.item.customer
    ? Object.assign(props.item.customer, {
        label: props.item.customer.name,
        value: props.item.customer.id,
      })
    : null;

  return (
    <>
      <View
        style={[
          styles.listItem,
          {
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 5,
          },
        ]}>
        <View style={[Styles.flexDirectionRow, Styles.alignItemsCenter]}>
          <View style={[Styles.flex, Styles.justifyContentCenter]}>
            <View style={styles.inline}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{fontSize: 12}}
                  size={Mixins.scaleFont(16)}
                  weight="400"
                  color={colors.TextColor}>
                  CN # {props.item.tracking_id ? props.item.tracking_id : 'N/A'}
                </Text>
                <TouchableOpacity
                  style={{marginLeft: 10}}
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
                <Text style={[Styles.mB5, {fontSize: 10}]}>COD Amount</Text>
              </View>
            </View>
            <View style={styles.inline}>
              <View />
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontStyle: 'normal',
                    fontWeight: '600',
                  }}>
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
                  <TouchableOpacity
                    onPress={() => {
                      ShowActivitySelectorModal();
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontStyle: 'normal',
                        fontWeight: '600',
                        marginTop: 5,
                      }}>
                      Ph #{' '}
                      {props.item.customer && props.item.customer.contact
                        ? props.item.customer.contact
                        : 'N/A'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontStyle: 'normal',
                      fontWeight: '600',
                    }}>
                    {moment(props.item.updated_at).format('DD MMM, YYYY')}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginTop: 12}}>
              <View style={styles.inline}>
                <View>
                  <Text
                    style={{fontSize: 12}}
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
                  <Text
                    style={{
                      fontSize: 12,
                      fontStyle: 'normal',
                      fontWeight: '600',
                      marginTop: 5,
                    }}>
                    {props.item.customer && props.item.customer.address
                      ? props.item.customer.address
                      : 'N/A'}{' '}
                  </Text>
                </View>
                <View />
              </View>
            </View>
            <View style={{marginTop: 12}}>
              <View style={styles.inline}>
                <View>
                  <Text
                    style={{fontSize: 12}}
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
          style={[
            styles.w50,
            tabIndex === 0
              ? {backgroundColor: '#5285D4'}
              : {backgroundColor: colors.LightBackground},
          ]}
          onPress={() => setTabIndex(0)}>
          <Text
            style={[
              tabIndex === 0 ? {color: '#fff'} : {color: colors.TextColor},
            ]}>
            Timeline
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.w50,
            tabIndex === 1
              ? {backgroundColor: '#5285D4'}
              : {backgroundColor: colors.LightBackground},
          ]}
          onPress={() => setTabIndex(1)}>
          <Text
            style={[
              tabIndex === 1 ? {color: '#fff'} : {color: colors.TextColor},
            ]}>
            Activity
          </Text>
        </TouchableOpacity>
      </View>

      {tabIndex === 0 && <OrderTimeline props={props} />}
      {tabIndex === 1 && <OrderActivity props={props} />}

      {/* <ChangeOrderStatusModal
        visible={visibleStatusChange}
        statuses={props.statuses}
        id={props.item.id}
        setVisibility={ModelClose}
      />
      <ActivitySelector
        visible={visibleActivitySelector}
        setVisibility={ActivitySelectorModelClose}
        openActivity={OpenActivity}
      />
      <ActivityModal
        visible={visibleActivity}
        statuses={props.statuses}
        customers={customersObj ? [customersObj] : []}
        statusId={
          props &&
          props.item &&
          props.item.last_checkpoints &&
          props.item.last_checkpoint.status
        }
        id={props.item.id}
        activityType={activityType}
        users={props.users}
        emailTemplates={props.emailTemplates}
        mailingLists={props.mailingLists}
        recipientGroups={props.recipientGroup}
        userId={props.userId}
        setVisibility={ActivityModelClose}
      /> */}
    </>
  );
};
const useStyles = colors => {
  return StyleSheet.create({
    listItem: {
      // height: 140,
      width: deviceWidth - 20,
      backgroundColor: colors.boxColor,
      padding: 8,
      borderWidth: 0.5,
      borderRadius: 20,
      borderColor: colors.boxBorderColor,
      // marginBottom: 5,
      // marginTop: 0,
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
      //   marginTop: 15,
      padding: 10,
      //   backgroundColor: colors.LightBackground,
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
  });
};

export default OrderDetail;
