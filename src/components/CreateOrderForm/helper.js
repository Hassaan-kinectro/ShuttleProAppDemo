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

export const onOrderVariantRemove = (addProduct, idx, setFieldValue) => {
  setFieldValue(
    'addProduct',
    addProduct.filter((e, i) => {
      if (i !== idx) {
        return e;
      }
    }),
  );
};
