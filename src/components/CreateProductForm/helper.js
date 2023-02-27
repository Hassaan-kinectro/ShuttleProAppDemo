import {parseInt} from 'lodash';
import {
  product_variants,
  variant_quantity,
} from '../../scenes/Products/create product/helper';
import {
  PRODUCT_VARIANT,
  TOTAL_QUANTITY,
  VARIANT_QUANTITY,
  _QUANTITY,
} from '../../utils/constants';
import {getRandomId} from '../../utils/RandomId';

export const onAddNewVariant = (variants, setFieldValue) => {
  setFieldValue(PRODUCT_VARIANT, [
    ...variants,
    {
      ...product_variants,
      index: getRandomId(),
      variant_quantity: [variant_quantity],
    },
  ]);
};

export const onRemoveVariant = (variants, index, setFieldValue) => {
  setFieldValue(
    `${PRODUCT_VARIANT}`,
    variants.filter((v, i) => i !== index),
  );
};
export const onAddNewVariantQuantity = (
  index,
  variant_quantity_data,
  setFieldValue,
) => {
  setFieldValue(`${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}]`, [
    ...variant_quantity_data,
    {
      ...variant_quantity,
      id: getRandomId(),
    },
  ]);
};
export const onRemoveVariantQuantity = (
  index,
  variant_quantity_index,
  variant_quantity_data,
  setFieldValue,
) => {
  setFieldValue(
    `${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}]`,
    variant_quantity_data.filter((v, i) => i !== variant_quantity_index),
  );
};
export const onRemoveAdjustTotalQuantity = (
  values,
  setFieldValue,
  currentIndex,
) => {
  if (values && values[PRODUCT_VARIANT] && values[PRODUCT_VARIANT].length > 0) {
    values[PRODUCT_VARIANT].map((pv, index) => {
      if (pv && pv[VARIANT_QUANTITY] && pv[VARIANT_QUANTITY].length > 0) {
        let total_product_Quantity = 0;
        const arr = pv[VARIANT_QUANTITY].filter((vq, i) => i !== currentIndex);
        arr.map(a => {
          if (a && a[_QUANTITY]) {
            total_product_Quantity =
              total_product_Quantity + parseInt(a[_QUANTITY]);
          }
          return null;
        });
        setFieldValue(
          `${PRODUCT_VARIANT}[${index}][${TOTAL_QUANTITY}]`,
          total_product_Quantity,
        );
      }
      return null;
    });
  }
};
export const getVariantErrors = (touched, errors, key, index, column) => {
  return (
    touched &&
    errors &&
    touched[key] &&
    errors[key] &&
    touched[key][index] &&
    errors[key][index] &&
    touched[key][index][column] &&
    errors[key][index][column]
  );
};

export const getVariantQuantityErrors = (
  touched,
  errors,
  key,
  index,
  column,
  columnIndex,
  subColumn,
) => {
  return (
    touched &&
    errors &&
    touched[key] &&
    errors[key] &&
    touched[key][index] &&
    errors[key][index] &&
    touched[key][index][column] &&
    errors[key][index][column] &&
    touched[key][index][column][columnIndex] &&
    touched[key][index][column][columnIndex][subColumn] &&
    errors[key][index][column][columnIndex] &&
    errors[key][index][column][columnIndex][subColumn]
  );
};
