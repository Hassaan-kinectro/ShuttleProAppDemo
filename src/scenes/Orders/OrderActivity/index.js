import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
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
  const [loading, setLoading] = React.useState(false);
  const [orderDetail, setOrderDetail] = React.useState({});
  const [visibleActivity, setActivityVisibility] = React.useState(false);
  const Styles = GlobalStyle();
  const styles = useStyles();
  const {t} = useTranslation();

  React.useEffect(() => {
    getData(props, setOrderDetail, setLoading, workspace_id);
  }, []);

  const ActivityModelClose = React.useCallback(() => {
    setActivityVisibility(false);
  }, [visibleActivity]);
  const ShowActivityModal = React.useCallback(() => {
    setActivityVisibility(true);
  }, [visibleActivity]);

  return (
    <>
      <View
        style={[Styles.flex, Styles.flexDirectionColumn, styles.ActivityBox]}>
        <View style={[Styles.flex, styles.main]}>
          {loading ? (
            <View style={[Styles.flexCenter]}>
              <Loader />
            </View>
          ) : (
            <ScrollView style={[]}>
              <View style={[Styles.flex, Styles.flexDirectionRow]}>
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
                      <Text style={styles.fS15}>
                        {t('activities.not.available')}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          )}
          <TouchableOpacity
            onPress={ShowActivityModal}
            style={[Styles.flexCenter, Styles.floatButton]}>
            <MIcon
              style={styles.opacity}
              name="plus"
              size={30}
              color={Colors.WHITE}
            />
          </TouchableOpacity>
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
