import {Platform, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {GlobalStyle, Text} from '../../../styles';
import useStyles from '../style';
import {DeleteIcon, PlusIcon} from '../../../icons';
import {WHITE} from '../../../styles/colors';
import DropDownPicker from '../../DropDown';
import {useTheme} from '@react-navigation/native';
import {
  PRODUCT_VARIANT,
  VARIANT_QUANTITY,
  _BOX_NO,
  _QUANTITY,
  _RACK_NO,
  _SHELF_NO,
  _WAREHOUSE,
} from '../../../utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import {
  getVariantQuantityErrors,
  onAddNewVariantQuantity,
  onRemoveAdjustTotalQuantity,
  onRemoveVariantQuantity,
} from '../helper';
import TextField from '../../TextField';

const ProductWarehouse = props => {
  const styles = useStyles();
  const Styles = GlobalStyle();
  const {colors} = useTheme();

  const [warehouse, setWarehouse] = React.useState(false);

  const {warehouses, index, keyboardType} = props;
  // console.log(props.i, 'warehouses');

  return (
    <View style={styles.BoxStyleWareHouse}>
      <View style={styles.warehouseBox}>
        <DropDownPicker
          items={warehouses?.data || []}
          defaultValue={''}
          scrollViewProps={{
            keyboardShouldPersistTaps: 'always',
          }}
          dropDownMaxHeight={100}
          isVisible={warehouse}
          placeholder="Warehouse"
          containerStyle={{width: '90%'}}
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
            props.setFieldValue(
              `${PRODUCT_VARIANT}[${props.index}][${VARIANT_QUANTITY}][${props.i}][${_WAREHOUSE}]`,
              item,
            );
          }}
          onOpen={() => {
            setWarehouse(true);
          }}
          zIndex={50010}
          onClose={() => {
            setWarehouse(false);
          }}
        />
        <TouchableOpacity
          disabled={
            props.i === 0 &&
            warehouses.data.length ===
              props.values[PRODUCT_VARIANT][props.index][VARIANT_QUANTITY]
                .length
          }
          onPress={
            props.i === 0
              ? () => {
                  onAddNewVariantQuantity(
                    props.index,
                    props.values[PRODUCT_VARIANT][props.index][
                      VARIANT_QUANTITY
                    ],
                    props.setFieldValue,
                  );
                }
              : () => {
                  onRemoveVariantQuantity(
                    props.index,
                    props.i,
                    props.values[PRODUCT_VARIANT][props.index][
                      VARIANT_QUANTITY
                    ],
                    props.setFieldValue,
                  );
                  onRemoveAdjustTotalQuantity(
                    props.values,
                    props.setFieldValue,
                    props.i,
                  );
                }
          }>
          {props.i === 0 ? (
            <View>
              <LinearGradient
                colors={['#139A5C', '#3662A8']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                locations={[0.0, 1.0]}
                useAngle={true}
                angle={199.18}
                style={styles.addProductVariant}>
                <PlusIcon size={14} color={WHITE} />
              </LinearGradient>
            </View>
          ) : (
            <View>
              <LinearGradient
                colors={['#139A5C', '#3662A8']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                locations={[0.0, 1.0]}
                useAngle={true}
                angle={199.18}
                style={styles.addProductVariant}>
                <DeleteIcon size={14} color={WHITE} />
              </LinearGradient>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.fieldStyle50}>
        <TextField
          label="Quantity"
          name={`${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}][${props.i}][${_QUANTITY}]`}
          // labelStyle={{fontSize: Mixins.scaleFont(15)}}
          //   type="textArea"
          returnKeyType="next"
          autoCorrect={false}
          error={getVariantQuantityErrors(
            props.touched,
            props.errors,
            PRODUCT_VARIANT,
            index,
            VARIANT_QUANTITY,
            props.i,
            _QUANTITY,
          )}
          onChangeText={rem => {
            let regex = new RegExp('^[0-9]\\d*$');
            if (
              regex.test(rem) &&
              rem &&
              !rem.includes('e') &&
              !rem.includes('E')
            ) {
              props.setFieldValue(
                `${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}][${props.i}][${_QUANTITY}]`,
                rem,
              );
            } else {
              if (rem === '') {
                props.setFieldValue(
                  `${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}][${props.i}][${_QUANTITY}]`,
                  '',
                );
              }
            }
          }}
          onBlur={() =>
            props.setFieldTouched(
              `${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}][${props.i}][${_QUANTITY}]`,
            )
          }
          autoCapitalize="words"
          reset={props.reset}
          errorStyle={styles.errorStyle}
          hideLabel={true}
          inputStyle={styles.InputTFStyle50}
          placeholderTextColor={colors.placeholder}
          tintColor={colors.button}
          textColor={colors.TextColor}
          fontSize={14}
          keyboardType={keyboardType}
          baseColor={colors.baseColor}
        />
        <TextField
          label="Shelf No."
          name={`${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}][${props.i}][${_SHELF_NO}]`}
          // labelStyle={{fontSize: Mixins.scaleFont(15)}}
          //   type="textArea"
          returnKeyType="next"
          autoCorrect={false}
          onChangeText={rem =>
            props.setFieldValue(
              `${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}][${props.i}][${_SHELF_NO}]`,
              rem,
            )
          }
          onBlur={() =>
            props.setFieldTouched(
              `${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}][${props.i}][${_SHELF_NO}]`,
            )
          }
          error={getVariantQuantityErrors(
            props.touched,
            props.errors,
            PRODUCT_VARIANT,
            index,
            VARIANT_QUANTITY,
            props.i,
            _SHELF_NO,
          )}
          autoCapitalize="words"
          reset={props.reset}
          errorStyle={styles.errorStyle}
          hideLabel={true}
          inputStyle={styles.InputTFStyle50}
          placeholderTextColor={colors.placeholder}
          tintColor={colors.button}
          textColor={colors.TextColor}
          fontSize={14}
          baseColor={colors.baseColor}
        />
      </View>
      <View style={styles.fieldStyle50}>
        <TextField
          label="Rack No."
          name={`${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}][${props.i}][${_RACK_NO}]`}
          // labelStyle={{fontSize: Mixins.scaleFont(15)}}
          //   type="textArea"
          returnKeyType="next"
          autoCorrect={false}
          onChangeText={rem =>
            props.setFieldValue(
              `${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}][${props.i}][${_RACK_NO}]`,
              rem,
            )
          }
          onBlur={() =>
            props.setFieldTouched(
              `${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}][${props.i}][${_RACK_NO}]`,
            )
          }
          error={getVariantQuantityErrors(
            props.touched,
            props.errors,
            PRODUCT_VARIANT,
            index,
            VARIANT_QUANTITY,
            props.i,
            _RACK_NO,
          )}
          autoCapitalize="words"
          reset={props.reset}
          errorStyle={styles.errorStyle}
          hideLabel={true}
          inputStyle={styles.InputTFStyle50}
          placeholderTextColor={colors.placeholder}
          tintColor={colors.button}
          textColor={colors.TextColor}
          fontSize={14}
          baseColor={colors.baseColor}
        />
        <TextField
          label="Box No."
          name={`${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}][${props.i}][${_BOX_NO}]`}
          // labelStyle={{fontSize: Mixins.scaleFont(15)}}
          //   type="textArea"
          returnKeyType="next"
          autoCorrect={false}
          onChangeText={rem =>
            props.setFieldValue(
              `${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}][${props.i}][${_BOX_NO}]`,
              rem,
            )
          }
          onBlur={() =>
            props.setFieldTouched(
              `${PRODUCT_VARIANT}[${index}][${VARIANT_QUANTITY}][${props.i}][${_BOX_NO}]`,
            )
          }
          error={getVariantQuantityErrors(
            props.touched,
            props.errors,
            PRODUCT_VARIANT,
            index,
            VARIANT_QUANTITY,
            props.i,
            _BOX_NO,
          )}
          autoCapitalize="words"
          reset={props.reset}
          errorStyle={styles.errorStyle}
          hideLabel={true}
          inputStyle={styles.InputTFStyle50}
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

export default ProductWarehouse;
