import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ImageBackground,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Styles, Text, Colors, Mixins, Spinner, GlobalStyle} from '../../styles';
import AIcon from 'react-native-vector-icons/AntDesign';
import {getUser} from '../../config/authSettings';
import moment from 'moment';
import {Light, Dark} from '../../utils/imagesPath';
import {TransformForDropDown, TransformForUser} from '../../utils/Parser';
import {UserContext} from '../../context/userContext';
import {useTheme} from '@react-navigation/native';
import Wrapper from '../../components/Wrapper';
import {
  deviceWidth,
  deviceHeight,
  getFixedHeaderHeight,
} from '../../utils/orientation';
import {isArray, orderBy, differenceBy} from 'lodash';
import {
  GetOrdersByFilter,
  cancelOrder,
  getOrderStatus,
} from '../../services/Order';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import OrderListItem from '../../components/OrderListItem';
import {FetchMailGroups} from '../../services/FetchMailGroup';
import {FetchDescTemplates} from '../../services/DesTemplate';
import CustomHeader from '../../components/CustomHeader';
const OrderScreen = ({navigation, route}) => {
  const theme = useSelector(state => state.themeChange.theme);

  const [visible, setVisibility] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [allOrders, setAllOrders] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [lastIndex, changeLastIndex] = React.useState(0);
  const [page, changePage] = React.useState(1);
  const [stop, changeStop] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [sending, setCallStatus] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [sortOption, setSortOption] = React.useState('code');
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [filter, setfilters] = React.useState({
    startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    status_type_data: 1,
  });
  const [emailTemplates, setEmailTemplates] = React.useState([]);
  const [mailingLists, setMailingLists] = React.useState([]);
  const [recipientGroup, setRecipientGroup] = React.useState([]);
  const [stores, setStores] = React.useState([]);
  const [statuses, setStatuses] = React.useState([]);
  const [statusTypes, setStatusTypes] = React.useState([]);

  const Styles = GlobalStyle();
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const offset = 20;
  const totalFetch = 1000;
  let context = React.useContext(UserContext);
  const {workspace} = context;
  const workspaceId =
    route.params && route.params.workspaceId
      ? route.params.workspaceId
      : workspace && workspace.workspace
      ? workspace.workspace.id
      : null;
  const ModelClose = React.useCallback(() => {
    setVisibility(false);
  }, [visible]);
  const ShowModal = React.useCallback(() => {
    setVisibility(true);
  }, [visible]);
  React.useEffect(() => {
    getRecord();
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

  const getRecord = () => {
    getUser().then(res => {
      if (res) {
        console.log('wwwwwwwww', res);
        setUserData(TransformForUser([res]));
      }
    });
    FetchDescTemplates().then(res => {
      if (res.status === 200) {
        const arr = TransformForDropDown(res.data);
        console.log(res.data, 'fetchhhhhhhhhhhhhhhhhhh');
        setEmailTemplates(arr);
      }
    });
    FetchMailGroups(workspaceId).then(res => {
      if (res.status === 200) {
        setRecipientGroup(TransformForDropDown(res.data));
      }
    });
  };
  const getOrdersList = (p, f) => {
    if (!p) {
      p = page;
      f = filter;
    }
    if (search && search.length > 0) {
      return false;
    }
    if (!stop) {
      setLoading(true);
      setCallStatus(true);
      GetOrdersByFilter(workspaceId, p, totalFetch, f).then(res => {
        console.log('GET ORDER BY FILTERR');
        if (res.status === 200 && isArray(res.data) && res.data.length > 0) {
          console.log('total length', res.data.length);
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
  const sortByOptions = type => {
    setSortOption(type);
    setOrders(orderBy(allOrders, [type], ['asc']));
  };
  const onSearchChange = text => {
    setSearch(text);
    OnSearchString(text);
  };
  const OnSearch = () => {
    Keyboard.dismiss();
    OnSearchString(search);
  };
  const OnSearchString = text => {
    if (text.length > 0) {
      const result = allOrders.filter(p => {
        let aa = false;
        if (p.tracking_id) {
          aa = p.tracking_id
            ? p.tracking_id.toLowerCase().includes(text)
            : false;
        }
        if (p && p.customer && p.customer.name) {
          aa = p.customer.name.toLowerCase().includes(text.toLowerCase());
          if (!aa) {
            aa = p.customer.contact.toLowerCase().includes(text);
          }
        }
        return aa;
      });
      setOrders(result);
    } else {
      const totalLength = page * offset;
      setOrders(
        orderBy(allOrders.slice(0, totalLength), [sortByOptions], ['asc']),
      );
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
          {height: 580},
        ]}>
        <ActivityIndicator
          type={'ThreeBounce'}
          size={30}
          color={colors.TextColor}
        />
      </View>
    );
  };
  const cancelBookedOrder = (workspaceId, order_id) => {
    cancelOrder(workspaceId, order_id).then(res => {
      console.log('response cancel', res);
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
  const getOrdersByFilter = React.useCallback((filters, only = false) => {
    setfilters(filters);
    if (!only) {
      setOrders([]);
      setAllOrders([]);
      changeLastIndex(0);
      changePage(1);
      changeStop(false);
      getOrdersList(1, filters);
    }
  }, []);
  const getBookedOrderStatus = (workspaceId, order_id) => {
    getOrderStatus(workspaceId, order_id).then(res => {
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

  const handleLoadMore = () => {
    if (page !== 1 && !sending && orders.length > 0) {
      if (search.length > 0 || orders.length >= allOrders.length) {
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
            sortOption,
          ),
        );
        setCallStatus(false);
        setLoading(false);
      }, 100);
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await GetOrdersByFilter(workspaceId, 1, totalFetch, filter).then(res => {
      if (res.status === 200 && isArray(res.data) && res.data.length > 0) {
        let newOrders = res.data;
        const totalLength = page * offset;
        setOrders(
          orderBy(
            newOrders.slice(
              0,
              totalLength <= newOrders.length ? totalLength : newOrders.length,
            ),
            sortOption,
          ),
        );
        setAllOrders(newOrders);
      } else {
      }
    });
    setRefreshing(false);
  };
  const name = 'Orders';
  return (
    <>
      <ImageBackground
        source={theme === 'DARK' ? Dark : Light}
        style={[styles.image, {width: '100%', height: '100%'}]}>
        <CustomHeader name={name} navigation={navigation} />
        <View style={[Styles.flex]}>
          {loading ? (
            <ActivityIndicator
              style={styles.loader}
              type={'ThreeBounce'}
              size={30}
              color={colors.textColorLight}
            />
          ) : (
            <FlatList
              contentContainerStyle={styles.listContainer}
              data={orders}
              extraData={loading}
              removeClippedSubviews={true}
              maxToRenderPerBatch={20}
              initialNumToRender={20}
              windowSize={100}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
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
                      style={{paddingBottom: 10}}
                    />
                    <Text size={16} color={Colors.GRAY}>
                      Orders Not Found
                    </Text>
                  </View>
                ) : null
              }
              ListFooterComponent={renderFooter}
              onEndReachedThreshold={0.5}
              onEndReached={handleLoadMore}
              renderItem={({item}) => (
                <OrderListItem
                  item={item}
                  cancelOrder={cancelBookedOrder}
                  getStatus={getBookedOrderStatus}
                  statuses={statuses}
                  users={users}
                  userData={userData}
                  workspaceId={workspaceId}
                  workspace={workspace.workspace}
                  userId={userData.id}
                  emailTemplates={emailTemplates}
                  mailingLists={mailingLists}
                  recipientGroup={recipientGroup}
                  key={item.id.toString()}
                />
              )}
            />
          )}
        </View>
      </ImageBackground>
    </>
  );
};

const useStyles = colors => {
  return StyleSheet.create({
    listContainer: {
      paddingHorizontal: 10,
      paddingBottom: 120,
    },
    loader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    customInputStyle: {
      height: 45,
      paddingVertical: 0,
      borderRadius: 15,
      paddingLeft: 15,
      borderColor: colors.borderColor,
      backgroundColor: colors.gradient1,
    },
    createProductButton: {
      backgroundColor: colors.button,
      width: 40,
      height: 40,
      borderRadius: 5,
    },
    searchProductButton: {
      backgroundColor: colors.button,
      width: 35,
      height: 35,
      borderRadius: 5,
      marginLeft: 2,
      // marginRight:10
    },
  });
};

export default OrderScreen;
