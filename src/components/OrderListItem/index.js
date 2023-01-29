/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useRef} from 'react';
import {View} from 'react-native';
import {Text, Mixins, GlobalStyle} from '../../styles';
import {deviceHeight, getFixedHeaderHeight} from '../../utils/orientation';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AIcon from 'react-native-vector-icons/AntDesign';
import {Routes} from '../../utils/constants';
import ActivitySelector from '../ActivitySelector';
import ActivityModal from '../ActivityModal';
import OrderProductDetails from '../OrderProductDetails';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {CreateActivity} from '../../services/Activity';
import useStyles from './styles';
import {openDialScreen} from '../RowItem/helper';
import OrderCard from './orderCard';

const OrderListItem = props => {
  let contact =
    props.item.customer && props.item.customer.contact
      ? props.item.customer.contact
      : null;
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const {colors} = useTheme();
  const styles = useStyles();
  const Styles = GlobalStyle();
  const flashBox = useRef(null);
  const [visibleActivity, setActivityVisibility] = React.useState(false);
  const [visibleActivitySelector, setActivityVisibilitySelector] =
    React.useState(false);
  const workspace_id = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const [visibleProduct, setProductVisibility] = React.useState(false);
  const ActivityModelClose = React.useCallback(() => {
    setActivityVisibility(false);
  }, [visibleActivity]);
  const ShowActivityModal = React.useCallback(() => {
    setActivityVisibility(true);
  }, [visibleActivity]);
  const ActivitySelectorModelClose = React.useCallback(() => {}, []);

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
    mailGroupId: '',
    name: 'call',
    type: 'confirmationCall',
    templateId: '63cf96a39059c3118a028079',
    status: '',
  };
  const OpenActivity = () => {
    setLoading(true);
    setTimeout(() => {
      ShowActivityModal();
    }, 1000);
    CreateActivity(obj2);
    ShowActivityModal();
    openDialScreen(contact);
  };

  return (
    <>
      <View style={styles.BoxStyle}>
        <View style={[styles.container, Styles.flexDirectionRow, styles.pT21]}>
          <View style={[Styles.flex2Start]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate(Routes.SHOWORDER, {
                  order: props.item,
                  emailTemplates: props.emailTemplates,
                  recipientGroup: props.recipientGroup,
                });
              }}>
              <Text
                size={Mixins.scaleFont(12)}
                style={{fontWeight: '400'}}
                color={colors.TextColor}>
                {t('cn')} #
                {props.item.tracking_id ? props.item.tracking_id : 'N/A'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[Styles.flexCenter]}>
            <Text style={[Styles.mB5, styles.fS10]}>{t('cod.amount')}</Text>
          </View>
        </View>
        <OrderCard props={props} OpenActivity={OpenActivity} />
        <View style={styles.hairline} />
        <View style={styles.productContainer}>
          <Text size={10} color={colors.TextColor}>
            {t('product.details')}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setProductVisibility(!visibleProduct);
          }}>
          <View style={styles.center}>
            <View style={(styles.width25, styles.pR5)}>
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
          <View style={styles.mT20}>
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
                    height: (deviceHeight - getFixedHeaderHeight() - 100) / 8,
                  },
                ]}>
                <AIcon
                  name="warning"
                  color={colors.textColorLight}
                  size={40}
                  style={styles.pB10}
                />
                <Text style={styles.errorText}>Products Not Available</Text>
              </View>
            )}
          </View>
        ) : null}
      </View>

      <ActivityModal
        obj={obj2}
        visible={visibleActivity}
        order={props.item}
        id={props.item.id}
        emailTemplates={props.emailTemplates}
        recipientGroups={props.recipientGroup}
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

export default OrderListItem;
