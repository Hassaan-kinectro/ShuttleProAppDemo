import {View} from 'react-native';
import React from 'react';
import useStyles from './style';
import {Text} from '../../../styles';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../../../utils/constants';

const PackageDetailsForm = props => {
  const styles = useStyles();
  const {colors} = useTheme();

  return (
    <View style={styles.BoxStyle}>
      <View style={styles.justifyContentSpaceBetween}>
        <Text size={18} color={colors.TextColor} fontFamily={FONT_FAMILY.BOLD}>
          Package Details
        </Text>
      </View>
    </View>
  );
};

export default PackageDetailsForm;
