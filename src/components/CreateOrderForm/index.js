import {
  Button,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Styles, Text} from '../../styles';
import useStyles from './style';
import {FONT_FAMILY} from '../../utils/constants';
import {useTheme} from '@react-navigation/native';
import CustomerDetailForm from './CustomerDetailsForm';
import PackageDetailsForm from './PackageDetailsForm';
import ProductVarientForm from './ProductVarientForm';
import {fragileOptions, publishOptions} from './helper';

const CreateOrderForm = props => {
  const [publishVisible, setPublishVisibility] = React.useState(false);
  const [shipperVisible, setShipperVisibility] = React.useState(false);
  const [citiesVisible, setCitiesVisibility] = React.useState(false);
  const [fragileVisible, setFragileVisibility] = React.useState(false);
  const [serviceVisible, setServiceVisibility] = React.useState(false);
  const styles = useStyles();
  const {colors} = useTheme();
  const {helpersData, values} = props;
  console.log(values, 'values data fetch ok');
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
        {...props}
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
        {...props}
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
              <ProductVarientForm {...props} idx={idx} />
            </View>
          );
        })}
      <TouchableOpacity onPress={props.handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
      <View style={Styles.mB30} />
      <View style={Styles.mB30} />
      <View style={Styles.mB30} />
      <View style={Styles.mB30} />
    </ScrollView>
  );
};

export default CreateOrderForm;
