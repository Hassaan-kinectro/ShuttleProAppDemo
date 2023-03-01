import {
  ActivityIndicator,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import useStyles from './style';
import {Mixins, Text} from '../../styles';
import TextField from '../TextField';
import {FONT_FAMILY, PRODUCT_VARIANT} from '../../utils/constants';
import {PlusIcon} from '../../icons';
import {GlobalStyle} from '../../styles';
import {useTheme} from '@react-navigation/native';
import DropDownPicker from '../DropDown';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import MediaPicker from '../MediaPicker';
import ProductVariantForm from './ProductVariantForm';

const CreateProductForm = props => {
  const {colors} = useTheme();
  const styles = useStyles();
  const Styles = GlobalStyle();
  const [templateVisible, setTemplateVisibility] = React.useState(false);
  const [tagVisibility, setTagVisibility] = React.useState(false);
  const [categoryVisibility, setCategoryVisibility] = React.useState(false);

  const {t} = useTranslation();
  const values = props.values;
  const keyboardType = Platform.OS === 'ios' ? 'numeric' : 'number-pad';

  const preferenceArr = [
    {id: 1, label: '1', name: '1'},
    {id: 2, label: '2', name: '2'},
    {id: 3, label: '3', name: '3'},
    {id: 4, label: '4', name: '4'},
    {id: 5, label: '5', name: '5'},
    {id: 6, label: '6', name: '6'},
    {id: 7, label: '7', name: '7'},
    {id: 8, label: '8', name: '8'},
    {id: 9, label: '9', name: '9'},
    {id: 10, label: '10', name: '10'},
  ];

  return (
    <ScrollView>
      <View style={styles.BoxStyle}>
        <View style={styles.justifyContentSpaceBetween}>
          <Text
            size={18}
            color={colors.TextColor}
            fontFamily={FONT_FAMILY.BOLD}>
            Product Details
          </Text>
          <PlusIcon size={30} color={colors.TextColor} />
        </View>
        <View>
          <TextField
            label="Product Name"
            name="productName"
            // labelStyle={{fontSize: Mixins.scaleFont(15)}}
            // type="textArea"
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={rem => props.setFieldValue('productName', rem)}
            onBlur={() => props.setFieldTouched('productName')}
            error={props.touched.productName && props.errors.productName}
            autoCapitalize="words"
            reset={props.reset}
            errorStyle={styles.errorStyle}
            hideLabel={true}
            inputStyle={styles.InputTFStyle}
            placeholderTextColor={colors.placeholder}
            tintColor={colors.button}
            textColor={colors.TextColor}
            fontSize={14}
            baseColor={colors.baseColor}
          />
          <TextField
            label="Product Code"
            name="productCode"
            // labelStyle={{fontSize: Mixins.scaleFont(15)}}
            // type="textArea"
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={rem => props.setFieldValue('productCode', rem)}
            onBlur={() => props.setFieldTouched('productCode')}
            error={props.touched.productCode && props.errors.productCode}
            autoCapitalize="words"
            reset={props.reset}
            hideLabel={true}
            errorStyle={styles.errorStyle}
            inputStyle={styles.InputTFStyle}
            placeholderTextColor={colors.placeholder}
            tintColor={colors.button}
            textColor={colors.TextColor}
            fontSize={14}
            baseColor={colors.baseColor}
          />
          <DropDownPicker
            items={preferenceArr}
            defaultValue={''}
            scrollViewProps={{
              keyboardShouldPersistTaps: 'always',
            }}
            dropDownMaxHeight={200}
            isVisible={templateVisible}
            placeholder="Preferences"
            containerStyle={styles.dropDownSTyle}
            min={0}
            max={10}
            multipleText="%d Preferences selected."
            style={Styles.dropDownContainerStyle}
            dropDownStyle={Styles.dropDownContainerStyle}
            itemStyle={Styles.itemStyle}
            arrowColor={colors.button}
            labelStyle={Styles.labelStyle}
            activeLabelStyle={Styles.activeLabelStyle}
            selectedLabelStyle={Styles.activeLabelStyle}
            placeholderStyle={styles.placeholderStyle}
            searchablePlaceholderTextColor={colors.placeholder}
            searchableStyle={Styles.searchableStyle}
            autoScrollToDefaultValue={false}
            onChangeItem={item => {
              props.setFieldValue('preference', item);
            }}
            onOpen={() => {
              Keyboard.dismiss();
              setCategoryVisibility(false);
              setTagVisibility(false);
              setTemplateVisibility(true);
            }}
            zIndex={50200}
            onClose={() => {
              setTemplateVisibility(false);
            }}
          />
          <DropDownPicker
            items={props?.tags?.data}
            defaultValue={[]}
            scrollViewProps={{
              keyboardShouldPersistTaps: 'always',
            }}
            dropDownMaxHeight={200}
            isVisible={tagVisibility}
            multiple={true}
            placeholder="Tags"
            containerStyle={styles.dropDownSTyle}
            min={0}
            max={10}
            multipleText="%d Tags selected."
            style={Styles.dropDownContainerStyle}
            dropDownStyle={Styles.dropDownContainerStyle}
            itemStyle={Styles.itemStyle}
            arrowColor={colors.button}
            labelStyle={Styles.labelStyle}
            activeLabelStyle={Styles.activeLabelStyle}
            selectedLabelStyle={Styles.activeLabelStyle}
            placeholderStyle={styles.placeholderStyle}
            searchablePlaceholderTextColor={colors.placeholder}
            searchableStyle={Styles.searchableStyle}
            autoScrollToDefaultValue={false}
            onChangeItem={item => {
              props.setFieldValue('tags', item);
            }}
            onOpen={() => {
              Keyboard.dismiss();
              setTemplateVisibility(false);
              setCategoryVisibility(false);
              setTagVisibility(true);
            }}
            zIndex={50050}
            onClose={() => {
              setTagVisibility(false);
            }}
          />
          <DropDownPicker
            items={props?.categories?.data}
            defaultValue={[]}
            scrollViewProps={{
              keyboardShouldPersistTaps: 'always',
            }}
            dropDownMaxHeight={140}
            isVisible={categoryVisibility}
            multiple={true}
            placeholder="Category"
            containerStyle={styles.dropDownSTyle}
            min={0}
            max={10}
            multipleText="%d Categories selected."
            style={styles.dropDownContainerStyle}
            dropDownStyle={styles.dropDownContainerStyle}
            itemStyle={styles.itemStyle}
            arrowColor={colors.button}
            labelStyle={styles.labelStyle}
            selectedLabelStyle={styles.activeLabelStyle}
            placeholderStyle={styles.placeholderStyle}
            searchablePlaceholderTextColor={colors.placeholder}
            searchableStyle={styles.searchableStyle}
            autoScrollToDefaultValue={false}
            onChangeItem={item => {
              props.setFieldValue('categories', item);
            }}
            onOpen={() => {
              Keyboard.dismiss();
              setTemplateVisibility(false);
              setTagVisibility(false);
              setCategoryVisibility(true);
            }}
            zIndex={50050}
            onClose={() => {
              setCategoryVisibility(false);
            }}
          />
          <TextField
            label={t('product.details.label.description')}
            placeholder={t('product.details.placeholder.description')}
            name="description"
            labelStyle={styles.descLabelSty}
            type="textArea"
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={rem => props.setFieldValue('description', rem)}
            onBlur={() => props.setFieldTouched('description')}
            error={props.touched.description && props.errors.description}
            autoCapitalize="words"
            reset={props.reset}
            errorStyle={styles.errorStyle}
            inputStyle={styles.descriptionTFStyle}
            placeholderTextColor={colors.placeholder}
            tintColor={colors.button}
            textColor={colors.TextColor}
            fontSize={14}
            multiline={true}
            baseColor={colors.baseColor}
          />
        </View>
      </View>
      <View style={styles.BoxStyle}>
        <View style={styles.justifyContentSpaceBetween}>
          <Text
            size={18}
            color={colors.TextColor}
            fontFamily={FONT_FAMILY.BOLD}>
            Product Media
          </Text>
          <PlusIcon size={30} color={colors.TextColor} />
        </View>
        <View>
          <MediaPicker {...props} />
        </View>
      </View>
      {values &&
        values.product_variants &&
        values.product_variants.length > 0 &&
        values.product_variants.map((v, index) => {
          return (
            <View key={index}>
              <ProductVariantForm
                index={index}
                {...props}
                keyboardType={keyboardType}
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
            {!props.loading ? (
              <Text
                size={Mixins.scaleFont(16)}
                fontFamily={FONT_FAMILY.REGULAR}
                color={colors.white}
                style={[styles.buttonText]}>
                Create
              </Text>
            ) : (
              <ActivityIndicator
                type={'ThreeBounce'}
                size={30}
                color={colors.textColorLight}
              />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateProductForm;
