import uuid from 'react-native-uuid';

export const publishOptions = [
  {
    id: 'yes',
    name: 'Yes',
    label: 'Yes',
  },
  {
    id: 'no',
    name: 'No',
    label: 'No',
  },
];
// both are same thats why use similar but may Object by ref create some issue
export const fragileOptions = publishOptions;

export const serviceOptions = [
  {id: 'O', name: 'Overnight', label: 'Overnight'},
  {id: 'D', name: '2nd Day', label: '2nd Day'},
];
export const addProduct = {
  index: uuid.v4(),
  No: '',
  name: '',
  label: '',
  product_id: null,
  product_variant_id: null,
  warehouse_product_id: null,
  quantity: 0,
  max_quantity: 0,
  price: 0,
  discount: 0,
  isPercent: true,
  total_amount: 0,
};

export const handleChangeProductDetails = (
  products,
  values,
  mainValues,
  setProducts,
) => {
  if (
    products.data &&
    products.data.length > 0 &&
    values.product_id &&
    values.product_id.id
  ) {
    let wArr = [];
    let vArr = [];
    mainValues.addProduct.map(p => {
      if (p.index !== values.index) {
        if (p.warehouse_product_id && p.warehouse_product_id.id) {
          wArr.push(p.warehouse_product_id.id);
        }
        if (p.product_variant_id && p.product_variant_id.id) {
          vArr.push(p.product_variant_id.id);
        }
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
    }));
  }
};

// handleProductDelete
export const handleProductDelete = (
  index,
  values,
  products,
  setFieldValue,
  cod_amount,
) => {
  const result = products.filter(p => p.index !== values.index);
  updateProductDetails(result, setFieldValue);
  handleAmountChange(true, index, 0, values, setFieldValue, result, cod_amount);
  setFieldValue('addProduct', result);
};

export const updateProductDetails = (products, setFieldValue) => {
  if (products && products.length > 0) {
    let productsDetials = '';
    let count = 1;
    products.map(p => {
      let name =
        p.product_id &&
        p.product_id.code &&
        p.product_variant_id &&
        p.product_variant_id.variant
          ? p.product_id.code + '-' + p.product_variant_id.variant
          : '';
      if (productsDetials && name) {
        productsDetials = productsDetials + ', ' + count + '-' + name;
        count += 1;
      } else if (name) {
        productsDetials = count + '-' + name;
        count += 1;
      }
      return '';
    });
    setFieldValue('product_detail', productsDetials);
    setFieldValue('productDetails', productsDetials);
  } else {
    setFieldValue('product_detail', '');
    setFieldValue('productDetails', '');
  }
};

// //calcuation of total cod amount
export const handleAmountChange = async (
  flag,
  index,
  val,
  values,
  setFieldValue,
  products,
  cod_amount,
) => {
  let totalAmount = parseFloat(cod_amount ? cod_amount : 0);

  let productsTotal = products.reduce(
    (accumulator, currentValue) => accumulator + currentValue.total_amount,
    0,
  );
  totalAmount = totalAmount + productsTotal;

  setFieldValue && setFieldValue('cod_amount', totalAmount);
};

export const handleChangeProduct = async (
  index,
  val,
  setFieldValue,
  values,
) => {
  setFieldValue(`addProduct[${index}]`, {
    ...values.addProduct[index],
    product_id: val,
    product_variant_id: null,
    warehouse_product_id: null,
    quantity: 0,
    price: 0,
    label: '',
    discount: 0,
    total_amount: 0,
  });
};
