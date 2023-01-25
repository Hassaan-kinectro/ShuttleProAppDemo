/* eslint-disable no-undef */
import React from 'react';
import * as Colors from './colors';
import * as Mixins from './mixins';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
const RawText = ({
  size = Mixins.scaleFont(14),
  weight = '300',
  color = null,
  style = {},
  children,
  ellipsizeMode = 'tail',
  lines = 100,
}) => {
  const {colors} = useTheme();
  const textStyle = {
    color: color ? color : colors.textColor,
    fontSize: size,
    fontWeight: weight,
  };
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={lines}
      style={[textStyle, style]}>
      {children}
    </Text>
  );
};
export default RawText;
