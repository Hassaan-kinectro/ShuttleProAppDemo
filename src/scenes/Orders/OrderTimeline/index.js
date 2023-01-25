import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Text, Spinner, Colors, GlobalStyle} from '../../../styles';
import {getOrderDetail, getOrderStatus} from '../../../services/Order';
import {showMessage} from 'react-native-flash-message';
import {deviceWidth} from '../../../utils/orientation';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Badge, Line, RedBadge} from '../../../utils/imagesPath';

const RowItem = item => {
  const {colors} = useTheme();
  const Styles = GlobalStyle();
  const styles = useStyles(colors);

  return (
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
          source={
            item && item.item && item.item.status === 'success'
              ? Badge
              : RedBadge
          }
          style={{width: 30, height: 30, marginBottom: 3}}
        />
        <Image source={Line} style={{width: 1, height: 30}} />
      </View>
      <View style={[styles.boxContainer]}>
        <View>
          <View>
            <Text
              lines={1}
              style={{
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: 12,
                fontFamily: 'Raleway',
              }}>
              {item.item.createdAt
                ? moment(item.item.createdAt).format('DD MMM YYYY | hh:mm')
                : moment(item.item.created_at).format('YYYY-MM-DD hh:mm:ss')}
            </Text>
          </View>
          <View style={[styles.fieldWidth]}>
            <Text lines={8}>{item.item.status_value}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const OrderTimeline = props => {
  const workspace_id = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  console.log(workspace_id);
  const [loading, setLoading] = React.useState(false);
  const [orderDetail, setOrderDetail] = React.useState({});
  const {colors} = useTheme();
  const Styles = GlobalStyle();
  const styles = useStyles(colors);

  React.useEffect(() => {
    getData();
  }, [props.props.item]);
  let order_id;
  const getData = async () => {
    setLoading(true);
    if (props && props.props && props.props.item && props.props.item.id) {
      order_id = JSON.stringify(props.props.item.id);
      getOrderDetail(order_id, workspace_id).then(res => {
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data);
            setOrderDetail(res.data);
          }
        }
        setLoading(false);
      });
    }
  };

  const GetBookedOrderStatus = () => {
    if (props && props.props && props.props.item && props.props.item.id) {
      order_id = props.props.item.id;
      setLoading(true);
      getOrderStatus(order_id, workspace_id).then(res => {
        console.log('helloo');
        if (res.status === 200) {
          showMessage({
            message: '',
            description: res.message,
            type: 'success',
          });
          getData();
        } else {
          showMessage({
            message: '',
            description: res.message,
            type: 'danger',
          });
        }
      });
      setLoading(false);
    }
  };
  return (
    <View style={[Styles.flex, Styles.flexDirectionColumn, {height: 350}]}>
      <View
        style={[
          Styles.flex,
          {
            margin: 20,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.boxBorderColor,
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
                {orderDetail &&
                orderDetail.checkpoints &&
                orderDetail.checkpoints.length > 0 ? (
                  orderDetail.checkpoints.map(o => (
                    <RowItem key={o.id} item={o} />
                  ))
                ) : (
                  <View style={Styles.flexCenter}>
                    <Text style={{fontSize: 15}}>Timeline not available</Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        )}

        <TouchableOpacity
          onPress={GetBookedOrderStatus}
          style={[Styles.flexCenter, Styles.floatButton, {opacity: 0.5}]}>
          <MIcon
            style={{opacity: 1}}
            name="update"
            size={30}
            color={Colors.WHITE}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const useStyles = colors => {
  return StyleSheet.create({
    container: {
      padding: 5,
      paddingTop: 20,
    },
    dot: {
      width: 40,
      height: 40,
      justifyContent: 'center',
    },
    dotStyle: {
      width: 24,
      height: 24,
      backgroundColor: colors.icon,
      borderRadius: 12,
    },
    fieldWidth: {
      width: (deviceWidth - 60) / 2,
      // alignItems: 'center',
      justifyContent: 'center',
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

export default OrderTimeline;
