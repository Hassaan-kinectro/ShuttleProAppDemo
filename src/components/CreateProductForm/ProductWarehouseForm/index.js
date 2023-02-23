import {TouchableOpacity, View} from 'react-native';
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
  _WAREHOUSE,
} from '../../../utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import {
  onAddNewVariantQuantity,
  onRemoveAdjustTotalQuantity,
  onRemoveVariantQuantity,
} from '../helper';

const ProductWarehouse = props => {
  const styles = useStyles();
  const Styles = GlobalStyle();
  const {colors} = useTheme();

  const {warehouses, warehouse, setWarehouse} = props;
  console.log(props.i, 'warehouses.', warehouse);

  return (
    <View style={styles.BoxStyleWareHouse}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <DropDownPicker
          items={warehouses.data}
          defaultValue={''}
          scrollViewProps={{
            keyboardShouldPersistTaps: 'always',
          }}
          dropDownMaxHeight={200}
          isVisible={() => {
            console.log('value of ok');

            const ok = warehouse.filter(e => {
              if (e.index === props.i) {
                return e.open;
              }
            });
            console.log(ok, 'value of ok');
            return ok[0];
          }}
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
            setWarehouse(prev => {
              return prev.map(e => {
                if (e.index === props.i) {
                  return {
                    index: e.index,
                    open: true,
                  };
                } else {
                  e;
                }
              });
            });
          }}
          zIndex={50006}
          onClose={() => {
            setWarehouse(prev => {
              return prev.map(e => {
                if (e.index === props.i) {
                  return {
                    index: e.index,
                    open: false,
                  };
                } else {
                  e;
                }
              });
            });
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
                    setWarehouse,
                    props.i,
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
                    setWarehouse,
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
                <PlusIcon size={15} color={WHITE} />
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
                <DeleteIcon size={15} color={WHITE} />
              </LinearGradient>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductWarehouse;
