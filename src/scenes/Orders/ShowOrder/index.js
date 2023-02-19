/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import {GlobalStyle} from '../../../styles';
import OrderDetail from '../../../components/OrderDetail';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Light, Dark} from '../../../utils/imagesPath';
import CustomHeader from '../../../components/CustomHeader';
import Wrapper from '../../../components/Wrapper';
import {getData} from './helper';
import Loader from '../../../components/Loader';
const ShowOrder = ({navigation, route}) => {
  const workspace_id = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const theme = useSelector(state => state.themeChange.theme);
  const [loading, setLoading] = React.useState(false);
  const [orderDetail, setOrderDetail] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const {
    params: {order, emailTemplates, recipientGroup},
  } = route;
  const {colors} = useTheme();
  const Styles = GlobalStyle();

  React.useEffect(() => {
    getData(route, setLoading, setOrderDetail, workspace_id);
    return () => {
      setOrderDetail({});
    };
  }, [route.params.order]);

  const refreshServices = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };
  const name = 'Order';
  return (
    <>
      <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
        <CustomHeader name={name} navigation={navigation} />
        <View style={[Styles.flex]}>
          {loading ? (
            <View style={[Styles.flexCenter]}>
              <Loader />
            </View>
          ) : (
            <ScrollView style={[Styles.pT10]}>
              <OrderDetail
                item={order}
                orderDetail={orderDetail}
                emailTemplates={emailTemplates}
                recipientGroup={recipientGroup}
              />
            </ScrollView>
          )}
        </View>
      </Wrapper>
    </>
  );
};

export default ShowOrder;
