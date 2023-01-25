import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Linking,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import {Text, Colors, Mixins, GlobalStyle} from '../../styles';
import {
  deviceWidth,
  deviceHeight,
  getFixedHeaderHeight,
} from '../../utils/orientation';
import moment from 'moment';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Clipboard from '@react-native-community/clipboard';
import {TransformPrice} from '../../utils/Parser';
import Feather from 'react-native-vector-icons/Feather';
import AIcon from 'react-native-vector-icons/AntDesign';
import {Routes} from '../../utils/constants';
import ActivitySelector from '../ActivitySelector';
import ActivityModal from '../ActivityModal';
import OrderProductDetails from '../OrderProductDetails';
import {useSelector} from 'react-redux';
import {CreateActivity} from '../../services/Activity';

const OrderListItem = props => {
  const navigation = useNavigation();
  const workspace_id = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const [loading, setLoading] = React.useState(false);
  const [visibleStatusChange, setStatusChangeVisibility] =
    React.useState(false);
  const [activityType, setActivityType] = React.useState('');
  const [visibleActivity, setActivityVisibility] = React.useState(false);
  const [visibleActivitySelector, setActivityVisibilitySelector] =
    React.useState(false);
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const Styles = GlobalStyle();
  const flashBox = useRef(null);

  const [visibleProduct, setProductVisibility] = React.useState(false);
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

  const obj2 = {
    trackingId:
      props && props.order && props.order.tracking_id
        ? props.order.tracking_id
        : null,
    date: '',
    orderId: props && props.item && props.item.id ? props.item.id : null,
    message: 'Fake reason',
    customerName:
      props && props.item && props.item.customer && props.item.customer.name
        ? props.item.customer.name
        : null,
    contact:
      props && props.item && props.item.customer && props.item.customer.contact
        ? props.item.customer.contact
        : null,
    notificationTimer: '',
    scheduledTime: '',
    workspaceId: workspace_id,
    subject: 'Refused By Consignee',
    // emailId: '',
    // // FormData && FormData.recipientGroup && FormData.recipientGroup.emailIds
    // //   ? FormData.recipientGroup.emailIds
    // //   : null,
    mailGroupId: '',
    name: 'call',
    type: 'confirmationCall',
    templateId: '63cf96a39059c3118a028079',
    status: '',
  };

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
  };
  const OpenActivity = type => {
    setTimeout(() => {
      ShowActivityModal();
    }, 1000);
    setLoading(true);
    CreateActivity(obj2).then(res => {
      if (res.status === 200) {
        setTimeout(() => {
          flashBox?.current?.showMessage({
            message: '',
            description: res.message,
            type: 'success',
          });
          setLoading(false);
        }, 1000);
      } else {
        flashBox?.current?.showMessage({
          message: '',
          description: res.message,
          type: 'danger',
        });
        setLoading(false);
      }
    });
    ShowActivityModal();

    openDialScreen();
  };

  const openDialScreen = () => {
    let phone =
      props.item.customer && props.item.customer.contact
        ? props.item.customer.contact
        : null;
    let number = '';
    if (Platform.OS === 'android') {
      number = `tel:${phone}`;
    } else {
      number = `telprompt:${phone}`;
    }
    Linking.canOpenURL(number)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(number);
        }
      })
      .catch(err => console.log(err, 'errroeee'));
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
            shadowOffset: {width: 0, height: 0.5},
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 5,
          },
        ]}>
        <View style={[Styles.flexDirectionRow, Styles.alignItemsCenter]}>
          <View style={[Styles.flex, Styles.justifyContentCenter]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate(Routes.SHOWORDER, {
                  order: props.item,
                  statuses: props.statuses,
                  users: props.users,
                  emailTemplates: props.emailTemplates,
                  mailingLists: props.mailingLists,
                  recipientGroup: props.recipientGroup,
                  userId: props.userId,
                  workspaceId: props.workspaceId,
                });
              }}>
              <View style={styles.inline}>
                <View>
                  <Text
                    style={{fontSize: 12}}
                    size={Mixins.scaleFont(16)}
                    weight="400"
                    color={colors.TextColor}>
                    CN #{' '}
                    {props.item.tracking_id ? props.item.tracking_id : 'N/A'}
                  </Text>
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
            </TouchableOpacity>
            <View style={{marginTop: 12}}>
              <View style={styles.inline}>
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontStyle: 'normal',
                    }}
                    weight="600"
                    color={colors.TextColor}>
                    {props.item.customer && props.item.customer.name
                      ? props.item.customer.name
                      : 'N/A'}{' '}
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
                      // ShowActivitySelectorModal();
                      OpenActivity();
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
          </View>
        </View>
        <View style={styles.hairline} />
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{fontWeight: '400', fontSize: 10, fontStyle: 'normal'}}
            color={colors.TextColor}>
            Product Details
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setProductVisibility(!visibleProduct);
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{width: 25, paddingRight: 5}}>
              {visibleProduct ? (
                <Feather
                  name="chevron-up"
                  size={25}
                  style={{color: colors.boxBorderColor}}
                />
              ) : (
                <Feather
                  name="chevron-down"
                  size={25}
                  style={{color: colors.boxBorderColor}}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
        {visibleProduct ? (
          <View style={[{marginTop: 20}]}>
            {props.item &&
            props.item.order_products &&
            props.item.order_products.length > 0 ? (
              props.item.order_products.map(o => (
                <OrderProductDetails key={o.id} item={o} />
              ))
            ) : (
              <View
                style={[
                  Styles.flexCenter,
                  {
                    height: (deviceHeight - getFixedHeaderHeight() - 100) / 12,
                  },
                ]}>
                <AIcon
                  name="warning"
                  color={colors.textColorLight}
                  size={40}
                  style={{paddingBottom: 10}}
                />
                <Text
                  style={{
                    color: colors.textColorLight,
                    fontSize: Mixins.scaleFont(16),
                    paddingBottom: 20,
                  }}>
                  Products Not Available
                </Text>
              </View>
            )}
          </View>
        ) : null}
      </View>

      <ActivityModal
        obj={obj2}
        visible={visibleActivity}
        order={props.item}
        statuses={props.statuses}
        customers={customersObj ? [customersObj] : []}
        statusId={
          props &&
          props.item &&
          props.item.last_checkpoint &&
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
      />
      <ActivitySelector
        visible={visibleActivitySelector}
        setVisibility={ActivitySelectorModelClose}
        openActivity={OpenActivity}
      />
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
      marginBottom: 5,
      marginTop: 15,
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
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 52,
      flexDirection: 'row',
    },
  });
};
export default OrderListItem;
