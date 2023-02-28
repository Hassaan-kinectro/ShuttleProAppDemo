import {Platform, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {GlobalStyle, Text} from '../../../styles';
import useStyles from '../style';
import {useTheme} from '@react-navigation/native';
import TextField from '../../TextField';
import {
  FONT_FAMILY,
  PRODUCT_VARIANT,
  VARIANT_QUANTITY,
  _COST_PRICE,
  _PRICE,
  _PRODUCT_VARIANT,
  _SALE_PRICE,
  _SKU,
} from '../../../utils/constants';
import {CrossIcon, PlusIcon} from '../../../icons';
import LinearGradient from 'react-native-linear-gradient';
import {getVariantErrors, onAddNewVariant, onRemoveVariant} from '../helper';
import {WHITE} from '../../../styles/colors';
import ProductWarehouse from '../ProductWarehouseForm';

const ProductVariantForm = props => {
  const styles = useStyles();
  const Styles = GlobalStyle();
  const {colors} = useTheme();
  const {values, index, keyboardType} = props;

  return (
    <View>
      <View style={styles.BoxStyle}>
        <View style={styles.justifyContentSpaceBetween}>
          <View style={styles.addProductVariantStyle}>
            <View>
              <Text
                size={18}
                color={colors.TextColor}
                fontFamily={FONT_FAMILY.BOLD}
                style={Styles.flexCenter}>
                Product Varients
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  onAddNewVariant(
                    props.values[PRODUCT_VARIANT],
                    props.setFieldValue,
                  );
                  // addProduct ? setAddProduct(false) : setAddProduct(true);
                }}>
                <LinearGradient
                  colors={['#139A5C', '#3662A8']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  locations={[0.0, 1.0]}
                  useAngle={true}
                  angle={199.18}
                  style={styles.addProductVariant}>
                  <PlusIcon style={styles.opacity} size={14} color={WHITE} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          {
            props && index > 0 && (
              <TouchableOpacity
                onPress={() => {
                  onRemoveVariant(
                    props.values[PRODUCT_VARIANT],
                    index,
                    props.setFieldValue,
                  );
                }}>
                <CrossIcon size={30} color={colors.TextColor} />
              </TouchableOpacity>
            )
            // ) : (
            //   <></>
            // )
          }
        </View>

        <View>
          <TextField
            label="Product Variant"
            name={`${PRODUCT_VARIANT}[${index}][${_PRODUCT_VARIANT}]`}
            // labelStyle={{fontSize: Mixins.scaleFont(15)}}
            //   type="textArea"
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={rem =>
              props.setFieldValue(
                `${PRODUCT_VARIANT}[${index}][${_PRODUCT_VARIANT}]`,
                rem,
              )
            }
            onBlur={() =>
              props.setFieldTouched(
                `${PRODUCT_VARIANT}[${index}][${_PRODUCT_VARIANT}]`,
              )
            }
            autoCapitalize="words"
            reset={props.reset}
            errorStyle={styles.errorStyle}
            hideLabel={true}
            error={getVariantErrors(
              props.touched,
              props.errors,
              PRODUCT_VARIANT,
              index,
              _PRODUCT_VARIANT,
            )}
            inputStyle={styles.InputTFStyle}
            placeholderTextColor={colors.placeholder}
            tintColor={colors.tintColor}
            textColor={colors.TextColor}
            fontSize={14}
            baseColor={colors.baseColor}
          />
        </View>
        <View style={styles.fieldStyle50}>
          <TextField
            label="SKU"
            name={`${PRODUCT_VARIANT}[${index}][${_SKU}]`}
            // labelStyle={{fontSize: Mixins.scaleFont(15)}}
            //   type="textArea"
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={rem =>
              props.setFieldValue(`${PRODUCT_VARIANT}[${index}][${_SKU}]`, rem)
            }
            onBlur={() =>
              props.setFieldTouched(`${PRODUCT_VARIANT}[${index}][${_SKU}]`)
            }
            error={getVariantErrors(
              props.touched,
              props.errors,
              PRODUCT_VARIANT,
              index,
              _SKU,
            )}
            autoCapitalize="words"
            reset={props.reset}
            errorStyle={styles.errorStyle}
            hideLabel={true}
            inputStyle={styles.InputTFStyle50}
            placeholderTextColor={colors.placeholder}
            tintColor={colors.tintColor}
            textColor={colors.TextColor}
            fontSize={14}
            baseColor={colors.baseColor}
          />
          <TextField
            label="Price"
            name={`${PRODUCT_VARIANT}[${index}][${_PRICE}]`}
            // labelStyle={{fontSize: Mixins.scaleFont(15)}}
            //   type="textArea"
            keyboardType={keyboardType}
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={rem =>
              props.setFieldValue(
                `${PRODUCT_VARIANT}[${index}][${_PRICE}]`,
                rem,
              )
            }
            onBlur={() =>
              props.setFieldTouched(`${PRODUCT_VARIANT}[${index}][${_PRICE}]`)
            }
            error={getVariantErrors(
              props.touched,
              props.errors,
              PRODUCT_VARIANT,
              index,
              _PRICE,
            )}
            autoCapitalize="words"
            reset={props.reset}
            errorStyle={styles.errorStyle}
            hideLabel={true}
            inputStyle={styles.InputTFStyle50}
            placeholderTextColor={colors.placeholder}
            tintColor={colors.tintColor}
            textColor={colors.TextColor}
            fontSize={14}
            baseColor={colors.baseColor}
          />
        </View>
        <View style={styles.fieldStyle50}>
          <TextField
            label="Sale Price"
            name={`${PRODUCT_VARIANT}[${index}][${_SALE_PRICE}]`}
            // labelStyle={{fontSize: Mixins.scaleFont(15)}}
            //   type="textArea"
            keyboardType={keyboardType}
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={rem =>
              props.setFieldValue(
                `${PRODUCT_VARIANT}[${index}][${_SALE_PRICE}]`,
                rem,
              )
            }
            onBlur={() =>
              props.setFieldTouched(
                `${PRODUCT_VARIANT}[${index}][${_SALE_PRICE}]`,
              )
            }
            error={getVariantErrors(
              props.touched,
              props.errors,
              PRODUCT_VARIANT,
              index,
              _SALE_PRICE,
            )}
            autoCapitalize="words"
            reset={props.reset}
            errorStyle={styles.errorStyle}
            hideLabel={true}
            inputStyle={styles.InputTFStyle50}
            placeholderTextColor={colors.placeholder}
            tintColor={colors.tintColor}
            textColor={colors.TextColor}
            fontSize={14}
            baseColor={colors.baseColor}
          />
          <TextField
            label="Cost Price"
            name={`${PRODUCT_VARIANT}[${index}][${_COST_PRICE}]`}
            // labelStyle={{fontSize: Mixins.scaleFont(15)}}
            //   type="textArea"
            keyboardType={keyboardType}
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={rem => {
              let regex = new RegExp('^[0-9]\\d*$');
              if (
                regex.test(rem) &&
                rem &&
                !rem.includes('e') &&
                !rem.includes('E')
              ) {
                props.setFieldValue(
                  `${PRODUCT_VARIANT}[${index}][${_COST_PRICE}]`,
                  rem,
                );
              } else {
                if (rem === '') {
                  props.setFieldValue(
                    `${PRODUCT_VARIANT}[${index}][${_COST_PRICE}]`,
                    '',
                  );
                }
              }
            }}
            onBlur={() =>
              props.setFieldTouched(
                `${PRODUCT_VARIANT}[${index}][${_COST_PRICE}]`,
              )
            }
            error={getVariantErrors(
              props.touched,
              props.errors,
              PRODUCT_VARIANT,
              index,
              _COST_PRICE,
            )}
            autoCapitalize="words"
            reset={props.reset}
            errorStyle={styles.errorStyle}
            hideLabel={true}
            inputStyle={styles.InputTFStyle50}
            placeholderTextColor={colors.placeholder}
            tintColor={colors.tintColor}
            textColor={colors.TextColor}
            fontSize={14}
            baseColor={colors.baseColor}
          />
        </View>
        {values[PRODUCT_VARIANT][index] &&
          values[PRODUCT_VARIANT][index][VARIANT_QUANTITY] &&
          values[PRODUCT_VARIANT][index][VARIANT_QUANTITY].length > 0 &&
          values[PRODUCT_VARIANT][index][VARIANT_QUANTITY].map((q, i) => {
            return (
              <View key={i}>
                <ProductWarehouse
                  {...props}
                  i={i}
                  keyboardType={keyboardType}
                />
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default ProductVariantForm;
