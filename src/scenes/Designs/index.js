import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
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

const DashBoard = ({navigation}) => {
  const styles = useStyles();
  const theme = useSelector(state => state.themeChange.theme);
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [page, changePage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [allProducts, setAllProducts] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const {t} = useTranslation();
  const offset = 20;
  const {colors} = useTheme();

  React.useEffect(() => {
    const fetchData = async () => {
      const productsData = await FetchAllProducts(workspaceId);
      if (productsData.status === 200) {
        setAllProducts(productsData.data);
        setProducts(productsData.data);
        console.log(productsData, 'productsData}}}}}');
      } else {
        setAllProducts([]);
        setProducts([]);
      }
      setLoading(false);
    };
    fetchData().catch(e => {
      console.log(e, 'error on fetch IIIIIIII');
    });
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
                data={products.sort((a, b) => a.name.localeCompare(b.name))}
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
                    // onRefresh={onRefresh}
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
                renderItem={({item, index}) => <ProductListItem item={item} />}
              />
            </View>
          )}
        </View>
      </View>
    </Wrapper>
  );
};

export default DashBoard;
