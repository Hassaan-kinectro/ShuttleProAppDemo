import {Keyboard, View} from 'react-native';
import React from 'react';
import {Text} from '../../../styles';
import useStyles from './style';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY, _CONTACT_NO} from '../../../utils/constants';
import DropDownPicker from '../../DropDown';
import TextField from '../../TextField';

const CustomerDetailForm = props => {
  const styles = useStyles();
  const {colors} = useTheme();
  const {
    publishOptions,
    shipperOptions,
    numericKeyboard,
    citiesOptions,
    publishVisible,
    shipperVisible,
    dropDownHandler,
    citiesVisible,
    setPublishVisibility,
    setShipperVisibility,
    setCitiesVisibility,
    setFieldTouched,
    setFieldValue,
    touched,
    errors,
    reset,
  } = props;

  return (
    <View style={styles.BoxStyle}>
      <View style={styles.justifyContentSpaceBetween}>
        <Text size={18} color={colors.TextColor} fontFamily={FONT_FAMILY.BOLD}>
          Customers Details
        </Text>
      </View>
      <View>
        <DropDownPicker
          items={publishOptions}
          defaultValue={''}
          scrollViewProps={{
            keyboardShouldPersistTaps: 'always',
          }}
          dropDownMaxHeight={200}
          isVisible={publishVisible}
          placeholder="Publish"
          min={0}
          max={10}
          multipleText="%d Publish selected."
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
            setFieldValue('published', item);
          }}
          onOpen={() => {
            dropDownHandler();
            setPublishVisibility(true);
          }}
          zIndex={50200}
          onClose={() => {
            dropDownHandler();
          }}
        />
        <DropDownPicker
          items={shipperOptions}
          defaultValue={''}
          scrollViewProps={{
            keyboardShouldPersistTaps: 'always',
          }}
          dropDownMaxHeight={200}
          isVisible={shipperVisible}
          placeholder="Shipper"
          min={0}
          max={10}
          multipleText="%d Shipper selected."
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
            setFieldValue('shipperType', item);
          }}
          onOpen={() => {
            dropDownHandler();
            setShipperVisibility(true);
          }}
          zIndex={50200}
          onClose={() => {
            dropDownHandler();
          }}
        />
        <TextField
          label="Contact No"
          name={_CONTACT_NO}
          // labelStyle={{fontSize: Mixins.scaleFont(15)}}
          // type="textArea"
          returnKeyType="next"
          autoCorrect={false}
          onChangeText={rem => {
            const regex = /^[0-9\b +]+$/;
            if (rem === '' || regex.test(rem)) {
              setFieldValue(_CONTACT_NO, rem);
            }
          }}
          numberOnly={true}
          onBlur={() => setFieldTouched(_CONTACT_NO)}
          error={touched[_CONTACT_NO] && errors[_CONTACT_NO]}
          autoCapitalize="words"
          reset={reset}
          keyboardType={numericKeyboard}
          errorStyle={styles.errorStyle}
          inputStyle={styles.InputTFStyle}
          hideLabel={true}
          placeholderTextColor={colors.placeholder}
          tintColor={colors.button}
          textColor={colors.TextColor}
          fontSize={14}
          baseColor={colors.baseColor}
        />
        <TextField
          label="Name"
          name="name"
          // labelStyle={{fontSize: Mixins.scaleFont(15)}}
          // type="textArea"
          returnKeyType="next"
          autoCorrect={false}
          onChangeText={rem => {
            setFieldValue('name', rem);
          }}
          // onBlur={() => setFieldTouched("name")}
          error={touched.name && errors.name}
          autoCapitalize="words"
          reset={reset}
          errorStyle={styles.errorStyle}
          inputStyle={styles.InputTFStyle}
          hideLabel={true}
          placeholderTextColor={colors.placeholder}
          tintColor={colors.button}
          textColor={colors.TextColor}
          fontSize={14}
          baseColor={colors.baseColor}
        />
        <TextField
          label="Email"
          name={'email'}
          // labelStyle={{fontSize: Mixins.scaleFont(15)}}
          // type="textArea"
          returnKeyType="next"
          autoCorrect={false}
          onChangeText={rem => {
            setFieldValue('email', rem);
          }}
          onBlur={() => setFieldTouched('email')}
          error={touched.email && errors.email}
          autoCapitalize="words"
          reset={reset}
          errorStyle={styles.errorStyle}
          inputStyle={styles.InputTFStyle}
          hideLabel={true}
          placeholderTextColor={colors.placeholder}
          tintColor={colors.button}
          textColor={colors.TextColor}
          fontSize={14}
          baseColor={colors.baseColor}
        />

        {/* pick city dopdown here  */}

        <DropDownPicker
          items={citiesOptions}
          defaultValue={''}
          scrollViewProps={{
            keyboardShouldPersistTaps: 'always',
          }}
          dropDownMaxHeight={200}
          isVisible={citiesVisible}
          placeholder="City"
          min={0}
          searchable={true}
          searchablePlaceholder="Search City"
          max={10}
          multipleText="%d City selected."
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
            setFieldValue('city_id', item);
            setFieldValue('courier_details.city_id', item);
            setFieldValue('new_customer_city', item);
          }}
          onOpen={() => {
            dropDownHandler();
            setCitiesVisibility(true);
          }}
          zIndex={50200}
          onClose={() => {
            dropDownHandler();
          }}
        />

        {/* add address here  */}
        <TextField
          label="Address"
          placeholder="Address"
          name="address"
          labelStyle={styles.addressLabelSty}
          type="textArea"
          returnKeyType="next"
          autoCorrect={false}
          onChangeText={rem => setFieldValue('address', rem)}
          onBlur={() => setFieldTouched('address')}
          error={touched.address && errors.address}
          autoCapitalize="words"
          reset={reset}
          errorStyle={styles.errorStyle}
          inputStyle={styles.addressTFStyle}
          placeholderTextColor={colors.placeholder}
          tintColor={colors.button}
          textColor={colors.TextColor}
          fontSize={14}
          // multiline={true}
          baseColor={colors.baseColor}
        />
        <TextField
          label="Pin location"
          name="pin_location"
          returnKeyType="next"
          autoCorrect={false}
          onChangeText={rem => {
            setFieldValue('pin_location', rem);
          }}
          onBlur={() => setFieldTouched('pin_location')}
          error={touched.pin_location && errors.pin_location}
          autoCapitalize="words"
          reset={reset}
          errorStyle={styles.errorStyle}
          inputStyle={styles.InputTFStyle}
          hideLabel={true}
          placeholderTextColor={colors.placeholder}
          tintColor={colors.button}
          textColor={colors.TextColor}
          fontSize={14}
          baseColor={colors.baseColor}
        />
      </View>
    </View>
  );
};

export default CustomerDetailForm;
