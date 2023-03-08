import {ActivityIndicator} from 'react-native';
import React from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
const Loader = ({color, size = 30}) => {
  const {colors} = useTheme();
  const styles = useStyles(colors);
  return (
    <>
      <ActivityIndicator
        type={'ThreeBounce'}
        size={size ? size : 30}
        color={color ? color : colors.TextColor}
        style={styles.loader}
      />
    </>
  );
};

export default Loader;
