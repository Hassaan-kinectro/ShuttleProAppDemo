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
  }, [route.params.order]);

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
          {loading ? (
            <View style={[Styles.flexCenter, Styles.primaryBackground]}>
              <Loader />
            </View>
          ) : (
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
