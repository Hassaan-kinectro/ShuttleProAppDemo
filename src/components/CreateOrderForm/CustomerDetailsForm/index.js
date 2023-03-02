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
  const {publishOptions, shipperOptions, numericKeyboard} = props;
  const [publishVisible, setPublishVisibility] = React.useState(false);
  const [shipperVisible, setShipperVisibility] = React.useState(false);

  return (
    <View style={styles.BoxStyle}>
      <View style={styles.justifyContentSpaceBetween}>
        <Text size={18} color={colors.TextColor} fontFamily={FONT_FAMILY.BOLD}>
          Customers Details
        </Text>
      </View>
      <View style={styles.mB50}>
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
            props.setFieldValue('published', item);
          }}
          onOpen={() => {
            Keyboard.dismiss();
            setShipperVisibility(false);
            setPublishVisibility(true);
          }}
          zIndex={50200}
          onClose={() => {
            setPublishVisibility(false);
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
            props.setFieldValue('shipperType', item);
          }}
          onOpen={() => {
            Keyboard.dismiss();
            setShipperVisibility(true);
          }}
          zIndex={50200}
          onClose={() => {
            setShipperVisibility(false);
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
              console.log(regex.test(rem), 'regex.test(rem)');
              props.setFieldValue(_CONTACT_NO, rem);
            }
          }}
          numberOnly={true}
          onBlur={() => props.setFieldTouched(_CONTACT_NO)}
          error={props.touched[_CONTACT_NO] && props.errors[_CONTACT_NO]}
          autoCapitalize="words"
          reset={props.reset}
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
            props.setFieldValue('name', rem);
          }}
          // onBlur={() => props.setFieldTouched("name")}
          error={props.touched.name && props.errors.name}
          autoCapitalize="words"
          reset={props.reset}
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
            props.setFieldValue('email', rem);
          }}
          onBlur={() => props.setFieldTouched('email')}
          error={props.touched.email && props.errors.email}
          autoCapitalize="words"
          reset={props.reset}
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

        {/* <DropDownPicker
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
            props.setFieldValue('shipperType', item);
          }}
          onOpen={() => {
            Keyboard.dismiss();
            setShipperVisibility(true);
          }}
          zIndex={50200}
          onClose={() => {
            setShipperVisibility(false);
          }}
        /> */}

        {/* add address here  */}

        {/* <TextField
          label="Email"
          name={'email'}
          // labelStyle={{fontSize: Mixins.scaleFont(15)}}
          // type="textArea"
          returnKeyType="next"
          autoCorrect={false}
          onChangeText={rem => {
            props.setFieldValue('email', rem);
          }}
          onBlur={() => props.setFieldTouched('email')}
          error={props.touched.email && props.errors.email}
          autoCapitalize="words"
          reset={props.reset}
          errorStyle={styles.errorStyle}
          inputStyle={styles.InputTFStyle}
          hideLabel={true}
          placeholderTextColor={colors.placeholder}
          tintColor={colors.button}
          textColor={colors.TextColor}
          fontSize={14}
          baseColor={colors.baseColor}
        /> */}
      </View>
    </View>
  );
};

export default CustomerDetailForm;
