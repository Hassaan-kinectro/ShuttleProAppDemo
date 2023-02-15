import {View} from 'react-native';
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
import * as yup from 'yup';

const CreateProduct = ({navigation}) => {
  const theme = useSelector(state => state.themeChange.theme);
  const {t} = useTranslation();
  const initialsVal = {
    productName: '',
    productCode: '',
    preferences: 0,
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
    preferences: yup.number().required('Field required.'),
  });

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
            onSubmit={values => {
              console.log(values, 'valueson submit');
            }}
            initialValues={initialsVal}>
            {props => {
              return (
                <>
                  <CreateProductForm {...props} />
                </>
              );
            }}
          </Formik>
        </View>
      </View>
    </Wrapper>
  );
};

export default CreateProduct;
