import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import useStyles from './style';
import {FONT_FAMILY} from '../../../utils/constants';
import {Text} from '../../../styles';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {CrossIcon, PlusIcon} from '../../../icons';
import {WHITE} from '../../../styles/colors';
import uuid from 'react-native-uuid';
import {addProduct, onOrderVariantRemove} from '../helper';
import {FieldArray} from 'formik';

const ProductVarientForm = props => {
  const styles = useStyles();
  const {colors} = useTheme();
  const {values, idx} = props;
  return (
    <View style={styles.BoxStyle}>
      {/* <View style={styles.justifyContentSpaceBetween}>
        <Text size={18} color={colors.TextColor} fontFamily={FONT_FAMILY.BOLD}>
          Product Varients
        </Text>
      </View> */}
      <View style={styles.justifyContentSpaceBetween}>
        <View style={styles.justifyContentStart}>
          <Text
            size={18}
            color={colors.TextColor}
            fontFamily={FONT_FAMILY.BOLD}>
            Product Varients
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.setFieldValue(addProduct, [
                ...values.addProduct,
                {...addProduct, index: uuid.v4()},
              ]);
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
        {idx >= 1 && (
          <View>
            <Text>{idx}</Text>
            <TouchableOpacity
              onPress={() => {
                console.log(
                  props.values.addProduct,
                  idx,
                  'add propduct varinat checck ',
                );
                onOrderVariantRemove(
                  values.addProduct,
                  idx,
                  props.setFieldValue,
                );
              }}>
              <CrossIcon size={30} color={colors.TextColor} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductVarientForm;
