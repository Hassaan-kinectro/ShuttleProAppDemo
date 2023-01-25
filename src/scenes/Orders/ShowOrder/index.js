import React from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Text, Spinner, GlobalStyle} from '../../../styles';
import OrderDetail from '../../../components/OrderDetail';
import OrderListItem from '../../../components/OrderListItem';
import {showMessage} from 'react-native-flash-message';
import {
  getOrderDetail,
  cancelOrder,
  getOrderStatus,
} from '../../../services/Order';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Light, Dark, HeaderBG} from '../../../utils/imagesPath';
import CustomHeader from '../../../components/CustomHeader';
import Wrapper from '../../../components/Wrapper';

const ShowOrder = ({navigation, route}) => {
  const workspace_id = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const theme = useSelector(state => state.themeChange.theme);

  const [loading, setLoading] = React.useState(true);
  const [orderDetail, setOrderDetail] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const {
    params: {
      order,
      statuses,
      users,
      emailTemplates,
      mailingLists,
      recipientGroup,
    },
  } = route;
  const {colors} = useTheme();
  const Styles = GlobalStyle();

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
    getData();
  }, [route.params.order]);
  const getData = async () => {
    console.log(route.params.order);
    if (route.params.order && route.params.order.id) {
      getOrderDetail(route.params.order.id, workspace_id).then(res => {
        if (res.status === 200) {
          console.log(res.status);
          if (res.data) {
            console.log(res.data);
            setOrderDetail(res.data);
          }
        }
      });
    }
  };
  if (loading) {
    return (
      <View style={[Styles.flexCenter, Styles.primaryBackground]}>
        <ActivityIndicator
          type={'ThreeBounce'}
          size={30}
          color={colors.TextColor}
        />
      </View>
    );
  }
  const cancelBookedOrder = order_id => {
    cancelOrder(order_id, workspace_id).then(res => {
      if (res.status === 200) {
        showMessage({
          message: '',
          description: res.message,
          type: 'success',
        });
      } else {
        showMessage({
          message: '',
          description: res.message,
          type: 'danger',
        });
      }
    });
  };
  const refreshServices = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };
  const name = 'Orders';
  return (
    <>
      <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
        <CustomHeader name={name} navigation={navigation} />
        <View style={[Styles.flex]}>
          <ScrollView
            style={[Styles.pL10, Styles.pR10]}
            refreshControl={
              <RefreshControl
                colors={[colors.spinner]}
                tintColor={colors.spinner}
                refreshing={refreshing}
                onRefresh={refreshServices}
              />
            }>
            <View style={{height: 20}} />
            <OrderDetail
              item={order}
              cancelOrder={cancelBookedOrder}
              orderDetail={orderDetail}
              statuses={statuses}
              users={users}
              emailTemplates={emailTemplates}
              mailingLists={mailingLists}
              recipientGroup={recipientGroup}
            />
          </ScrollView>
        </View>
      </Wrapper>
    </>
  );
};

export default ShowOrder;
