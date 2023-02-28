import React from 'react';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Text, Styles, Colors} from '../../styles';
import {useSelector} from 'react-redux';
import Wrapper from '../../components/Wrapper';
import {Dark, Light} from '../../utils/imagesPath';
import useStyles from './styles';
import CustomHeader from '../../components/CustomHeader';
import {FetchAllProducts} from '../../services/Products';
import Loader from '../../components/Loader';
import {orderBy} from 'lodash';
import AIcon from 'react-native-vector-icons/AntDesign';
import {useTheme} from '@react-navigation/native';
import {deviceHeight, getFixedHeaderHeight} from '../../utils/orientation';
import ProductListItem from '../../components/ProductListItem';
import LinearGradient from 'react-native-linear-gradient';
import {LibraryAdd, PlusIcon} from '../../icons';
import {Routes} from '../../utils/constants';

const Products = ({navigation}) => {
  const styles = useStyles();
  const theme = useSelector(state => state.themeChange.theme);
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [page, changePage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [allProducts, setAllProducts] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [addProduct, setAddProduct] = React.useState(false);
  const {t} = useTranslation();
  const offset = 10;
  const {colors} = useTheme();
  const [loading2, setLoading2] = React.useState(false);
  const [refetch, setRefetch] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const productsData = await FetchAllProducts(workspaceId, 10, 1);
      if (productsData.status === 200) {
        setCount(productsData.count);
        setAllProducts(
          productsData.data.sort((a, b) => a.name.localeCompare(b.name)),
        );
        setProducts(
          productsData.data.sort((a, b) => a.name.localeCompare(b.name)),
        );
      } else {
        setAllProducts([]);
        setProducts([]);
      }
      setLoading(false);
    };
    fetchData().catch(e => {});
  }, [workspaceId]);

  const onSearchText = text => {
    if (text.length > 0) {
      const result =
        allProducts &&
        allProducts.filter(p => {
          let aa = false;
          if (p && p.name) {
            aa = p.name ? p.name.toLowerCase().includes(text) : false;
          }
          if (!aa && p && p.code) {
            aa = p.code.toLowerCase().includes(text.toLowerCase());
            // if (!aa) {
            //   aa = p.id.includes(text);
            // }
          }
          return aa;
        });
      setProducts(result);
    } else {
      const totalLength = page * offset;
      setProducts(orderBy(allProducts.slice(0, totalLength)));
    }
  };
  const onRefresh = () => {
    const fetchData = async () => {
      changePage(1);
      const productsData = await FetchAllProducts(workspaceId, 10, 1);
      if (productsData.status === 200) {
        setAllProducts(
          productsData.data.sort((a, b) => a.name.localeCompare(b.name)),
        );
        setProducts(
          productsData.data.sort((a, b) => a.name.localeCompare(b.name)),
        );
      } else {
        changePage(1);
        setAllProducts([]);
        setProducts([]);
      }
      setLoading(false);
    };
    fetchData().catch(e => {});
  };
  const handleLoadMore = () => {
    setLoading2(true);
    console.log(
      offset * (page + 1) - count <= offset,
      'offset * (page + 1) - count <= offset',
      offset * (page + 1),
      count,
      offset,
      loading2,
    );
    if (!refetch && offset * (page + 1) - count <= offset) {
      (() => {
        setRefetch(true);
      })();
      const fetchData = async () => {
        const productsData = await FetchAllProducts(workspaceId, 10, page + 1);
        if (productsData.status === 200) {
          setCount(productsData.count);
          console.log(productsData, 'products data fetch');
          changePage(page + 1);
          setAllProducts(prev => {
            return [
              ...prev,
              ...productsData.data.sort((a, b) => a.name.localeCompare(b.name)),
            ];
          });
          setProducts(prev => {
            return [
              ...prev,
              ...productsData.data.sort((a, b) => a.name.localeCompare(b.name)),
            ];
          });
        } else {
          setAllProducts([]);
          setProducts([]);
        }
        setRefetch(false);
        setLoading2(false);
      };
      fetchData().catch(e => {});
    } else {
      setLoading2(false);
    }
  };

  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={Styles.flex}>
        <CustomHeader
          name={t('products')}
          searchIcon={true}
          navigation={navigation}
          onSearchText={onSearchText}
        />

        <View style={[Styles.flex]}>
          {loading ? (
            <View style={[Styles.w100, Styles.h100, Styles.Centered]}>
              {loading && <Loader />}
            </View>
          ) : (
            <View>
              <FlatList
                data={products}
                contentContainerStyle={styles.listContainer}
                extraData={loading}
                style={styles.mB50}
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
                  !loading && products?.length === 0 ? (
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
                        {t('products.not.available')}
                      </Text>
                    </View>
                  ) : null
                }
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                renderItem={({item, index}) => (
                  <View key={index}>
                    <ProductListItem item={item} />
                  </View>
                )}
              />
            </View>
          )}
        </View>
        {loading2 && (
          <View style={[Styles.flexCenter, {height: 200}]}>
            <Loader />
          </View>
        )}
        {addProduct ? (
          <TouchableOpacity
            onPress={() => {
              addProduct ? setAddProduct(false) : setAddProduct(true);
              navigation.navigate(Routes.CREATEPRODUCTS);
            }}>
            <LinearGradient
              colors={['#139A5C', '#3662A8']}
              start={{x: 0.5, y: 0.0}}
              end={{x: 0.5, y: 1.0}}
              locations={[0.2794, 0.9161]}
              style={styles.addProductIconLibrary}>
              <LibraryAdd
                size={25}
                color={Colors.WHITE}
                style={styles.addProductIconLibraryTransfor}
              />
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <></>
        )}

        <TouchableOpacity
          onPress={() => {
            addProduct ? setAddProduct(false) : setAddProduct(true);
          }}>
          <LinearGradient
            colors={['#139A5C', '#3662A8']}
            start={{x: 0.5, y: 0.0}}
            end={{x: 0.5, y: 1.0}}
            locations={[0.2794, 0.9161]}
            style={styles.addProductIcon}>
            <PlusIcon style={styles.opacity} size={30} color={Colors.WHITE} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
};

export default Products;
