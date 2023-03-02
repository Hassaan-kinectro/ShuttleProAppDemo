import {Button, ScrollView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Text} from '../../styles';
import useStyles from './style';
import {FONT_FAMILY} from '../../utils/constants';
import {useTheme} from '@react-navigation/native';
import CustomerDetailForm from './CustomerDetailsForm';
import PackageDetailsForm from './PackageDetailsForm';
import ProductVarientForm from './ProductVarientForm';
import {publishOptions} from './helper';

const CreateOrderForm = props => {
  const styles = useStyles();
  const {colors} = useTheme();
  const {helpersData} = props;
  return (
    <ScrollView>
      <CustomerDetailForm
        {...props}
        publishOptions={publishOptions}
        shipperOptions={helpersData.shipperOptions}
      />
      {/* <PackageDetailsForm {...props} />
      <ProductVarientForm {...props} /> */}
      <TouchableOpacity onPress={props.handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateOrderForm;
