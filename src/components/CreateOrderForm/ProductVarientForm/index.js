import {View} from 'react-native';
import React from 'react';
import useStyles from './style';
import {FONT_FAMILY} from '../../../utils/constants';
import {Text} from '../../../styles';
import {useTheme} from '@react-navigation/native';

const ProductVarientForm = props => {
  const styles = useStyles();
  const {colors} = useTheme();

  return (
    <View style={styles.BoxStyle}>
      <View style={styles.justifyContentSpaceBetween}>
        <Text size={18} color={colors.TextColor} fontFamily={FONT_FAMILY.BOLD}>
          Product Varients
        </Text>
      </View>
    </View>
  );
};

export default ProductVarientForm;
