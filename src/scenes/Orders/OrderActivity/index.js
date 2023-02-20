/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import useStyles from './styles';
import {Text, Colors, GlobalStyle} from '../../../styles';
import {FONT_FAMILY} from '../../../utils/constants';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityModal from '../../../components/ActivityModal';
import {getData} from './helper';
import {useSelector} from 'react-redux';
import Loader from '../../../components/Loader';
import RowItem from '../../../components/RowItem';
import {useTranslation} from 'react-i18next';
import {WarningIcon} from '../../../icons';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const OrderActivity = props => {
  let contact;
  if (
    props &&
    props.props &&
    props.props.item &&
    props.props.item.customer &&
    props.props.item.customer.contact
  ) {
    contact = props.props.item.customer.contact;
  }
  const workspace_id = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const {colors} = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [orderDetail, setOrderDetail] = React.useState({});
  const [visibleActivity, setActivityVisibility] = React.useState(false);
  const Styles = GlobalStyle();
  const styles = useStyles();
  const {t} = useTranslation();

  React.useEffect(() => {
    getData(props, setOrderDetail, setLoading, workspace_id);
    return () => {
      setOrderDetail({});
    };
  }, []);

  const ActivityModelClose = React.useCallback(
    data => {
      console.log(data);
      if (data && data.id) {
        getData(props, setOrderDetail, setLoading, workspace_id);
      }
      setActivityVisibility(false);
    },
    [visibleActivity],
  );
  const ShowActivityModal = React.useCallback(() => {
    setActivityVisibility(true);
  }, [visibleActivity]);

  return (
    <>
      <View style={[Styles.flex, Styles.flexDirectionColumn]}>
        <View style={[Styles.flexCenterEnd, styles.buttonContainerStyle]}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.9}}
            colors={['#139A5C', '#3662A8']}
            style={styles.linearGradient}>
            <TouchableOpacity onPress={ShowActivityModal}>
              <MIcon
                style={styles.opacity}
                name="plus"
                size={22}
                color={Colors.WHITE}
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={[styles.boxContainer]}>
          {loading ? (
            <View style={[Styles.flexCenter]}>
              <Loader />
            </View>
          ) : (
            <View style={styles.container}>
              {orderDetail && orderDetail.length > 0 ? (
                orderDetail.map(o => (
                  <RowItem key={o.id} item={o} contact={contact} />
                ))
              ) : (
                <View
                  style={[
                    Styles.flexCenter,
                    {fontFamily: FONT_FAMILY.REGULAR},
                  ]}>
                  <WarningIcon
                    color={colors.textColorLight}
                    size={40}
                    style={Styles.pB10}
                  />
                  <Text fontFamily={FONT_FAMILY.REGULAR} lines={12}>
                    {t('activities.not.available')}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
      <ActivityModal
        visible={visibleActivity}
        order={props && props.props && props.props.item}
        workspaceId={workspace_id}
        id={props && props.props && props.props.item && props.props.item.id}
        users={props.props.users}
        emailTemplates={props.props.emailTemplates}
        mailingLists={props.props.mailingLists}
        recipientGroups={props.props.recipientGroup}
        userId={props.props.userId}
        setVisibility={ActivityModelClose}
      />
    </>
  );
};

export default OrderActivity;
