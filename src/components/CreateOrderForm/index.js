import {ScrollView, View} from 'react-native';
import React from 'react';
import {Text} from '../../styles';
import useStyles from './style';
import {FONT_FAMILY} from '../../utils/constants';
import {useTheme} from '@react-navigation/native';

const CreateOrderForm = props => {
  const styles = useStyles();
  const {colors} = useTheme();

  return (
    <ScrollView>
      <View style={styles.BoxStyle}>
        <View style={styles.justifyContentSpaceBetween}>
          <Text
            size={18}
            color={colors.TextColor}
            fontFamily={FONT_FAMILY.BOLD}>
            Customers Details
          </Text>
        </View>
      </View>
      <View style={styles.BoxStyle}>
        <View style={styles.justifyContentSpaceBetween}>
          <Text
            size={18}
            color={colors.TextColor}
            fontFamily={FONT_FAMILY.BOLD}>
            Package Details
          </Text>
        </View>
      </View>
      <View style={styles.BoxStyle}>
        <View style={styles.justifyContentSpaceBetween}>
          <Text
            size={18}
            color={colors.TextColor}
            fontFamily={FONT_FAMILY.BOLD}>
            Product Varients
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateOrderForm;
