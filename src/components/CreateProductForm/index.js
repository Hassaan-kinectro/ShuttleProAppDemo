import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import useStyles from './style';
import {Mixins, Text} from '../../styles';
import TextField from '../TextField';
import {FONT_FAMILY} from '../../utils/constants';
import {PlusIcon} from '../../icons';
import {GlobalStyle} from '../../styles';
import {useTheme} from '@react-navigation/native';
import DropDownPicker from '../DropDown';

const CreateProductForm = props => {
  const {colors} = useTheme();
  const styles = useStyles();
  const Styles = GlobalStyle();
  const [templateVisible, setTemplateVisibility] = React.useState(false);

  const preferenceArr = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
  ];
  return (
    <View>
      <View style={styles.BoxStyle}>
        <View style={styles.justifyContentSpaceBetween}>
          <Text
            size={18}
            color={colors.TextColor}
            fontFamily={FONT_FAMILY.BOLD}>
            Product Details
          </Text>
          <PlusIcon size={24} color={colors.TextColor} />
        </View>
        <View>
          <TextField
            label="Product Name"
            name="productName"
            // labelStyle={{fontSize: Mixins.scaleFont(15)}}
            type="textArea"
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={rem => props.setFieldValue('productName', rem)}
            onBlur={() => props.setFieldTouched('productName')}
            error={props.touched.productName && props.errors.productName}
            autoCapitalize="words"
            reset={props.reset}
            hideLabel={true}
            inputStyle={styles.InputTFStyle}
            placeholderTextColor={colors.placeholder}
            tintColor={colors.tintColor}
            textColor={colors.TextColor}
            fontSize={14}
            baseColor={colors.baseColor}
          />
          <TextField
            label="Product Code"
            name="productCode"
            // labelStyle={{fontSize: Mixins.scaleFont(15)}}
            type="textArea"
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={rem => props.setFieldValue('productCode', rem)}
            onBlur={() => props.setFieldTouched('productCode')}
            error={props.touched.productCode && props.errors.productCode}
            autoCapitalize="words"
            reset={props.reset}
            hideLabel={true}
            inputStyle={styles.InputTFStyle}
            placeholderTextColor={colors.placeholder}
            tintColor={colors.tintColor}
            textColor={colors.TextColor}
            fontSize={14}
            baseColor={colors.baseColor}
          />
          <DropDownPicker
            items={preferenceArr}
            defaultValue=""
            scrollViewProps={{
              keyboardShouldPersistTaps: 'handled',
            }}
            isVisible={templateVisible}
            dropDownMaxHeight={200}
            placeholder="Preferences"
            containerStyle={styles.InputTFStyle}
            onChangeItem={item => {
              // setTemplate(item.value);
              console.log(item, 'item check ');
              props.setFieldValue('preferences', item);
              // changeEmailTemplate(item);
            }}
            onOpen={() => {
              // changeVisibility();
              setTemplateVisibility(true);
            }}
            onClose={() => setTemplateVisibility(false)}
          />
        </View>
        <TouchableOpacity onPress={props.handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateProductForm;
