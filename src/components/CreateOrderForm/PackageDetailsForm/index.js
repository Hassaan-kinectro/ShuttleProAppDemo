import {View} from 'react-native';
import React from 'react';
import useStyles from './style';
import {Styles, Text} from '../../../styles';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../../utils/constants';
import TextField from '../../TextField';
import DropDownPicker from '../../DropDown';
import {serviceOptions} from '../helper';

const PackageDetailsForm = props => {
  const styles = useStyles();
  const {colors} = useTheme();
  const {
    numericKeyboard,
    fragileOptions,
    dropDownHandler,
    fragileVisible,
    serviceVisible,
    setFragileVisibility,
    setServiceVisibility,
    citiesOption,
    setFieldValue,
    touched,
    errors,
    reset,
    setFieldTouched,
  } = props;

  return (
    <View style={styles.BoxStyle}>
      <View style={styles.justifyContentSpaceBetween}>
        <Text size={18} color={colors.TextColor} fontFamily={FONT_FAMILY.BOLD}>
          Package Details
        </Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
        <View style={{width: '50%'}}>
          <TextField
            label="Weight(kg)"
            name="weight"
            // labelStyle={{fontSize: Mixins.scaleFont(15)}}
            //   type="textArea"
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={rem => setFieldValue('weight', rem)}
            onBlur={() => setFieldTouched('weight')}
            // error={getVariantErrors(
            //   touched,
            //   errors,
            //   PRODUCT_VARIANT,
            //   index,
            //   _SKU,
            // )}
            autoCapitalize="words"
            reset={reset}
            keyboardType={numericKeyboard}
            errorStyle={styles.errorStyle}
            inputStyle={styles.InputTFStyle50}
            hideLabel={true}
            placeholderTextColor={colors.placeholder}
            tintColor={colors.button}
            textColor={colors.TextColor}
            fontSize={14}
            baseColor={colors.baseColor}
          />
        </View>
        <View style={{width: '50%'}}>
          <DropDownPicker
            items={fragileOptions}
            defaultValue={''}
            scrollViewProps={{
              keyboardShouldPersistTaps: 'always',
            }}
            dropDownMaxHeight={200}
            isVisible={fragileVisible}
            placeholder="Fragile"
            min={0}
            max={10}
            // multipleText="%d Fragile selected."
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
              setFieldValue('courier_details.fragile', item);
            }}
            onOpen={() => {
              dropDownHandler();
              setFragileVisibility(true);
            }}
            zIndex={50200}
            onClose={() => {
              setFragileVisibility(false);
            }}
          />
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
        <View style={{width: '50%'}}>
          {/* serviceOptions */}
          <DropDownPicker
            items={serviceOptions}
            defaultValue={''}
            scrollViewProps={{
              keyboardShouldPersistTaps: 'always',
            }}
            dropDownMaxHeight={200}
            isVisible={serviceVisible}
            placeholder="Service"
            min={0}
            max={10}
            // multipleText="%d Publish selected."
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
              setFieldValue('courier_details.service_type', item);
            }}
            onOpen={() => {
              dropDownHandler();
              setServiceVisibility(true);
            }}
            zIndex={50200}
            onClose={() => {
              setServiceVisibility(false);
            }}
          />
        </View>
        <View style={{width: '50%'}}>
          <TextField
            label="Pieces"
            name="courier_details.pieces"
            // labelStyle={{fontSize: Mixins.scaleFont(15)}}
            //   type="textArea"
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={rem => setFieldValue('courier_details.pieces', rem)}
            onBlur={() => setFieldTouched('courier_details.pieces')}
            // error={getVariantErrors(
            //   touched,
            //   errors,
            //   PRODUCT_VARIANT,
            //   index,
            //   _SKU,
            // )}
            autoCapitalize="words"
            reset={reset}
            numberOnly={true}
            keyboardType={numericKeyboard}
            errorStyle={styles.errorStyle}
            inputStyle={styles.InputTFStyle50}
            hideLabel={true}
            placeholderTextColor={colors.placeholder}
            tintColor={colors.button}
            textColor={colors.TextColor}
            fontSize={14}
            baseColor={colors.baseColor}
          />
        </View>
      </View>
      <View style={Styles.pT10}>
        <DropDownPicker
          disabled={true}
          items={citiesOption}
          defaultValue={''}
          scrollViewProps={{
            keyboardShouldPersistTaps: 'always',
          }}
          dropDownMaxHeight={200}
          isVisible={serviceVisible}
          placeholder="Destination City"
          min={0}
          max={10}
          // multipleText="%d Publish selected."
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
          arrowColor={colors.placeholder}
          autoScrollToDefaultValue={false}
          onChangeItem={item => {
            setFieldValue('courier_details.city_id', item);
          }}
          onOpen={() => {
            dropDownHandler();
            setServiceVisibility(true);
          }}
          zIndex={50200}
          onClose={() => {
            setServiceVisibility(false);
          }}
        />
        <TextField
          label="Remarks"
          name="courier_details.remarks"
          returnKeyType="next"
          autoCorrect={false}
          onChangeText={rem => {
            setFieldValue('courier_details.remarks', rem);
          }}
          // onBlur={() => setFieldTouched('pin_location')}
          // error={touched.pin_location && errors.pin_location}
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
      <View style={styles.BoxStyleWareHouse}>
        <TextField
          label="Product Details"
          name="product_detail"
          returnKeyType="next"
          autoCorrect={false}
          onChangeText={rem => {
            setFieldValue('product_detail', rem);
          }}
          // onBlur={() => setFieldTouched('pin_location')}
          // error={touched.pin_location && errors.pin_location}
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
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
          <View style={{width: '50%'}}>
            <TextField
              label="Delivery Charges"
              name="delivery_charges"
              returnKeyType="next"
              autoCorrect={false}
              onChangeText={rem => {
                setFieldValue('delivery_charges', rem);
              }}
              // onBlur={() => setFieldTouched('pin_location')}
              // error={touched.pin_location && errors.pin_location}
              autoCapitalize="words"
              reset={reset}
              numberOnly={true}
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
          <View style={{width: '50%'}}>
            <TextField
              label="COD Amount"
              name="cod_amount"
              returnKeyType="next"
              autoCorrect={false}
              numberOnly={true}
              onChangeText={rem => {
                setFieldValue('cod_amount', rem);
              }}
              // onBlur={() => setFieldTouched('pin_location')}
              // error={touched.pin_location && errors.pin_location}
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
      </View>
    </View>
  );
};

export default PackageDetailsForm;
