import {View} from 'react-native';
import React from 'react';
import {Text} from '../../../styles';
import DropDownPicker from '../../DropDown';
import useStyles from './style';
import {useTheme} from '@react-navigation/native';
import {handleChangeProduct} from '../helper';

const VariantDetails = props => {
  const {
    setFieldValue,
    touched,
    errors,
    reset,
    setFieldTouched,
    values,
    idx,
    dropDownHandler,
    products,
    setProducts,
    productOptions,
    mainValues,
    v,
  } = props;
  const styles = useStyles();
  const {colors} = useTheme();
  const [productVisible, setProductVisibility] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState([]);
  React.useEffect(() => {
    if (
      products.data &&
      products.data.length > 0 &&
      values.product_id &&
      values.product_id.id
    ) {
      let wArr = [];
      let vArr = [];
      let options = productOptions;
      mainValues.addProduct.map(p => {
        if (p.warehouse_product_id && p.warehouse_product_id.id) {
          wArr.push(p.warehouse_product_id.id);
        }
        if (p.product_variant_id && p.product_variant_id.id) {
          vArr.push(p.product_variant_id.id);
        }
        return p;
      });
      let newProducts = products.data.map(p => {
        if (p.id === values.product_id.id) {
          const fvariants = p.variants.reduce((fv, v) => {
            const fwarehouses = v.warehouses.reduce((fw, w) => {
              if (!(vArr.includes(v.id) && wArr.includes(w.id))) {
                fw.push({
                  id: w.id,
                  quantity: w.quantity,
                  name: w.name,
                });
              }
              return fw;
            }, []);
            if (fwarehouses && fwarehouses.length > 0) {
              fv.push({
                id: v.id,
                price: v.price,
                variant: v.variant,
                name: v.name,
                warehouses: v.warehouses,
                fwarehouses: fwarehouses,
              });
            }
            return fv;
          }, []);
          return {
            ...p,
            fvariants: fvariants,
          };
        } else {
          return p;
        }
      });

      setProducts(prev => ({
        ...prev,
        data: newProducts,
        options: options,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.warehouse_product_id]);
  React.useEffect(() => {
    setProducts({
      id: [],
      data: [],
      options: productOptions,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productOptions]);

  return (
    <View>
      <DropDownPicker
        items={products && products.options ? products.options : []}
        defaultValue={
          selectedProduct && selectedProduct.length > 0 ? selectedProduct : ''
        }
        scrollViewProps={{
          keyboardShouldPersistTaps: 'always',
        }}
        dropDownMaxHeight={200}
        isVisible={productVisible}
        placeholder="products"
        min={0}
        max={10}
        // multipleText="%d Fragile selected."
        itemStyle={styles.itemStyle}
        labelStyle={styles.labelStyle}
        style={styles.dropDownContainerStyle}
        containerStyle={styles.dropDownSTyle}
        searchableStyle={styles.searchableStyle}
        activeLabelStyle={styles.activeLabelStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedLabelStyle={styles.activeLabelStyle}
        dropDownStyle={styles.dropDownContainerStyle}
        searchablePlaceholderTextColor={colors.placeholder}
        arrowColor={colors.button}
        autoScrollToDefaultValue={false}
        onChangeItem={item => {
          setSelectedProduct([item]);
          handleChangeProduct(idx, item, setFieldValue, values);
        }}
        onOpen={() => {
          dropDownHandler();
          setProductVisibility(true);
        }}
        zIndex={50200}
        onClose={() => {
          setProductVisibility(false);
        }}
      />
    </View>
  );
};

export default VariantDetails;
