/* eslint-disable no-undef */
import React from 'react';
import * as Mixins from './mixins';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {FONT_FAMILY} from '../utils/constants';

const RawText = ({
  size = Mixins.scaleFont(14),
  color = null,
  style = {},
  children,
  ellipsizeMode = 'tail',
  fontFamily = FONT_FAMILY.REGULAR,
  lines = 100,
}) => {
  const {colors} = useTheme();
  const textStyle = {
    color: color ? color : colors.textColor,
    fontSize: size,
    fontFamily: fontFamily,
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
