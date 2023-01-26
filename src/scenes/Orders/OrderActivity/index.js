import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import {Text, Spinner, Colors, GlobalStyle} from '../../../styles';

import {
  deviceWidth,
  deviceHeight,
  IS_ANDROID,
  IS_IOS,
} from '../../../utils/orientation';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityModal from '../../../components/ActivityModal';
import moment from 'moment';

import {useTheme} from '@react-navigation/native';
import {
  FetchActivities,
  FetchActivitiesByOrderId,
} from '../../../services/Activity';
import {useSelector} from 'react-redux';
import {Badge, Line, RedBadge} from '../../../utils/imagesPath';
import ActivitySelector from '../../../components/ActivitySelector';
const RowItem = ({item, contact}) => {
  const [visibleActivitySelector, setActivityVisibilitySelector] =
    React.useState(false);
  const [visibleActivity, setActivityVisibility] = React.useState(false);

  const [activityType, setActivityType] = React.useState('');

  const ActivitySelectorModelClose = React.useCallback(() => {
    setActivityVisibilitySelector(false);
  }, [visibleActivity]);
  const ShowActivityModal = React.useCallback(() => {
    setActivityVisibility(true);
  }, [visibleActivity]);
  const ShowActivitySelectorModal = React.useCallback(() => {
    setActivityVisibilitySelector(true);
  }, [visibleActivity]);
  const OpenActivity = type => {
    setActivityType(type);
    openDialScreen();
    ShowActivityModal();
  };

  const openDialScreen = () => {
    let phone = contact ? contact : null;
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
      .catch(err => console.log(err));
  };
  const {colors} = useTheme();
  const Styles = GlobalStyle();
  const styles = useStyles(colors);
  return (
    <>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
            marginLeft: 10,
          }}>
          <Image
            source={item && item.status === 'success' ? Badge : RedBadge}
            style={{width: 30, height: 30, marginBottom: 3}}
          />
          <Image source={Line} style={{width: 1, height: 30}} />
        </View>
        <View style={[styles.boxContainer]}>
          <View style={{justifyContent: 'space-between', display: 'flex'}}>
            <View>
              <Text
                lines={1}
                style={{
                  fontWeight: '500',
                  fontStyle: 'normal',
                  fontSize: 12,
                  fontFamily: 'Raleway',
                  marginBottom: 5,
                }}>
                {item.createdAt
                  ? moment(item.createdAt).format('DD MMM YYYY | hh:mm')
                  : moment(item.created_at).format('YYYY-MM-DD hh:mm:ss')}
              </Text>
            </View>
            <View style={[styles.fieldWidth]}>
              <Text lines={10} style={{marginBottom: 5}}>
                {item.message}
              </Text>
            </View>
            <View style={[styles.fieldWidth]}>
              <TouchableOpacity
                onPress={() => {
                  ShowActivitySelectorModal();
                }}>
                <Text lines={1}>{contact}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ActivitySelector
          visible={visibleActivitySelector}
          setVisibility={ActivitySelectorModelClose}
          openActivity={OpenActivity}
        />
      </View>
    </>
  );
};

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
  const [activityType, setActivityType] = React.useState('');
  const [visibleActivity, setActivityVisibility] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const {colors} = useTheme();
  const Styles = GlobalStyle();
  const styles = useStyles(colors);
  React.useEffect(() => {
    getData();
  }, []);
  let order_id;
  const getData = async () => {
    setLoading(true);
    if (props && props.props && props.props.item && props.props.item.id) {
      order_id = props.props.item.id;
      // order_id = 10822;
      FetchActivitiesByOrderId(workspace_id, order_id).then(res => {
        if (res.status === 200) {
          if (res && res.data) {
            setOrderDetail(res.data);
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      });
    }
  };

  const ActivityModelClose = React.useCallback(() => {
    setActivityType('');
    setActivityVisibility(false);
  }, [visibleActivity]);
  const ShowActivityModal = React.useCallback(() => {
    setActivityVisibility(true);
  }, [visibleActivity]);
  const refreshServices = () => {
    setRefreshing(true);
    setTimeout(() => {
      getData();
      setRefreshing(false);
    }, 500);
  };

  let customersObj =
    props && props.props && props.props.item && props.props.item.customer
      ? Object.assign(props.props.item.customer, {
          label: props.props.item.customer.name,
          value: props.props.item.customer.id,
        })
      : null;
  return (
    <>
      <View
        style={[Styles.flex, Styles.flexDirectionColumn, styles.ActivityBox]}>
        <View
          style={[
            Styles.flex,
            {
              margin: 20,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.boxBorderColor,
              //   shadowOffset: {width: 0, height: 0.6},
              //   shadowOpacity: 0.2,
              //   shadowRadius: 6,
            },
          ]}>
          {loading ? (
            <View style={[Styles.flexCenter]}>
              <ActivityIndicator
                type={'ThreeBounce'}
                size={30}
                color={colors.TextColor}
              />
            </View>
          ) : (
            <ScrollView style={[]}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={styles.container}>
                  {orderDetail && orderDetail.length > 0 ? (
                    orderDetail.map(o => (
                      <RowItem key={o.id} item={o} contact={contact} />
                    ))
                  ) : (
                    <View style={Styles.flexCenter}>
                      <Text style={{fontSize: 15}}>
                        Activites Not Available
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
              style={{opacity: 1}}
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
        customers={customersObj ? [customersObj] : []}
        id={props && props.props && props.props.item && props.props.item.id}
        activityType={activityType}
        users={props.props.users}
        emailTemplates={props.props.emailTemplates}
        mailingLists={props.props.mailingLists}
        recipientGroups={props.props.recipientGroup}
        userId={props.props.userId}
        setVisibility={ActivityModelClose}
        refreshServices={refreshServices}
      />
    </>
  );
};
const useStyles = colors => {
  return StyleSheet.create({
    ActivityBox: {height: IS_IOS ? deviceHeight - 550 : deviceHeight - 500},
    container: {
      padding: 5,
      paddingTop: 20,
    },
    fieldWidth: {
      width: deviceWidth - 230,
    },
    leftWidth: {
      width: 140,
    },
    boxContainer: {
      backgroundColor: colors.boxColor,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 20,
      borderWidth: 1,
      marginBottom: 30,
      marginLeft: 20,
      marginRight: 20,
      borderColor: colors.boxBorderColor,
    },
  });
};

export default OrderActivity;
