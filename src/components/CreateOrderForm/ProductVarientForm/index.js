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
import {
  addProduct,
  handleChangeProductDetails,
  handleProductDelete,
  onOrderVariantRemove,
} from '../helper';
import VariantDetails from './VariantDetails';

const ProductVarientForm = props => {
  const styles = useStyles();
  const {colors} = useTheme();
  const {values, setFieldValue, idx, productOptions} = props;

  const [products, setProducts] = React.useState({
    ids: [],
    data: [],
    options: productOptions,
  });

  return (
    <>
      <View style={styles.BoxStyle}>
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
                setFieldValue('addProduct', [
                  ...values.addProduct,
                  {
                    ...addProduct,
                    index: uuid.v4(),
                  },
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
          <View>
            {values.addProduct.length > 1 && idx >= 0 && (
              <TouchableOpacity
                onPress={() => {
                  setFieldValue(
                    'addProduct',
                    values.addProduct.filter((e, i) => {
                      console.log(idx, i, 'index check ', idx !== i);
                      if (i !== idx) {
                        console.log(e, 'e value ');
                        return e;
                      }
                    }),
                  );
                }}>
                <CrossIcon size={30} color={colors.TextColor} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <VariantDetails
            {...props}
            mainValues={values}
            products={products}
            setProducts={setProducts}
          />
        </View>
      </View>
    </>
  );
};

export default ProductVarientForm;
