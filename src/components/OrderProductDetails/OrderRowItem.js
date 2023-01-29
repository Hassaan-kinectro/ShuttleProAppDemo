/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {Text} from '../../styles';

const OrderRowItem = item => {
  const {colors} = useTheme();
  const styles = useStyles();
  return (
    <View style={{marginBottom: 10}}>
      <Text lines={1} color={colors.TextColor} style={styles.FontStyle}>
        {item.name}
      </Text>
      <Text lines={5} style={[styles.FontStyle, {width: 100}]}>
        {item.value}
      </Text>
    </View>
  );
};

export default OrderRowItem;
