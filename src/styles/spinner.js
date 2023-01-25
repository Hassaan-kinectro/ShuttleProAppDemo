/* eslint-disable no-undef */
import Loader from 'react-native-spinkit';
import React from 'react';
import * as Colors from './colors';
import {useTheme} from '@react-navigation/native';

export default Spinner = ({
  visible = true,
  size = 40,
  type = 'Wave',
  color = null,
}) => {
  const [colored, setColored] = React.useState(null);
  const {colors} = useTheme();
  React.useState(() => {
    if (color) {
      setColored(color);
    } else {
      setColored(colors.spinner);
    }
  });
  return <Loader isVisible={visible} size={size} type={type} color={colored} />;
};
