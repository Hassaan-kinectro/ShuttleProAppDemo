import {
  Button,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Mixins, Styles, Text} from '../../styles';
import useStyles from './style';
import {FONT_FAMILY} from '../../utils/constants';
import {useTheme} from '@react-navigation/native';
import CustomerDetailForm from './CustomerDetailsForm';
import PackageDetailsForm from './PackageDetailsForm';
import ProductVarientForm from './ProductVarientForm';
import {fragileOptions, publishOptions} from './helper';
import LinearGradient from 'react-native-linear-gradient';

const CreateOrderForm = props => {
  const [publishVisible, setPublishVisibility] = React.useState(false);
  const [shipperVisible, setShipperVisibility] = React.useState(false);
  const [citiesVisible, setCitiesVisibility] = React.useState(false);
  const [fragileVisible, setFragileVisibility] = React.useState(false);
  const [serviceVisible, setServiceVisibility] = React.useState(false);
  const styles = useStyles();
  const {colors} = useTheme();
  const {
    helpersData,
    values,
    setFieldTouched,
    setFieldValue,
    touched,
    errors,
    reset,
  } = props;
  const dropDownHandler = () => {
    Keyboard.dismiss();
    setPublishVisibility(false);
    setShipperVisibility(false);
    setCitiesVisibility(false);
    setFragileVisibility(false);
    setServiceVisibility(false);
  };
  return (
    <ScrollView style={Styles.mB30}>
      <CustomerDetailForm
        setFieldTouched={setFieldTouched}
        setFieldValue={setFieldValue}
        touched={touched}
        errors={errors}
        reset={reset}
        citiesVisible={citiesVisible}
        publishOptions={publishOptions}
        shipperVisible={shipperVisible}
        publishVisible={publishVisible}
        dropDownHandler={dropDownHandler}
        citiesOptions={helpersData.citiesOptions}
        shipperOptions={helpersData.shipperOptions}
        setPublishVisibility={setPublishVisibility}
        setShipperVisibility={setShipperVisibility}
        setCitiesVisibility={setCitiesVisibility}
      />
      <PackageDetailsForm
        setFieldValue={setFieldValue}
        touched={touched}
        errors={errors}
        reset={reset}
        setFieldTouched={setFieldTouched}
        fragileOptions={fragileOptions}
        fragileVisible={fragileVisible}
        serviceVisible={serviceVisible}
        citiesOption={helpersData.citiesOptions}
        dropDownHandler={dropDownHandler}
        setFragileVisibility={setFragileVisibility}
        setServiceVisibility={setServiceVisibility}
      />
      {values &&
        values.addProduct &&
        values.addProduct.length > 0 &&
        values.addProduct.map((v, idx) => {
          return (
            <View key={idx}>
              <ProductVarientForm
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
                reset={reset}
                setFieldTouched={setFieldTouched}
                values={values}
                idx={idx}
                v={v}
                productOptions={helpersData.productOptions}
                dropDownHandler={dropDownHandler}
              />
            </View>
          );
        })}

      <View style={styles.LoginBoxStyle}>
        <TouchableOpacity disabled={props.loading} onPress={props.handleSubmit}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.9}}
            colors={['#139A5C', '#3662A8']}
            style={styles.linearGradient}>
            {/* {!props.loading ? ( */}
            <Text
              size={Mixins.scaleFont(16)}
              fontFamily={FONT_FAMILY.REGULAR}
              color={colors.white}
              style={[styles.buttonText]}>
              Create
            </Text>
            {/* // ) : (
            //   <ActivityIndicator
            //     type={'ThreeBounce'}
            //     size={30}
            //     color={colors.textColorLight}
            //   />
            // )} */}
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={Styles.mB30} />
      <View style={Styles.mB30} />
      <View style={Styles.mB30} />
      <View style={Styles.mB30} />
    </ScrollView>
  );
};

export default CreateOrderForm;
