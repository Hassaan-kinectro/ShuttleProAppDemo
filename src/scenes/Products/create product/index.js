import {Keyboard, View} from 'react-native';
import {Styles} from '../../../styles';
import React from 'react';
import Wrapper from '../../../components/Wrapper';
import {useSelector} from 'react-redux';
import {Dark, Light} from '../../../utils/imagesPath';
import CustomHeader from '../../../components/CustomHeader';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import CreateProductForm from '../../../components/CreateProductForm';
import {VALID_NAME} from '../../../utils/Parser/helper';
import {
  addNewProduct,
  defaultWarehouses,
  getAllCategories,
  getAllTags,
  getAllWarehouses,
  product_variants,
} from './helper';
import * as yup from 'yup';
import useStyles from '../../../components/CreateProductForm/style';
import {IS_POSITIVE} from '../../../utils/constants';

const CreateProduct = ({navigation}) => {
  const [tags, setTags] = React.useState({data: []});
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState({data: []});
  const [warehouses, setWarehouses] = React.useState(defaultWarehouses);
  const theme = useSelector(state => state.themeChange.theme);
  const {t} = useTranslation();
  const styles = useStyles();
  const initialsVal = {
    productName: '',
    productCode: '',
    preference: '',
    categories: [],
    tags: [],
    description: '',
    images: [],
    audiofile: [],
    mobileImages: [],
    videofile: [],
    product_variants: [product_variants],
  };
  const createProductSchema = yup.object().shape({
    productName: yup
      .string()
      .required(t('validation.product.name.required'))
      .matches(VALID_NAME, t('validation.onlyLetter.required'))
      .max(50, t('validation.maxLength.required')),
    productCode: yup
      .string()
      .required(t('validation.product.code.required'))
      .matches(VALID_NAME, t('validation.onlyLetter.required'))
      .max(50, t('validation.maxLength.required')),
    preference: yup.object().nullable().required('Field required.'),
    categories: yup.array().min(1, t('validation.product.category.required')),
    images: yup.array().min(1, t('validation.product.image.required')),
    description: yup
      .string()
      .required(t('validation.description_status.required')),
    product_variants: yup.array().of(
      yup.object().shape({
        index: yup
          .string()
          .required(t('validation.product.variant.index.required')),
        variant: yup
          .string()
          .nullable()
          .required(t('validation.product.variant.variant.required'))
          .matches(VALID_NAME, t('validation.onlyLetter.required'))
          .max(50, t('validation.maxLength.required')),
        sku: yup
          .string()
          .nullable()
          .required(t('validation.product.variant.sku.required'))
          .matches(VALID_NAME, t('validation.onlyLetter.required'))
          .max(50, t('validation.maxLength.required')),
        price: yup
          .string()
          .nullable()
          .required(t('validation.product.variant.price.required'))
          .test(
            IS_POSITIVE,
            t('validation.product.variant.price.greaterThenZero'),
            value => value > 0,
          ),
        sale_price: yup
          .string()
          .nullable()
          .required(t('validation.product.variant.salePrice.required'))
          .test(
            IS_POSITIVE,
            t('validation.product.variant.salePrice.greaterThenZero'),
            value => value > 0,
          ),
        variant_quantity: yup.array().of(
          yup.object().shape({
            id: yup
              .string()
              .required(t('validation.product.variant.quantity.id.required')),
            warehouse: yup
              .object()
              .nullable()
              .required(t('validation.product.variant.warehouse.required')),
            quantity: yup
              .number()
              .nullable()
              .required(
                t('validation.product.variant.warehouse.quantity.required'),
              )
              .test(
                IS_POSITIVE,
                t(
                  'validation.product.variant.warehouse.quantity.greaterThenZero',
                ),
                value => value >= 0,
              ),
            box_no: yup
              .string()
              .nullable()
              .max(50, t('validation.maxLength.required')),
            rack_no: yup
              .string()
              .nullable()
              .max(50, t('validation.maxLength.required')),
            shelf_no: yup
              .string()
              .nullable()
              .max(50, t('validation.maxLength.required')),
          }),
        ),
      }),
    ),
  });
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );

  const OnSubmit = values => {
    setLoading(true);

    console.log(values, 'values data');
    // setLoading(false);
    addNewProduct(values, workspaceId, setLoading);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      getAllCategories(setCategories, workspaceId);
      getAllTags(tags, setTags, workspaceId);
      getAllWarehouses(setWarehouses, workspaceId);
    };
    fetchData().catch(e => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId]);

  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardOpen(true),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardOpen(false),
    );

    // Clean up the event listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Wrapper imageSource={theme === 'DARK' ? Dark : Light}>
      <View style={Styles.flex}>
        <CustomHeader
          name={t('create')}
          searchIcon={false}
          navigation={navigation}
        />
        <View style={Styles.flex}>
          <Formik
            validationSchema={createProductSchema}
            onSubmit={OnSubmit}
            initialValues={initialsVal}>
            {props => {
              return (
                <View style={!isKeyboardOpen ? styles.mB90 : Styles.flex}>
                  <CreateProductForm
                    setLoading={setLoading}
                    loading={loading}
                    {...props}
                    tags={tags}
                    categories={categories}
                    warehouses={warehouses}
                  />
                </View>
              );
            }}
          </Formik>
        </View>
      </View>
    </Wrapper>
  );
};

export default CreateProduct;
