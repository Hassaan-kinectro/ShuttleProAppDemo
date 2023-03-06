import uuid from 'react-native-uuid';
import * as yup from 'yup';
import {FetchCities} from '../../../services/Cities';
import {FetchAllProductsCreateOrder} from '../../../services/Products';
import {GetShippers} from '../../../services/Shippers';
import {capitalize} from '../../../utils';
import {CONTACT_REGEX, VALID_NAME_ALPHABET} from '../../../utils/constants';

export const initialValues = {
  workspace_id: '',
  shipperType: null,
  contactNo: '',
  name: '',
  email: '',
  address: '',
  pin_location: '',
  new_customer_city: null,
  city_id: '',
  remarks: '',
  shipper_type: '',
  weight: '',
  service_type: null,
  sale_person_id: null,
  published: {
    id: 'yes',
    name: 'Yes',
    label: 'yes',
  },
  product_details: null,
  pieces: '',
  other_details: null,
  origin_id: null,
  order_query_id: null,
  insurance_value: null,
  fragile: null,
  discount_percentage: 0,
  country_id: null,
  booking_person: null,
  cod_amount: 0,
  product_type: null,
  delivery_cost: 0,
  city_name: '',
  discount_amount: 0,
  addProduct: [
    {
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
    },
  ],
  courier_details: {
    fragile: null,
    service_type: null,
    city_id: null,
    shipping_mode: null,
    payment_mode: null,
    item_product_type: null,
    service_type_id: null,
    item_insurance: null,
    information_display: null,
  },
};

export const OrderSchemas = yup.object().shape({
  ...OrderBasicSchema,
});

const OrderBasicSchema = {
  name: yup
    .string()
    .max(30, 'validation.name.max')
    .required('validation.order.name.required')
    .matches(VALID_NAME_ALPHABET, 'validation.name.alphabets.regex'),
  email: yup.string().optional().email('validation.email.invalid'),
  address: yup.string().required('validation.order.address.required'),
  contactNo: yup
    .string()
    .min(10, 'validation.order.contact.length')
    .max(15, 'validation.order.contact.length')
    .matches(CONTACT_REGEX, 'validation.order.contact.invalid')
    .required('validation.order.contact.required'),
  published: yup
    .object()
    .nullable()
    .required('validation.order.publish.required'),
  new_customer_city: yup
    .object()
    .nullable()
    .required('validation.order.city.required'),
  addProduct: yup.array().of(
    yup.object().shape({
      product_id: yup
        .object()
        .nullable()
        .required('validation.order.product.required'),
      product_variant_id: yup
        .object()
        .nullable()
        .required('validation.order.variant.required'),
      warehouse_product_id: yup
        .object()
        .nullable()
        .required('validation.order.warehouse.required'),
      price: yup.string().required('validation.order.price.required'),
      quantity: yup
        .number()
        .min(1, 'validation.order.quantity.minimum')
        .max(yup.ref('max_quantity'), 'validation.order.quantity.not.available')
        .required('validation.order.quantity.required'),
      discount: yup
        .number()
        .min(0, 'validation.order.greater.than.zero')
        // .max(100, "validation.order.discount.range")
        .test('max', 'validation.order.discount.range', function () {
          return !(this.parent.isPercent && this.parent.discount > 100);
        })
        .required('validation.order.discount.required'),
      total_amount: yup
        .number()
        .moreThan(-1, 'validation.order.greater.than.equal.zero'),
    }),
  ),
};

// fix cities
const getCitiesData = data => {
  return data
    ? data.map(row => ({
        id: row.id,
        name: row.city_name ? capitalize(row.city_name) : '',
        label: row.city_name ? capitalize(row.city_name) : '',
      }))
    : data;
};

// default values pass to state
export const defaultHelpersData = {
  statusOptions: [],
  statusTypeOptions: [],
  citiesOptions: [],
  productOptions: [],
  shipperOptions: [],
  shipperSettings: null,
  loading: false,
};
const getRespData = res => {
  return res && res.status === 200 && res.data ? res.data : null;
};

// get data for order
export const getHelpersData = async (setHelpersData, workspaceId) => {
  setHelpersData(prev => ({...prev, loading: true}));
  if (workspaceId && workspaceId) {
    const citiesResp = await FetchCities();
    // const statusResp = await FetchStatus();
    // const sconst workspaceId = await getWorkspaceId();tatusTypeResp = await FetchStatusTypes();
    // console.log('statusTypeResp>>>', statusTypeResp);
    let productResp = await FetchAllProductsCreateOrder(workspaceId);
    const shipperResp = await GetShippers(workspaceId);
    // const shipperSettingResp = await FetchShipperSettings();

    productResp = getRespData(productResp);
    productResp =
      productResp && productResp.length > 0
        ? productResp.map(p => ({
            ...p,
            name_code: capitalize(
              p.name && p.code ? p.name + ' (' + p.code + ')' : p.name,
            ),
            label: capitalize(
              p.name && p.code ? p.name + ' (' + p.code + ')' : p.name,
            ),
          }))
        : [];

    console.log(productResp, 'productResp');
    setHelpersData(prev => ({
      ...prev,
      shipperOptions: getRespData(shipperResp) || [],
      // statusOptions: getStatusData(getRespData(statusResp) || []),
      // statusTypeOptions: handleCapitalize(getRespData(statusTypeResp) || []),
      citiesOptions: getCitiesData(getRespData(citiesResp) || []),
      productOptions: productResp,
      // shipperSettings: getRespData(shipperSettingResp) || null,
      loading: false,
    }));
  }
};
