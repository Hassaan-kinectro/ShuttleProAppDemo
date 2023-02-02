/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {onRefresh, getRecord} from './helper';
import {Text, GlobalStyle, Colors} from '../../styles';
import AIcon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {Light, Dark} from '../../utils/imagesPath';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import useStyles from './styles';
import {deviceHeight, getFixedHeaderHeight} from '../../utils/orientation';
import {isArray, orderBy} from 'lodash';
import {GetOrdersByFilter} from '../../services/Order';
import {useSelector} from 'react-redux';
import OrderListItem from '../../components/OrderListItem';
import CustomHeader from '../../components/CustomHeader';
import Loader from '../../components/Loader';
import Wrapper from '../../components/Wrapper';

const OrderScreen = ({navigation, route}) => {
  console.log();
  const theme = useSelector(state => state.themeChange.theme);
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );

  const [allOrders, setAllOrders] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [lastIndex, changeLastIndex] = React.useState(0);
  const [page, changePage] = React.useState(1);
  const [stop, changeStop] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [sending, setCallStatus] = React.useState(false);
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [filter, setfilters] = React.useState({
    startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    status_type_data: 1,
  });
  const [emailTemplates, setEmailTemplates] = React.useState([]);
  const [recipientGroup, setRecipientGroup] = React.useState([]);
  const Styles = GlobalStyle();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const styles = useStyles(colors);
  const offset = 20;
  const totalFetch = 1000;

  React.useEffect(() => {
    getRecord(setEmailTemplates, setRecipientGroup, workspaceId);
    if (route.params && route.params.startDate) {
      setOrders([]);
      setAllOrders([]);
      changeLastIndex(0);
      changePage(1);
      changeStop(false);
      getOrdersList(1, route.params);
      setfilters(route.params);
    } else {
      getOrdersList();
    }
  }, [route.params]);

  const getOrdersList = (p, f) => {
    if (!p) {
      p = page;
      f = filter;
    }
    if (!stop) {
      setLoading(true);
      setCallStatus(true);
      GetOrdersByFilter(workspaceId, p, totalFetch, f).then(res => {
        if (res.status === 200 && isArray(res.data) && res.data.length > 0) {
          let newOrders = res.data,
            lastOrders = orders,
            lastRem = 0;
          if (lastOrders.length > 0 && lastIndex !== 0) {
            lastOrders.splice(0, lastIndex);
          }
          if (newOrders.length !== offset) {
            lastRem = newOrders.length;
          }
          newOrders = lastOrders.concat(newOrders);
          const totalLength = page * offset;
          setOrders(orderBy(newOrders.slice(0, totalLength), ['id'], ['asc']));
          setAllOrders(newOrders);
          changeLastIndex(lastRem);
          changePage(newOrders.length < totalLength ? page : page + 1);
          changeStop(lastRem !== 0);
          setLoading(false);
          setCallStatus(false);
        } else {
          setLoading(false);
          setCallStatus(false);
        }
      });
    }
  };
  const handleLoadMore = () => {
    if (page !== 1 && !sending && orders.length > 0) {
      if (orders && allOrders && orders.length >= allOrders.length) {
        return false;
      }
      setLoading(true);
      setCallStatus(true);
      setTimeout(() => {
        const totalLength = page * offset;
        changePage(page + 1);
        setOrders(
          orderBy(
            allOrders.slice(
              0,
              totalLength <= allOrders.length ? totalLength : allOrders.length,
            ),
          ),
        );
        setCallStatus(false);
        setLoading(false);
      }, 500);
    }
  };

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return (
      <View
        style={[
          Styles.flexCenter,
          Styles.justifyContentCenter,
          Styles.alignItemsCenter,
          styles.height,
        ]}>
        <Loader />
      </View>
    );
  };

  const name = 'Orders';
  return (
    <>
      <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
        <CustomHeader name={name} navigation={navigation} />
        <View style={[Styles.flex]}>
          {loading ? (
            <Loader />
          ) : (
            <FlatList
              contentContainerStyle={styles.listContainer}
              data={orders}
              extraData={loading}
              removeClippedSubviews={true}
              maxToRenderPerBatch={20}
              initialNumToRender={20}
              windowSize={100}
              keyExtractor={(item, index) => `${index}`}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={() =>
                    onRefresh(
                      workspaceId,
                      totalFetch,
                      filter,
                      page,
                      offset,
                      isArray,
                      setOrders,
                      orderBy,
                      setRefreshing,
                      GetOrdersByFilter,
                      setAllOrders,
                    )
                  }
                  colors={[colors.themeIcon]}
                  tintColor={colors.themeIcon}
                />
              }
              ListEmptyComponent={() =>
                !loading && orders.length === 0 ? (
                  <View
                    style={[
                      Styles.flexCenter,
                      {
                        height:
                          (deviceHeight - getFixedHeaderHeight() - 40) / 2,
                      },
                    ]}>
                    <AIcon
                      name="warning"
                      color={Colors.GRAY}
                      size={40}
                      style={Styles.pB10}
                    />
                    <Text size={16} color={Colors.GRAY}>
                      {t('orders.not.available')}
                    </Text>
                  </View>
                ) : null
              }
              ListFooterComponent={renderFooter}
              onEndReachedThreshold={0.5}
              onEndReached={handleLoadMore}
              renderItem={({item, index}) => (
                <OrderListItem
                  item={item}
                  key={item.id}
                  emailTemplates={emailTemplates}
                  recipientGroup={recipientGroup}
                />
              )}
            />
          )}
        </View>
      </Wrapper>
    </>
  );
};

export default OrderScreen;
