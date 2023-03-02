/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import {getRecord} from './helper';
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
import OrderFilter from '../../components/OrderFilter';
import {FilterIcon, LibraryAdd, PlusIcon, ThreeDotsIcon} from '../../icons';
import LinearGradient from 'react-native-linear-gradient';
import {Routes} from '../../utils/constants';

const OrderScreen = ({navigation, route}) => {
  const theme = useSelector(state => state.themeChange.theme);
  const workspaceId = useSelector(state => state.workspace.workspaceId);
  const [visible, setVisibility] = React.useState(false);
  const [allOrders, setAllOrders] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [lastIndex, changeLastIndex] = React.useState(0);
  const [page, changePage] = React.useState(1);
  const [stop, changeStop] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadmore, setLoadmore] = React.useState(false);
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [filter, setfilters] = React.useState({
    startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    status_type: 1,
  });
  const [emailTemplates, setEmailTemplates] = React.useState([]);
  const [recipientGroup, setRecipientGroup] = React.useState([]);
  const [statusTypes, setStatusTypes] = React.useState([]);
  const Styles = GlobalStyle();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const styles = useStyles(colors);
  const offset = 20;
  const totalFetch = 1000;
  const [addOrder, setAddOrder] = React.useState(false);

  React.useEffect(() => {
    getRecord(
      setEmailTemplates,
      setRecipientGroup,
      setStatusTypes,
      workspaceId,
    );
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
    return () => {
      setOrders([]);
      setAllOrders([]);
      changeLastIndex(0);
      changePage(1);
      changeStop(false);
      setEmailTemplates([]);
      setRecipientGroup([]);
    };
  }, [route.params]);

  const getOrdersList = (p, f) => {
    if (!p) {
      p = page;
      f = filter;
    }
    setfilters(f);
    if (!stop) {
      setLoading(true);
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
        } else {
          setLoading(false);
        }
        setLoading(false);
      });
    }
  };
  const handleLoadMore = () => {
    if (page !== 1 && orders.length > 0) {
      if (orders && allOrders && orders.length >= allOrders.length) {
        return false;
      }
      setLoadmore(true);
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

        setLoadmore(false);
      }, 500);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await GetOrdersByFilter(workspaceId, 1, totalFetch, filter)
      .then(res => {
        if (res.status === 200 && isArray(res.data) && res.data.length > 0) {
          let newOrders = res.data;
          const totalLength = page * offset;
          setOrders(
            orderBy(
              newOrders.slice(
                0,
                totalLength <= newOrders.length
                  ? totalLength
                  : newOrders.length,
              ),
            ),
          );
          setAllOrders(newOrders);
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
    setRefreshing(false);
  };

  const renderFooter = () => {
    if (!loadmore) {
      return null;
    }
    return (
      <View style={[]}>
        <Loader />
      </View>
    );
  };

  const name = 'Orders';
  const onSearchText = text => {
    if (text.length > 0) {
      const result =
        allOrders &&
        allOrders.filter(p => {
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
      setOrders(orderBy(allOrders.slice(0, totalLength)));
    }
  };
  return (
    <>
      <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
        <View style={Styles.flex}>
          <CustomHeader
            name={name}
            searchIcon={true}
            navigation={navigation}
            onSearchText={onSearchText}
          />
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={styles.filterStyle}
              onPress={() => setVisibility(true)}>
              <FilterIcon
                size={18}
                color={colors.searchIcon}
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={[Styles.flex]}>
            {loading ? (
              <View style={[Styles.w100, Styles.h100, Styles.Centered]}>
                {loading && <Loader />}
              </View>
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
          {visible && (
            <OrderFilter
              statusTypes={statusTypes}
              visible={visible}
              filter={filter}
              getFilter={getOrdersList}
              setVisibility={setVisibility}
            />
          )}
          {
            addOrder && (
              <TouchableOpacity
                onPress={() => {
                  addOrder ? setAddOrder(false) : setAddOrder(true);
                  navigation.navigate(Routes.CREATEORDERS);
                }}>
                <LinearGradient
                  colors={['#139A5C', '#3662A8']}
                  start={{x: 0.5, y: 0.0}}
                  end={{x: 0.5, y: 1.0}}
                  locations={[0.2794, 0.9161]}
                  style={styles.addOrderIconLibrary}>
                  <LibraryAdd
                    size={25}
                    color={Colors.WHITE}
                    style={styles.addOrderIconLibraryTransfor}
                  />
                </LinearGradient>
              </TouchableOpacity>
            )
            // : (
            //   <></>
            // )
          }
          <TouchableOpacity
            onPress={() => {
              addOrder ? setAddOrder(false) : setAddOrder(true);
            }}>
            <LinearGradient
              colors={['#139A5C', '#3662A8']}
              start={{x: 0.5, y: 0.0}}
              end={{x: 0.5, y: 1.0}}
              locations={[0.2794, 0.9161]}
              style={styles.addOrderIcon}>
              <ThreeDotsIcon
                style={styles.opacity}
                size={26}
                color={Colors.WHITE}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Wrapper>
    </>
  );
};

export default OrderScreen;
