import {ActivityIndicator} from 'react-native';
import React from 'react';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
const Loader = () => {
  const {colors} = useTheme();
  const styles = useStyles(colors);
  return (
    <>
      <ActivityIndicator
        type={'ThreeBounce'}
        size={30}
        color={colors.TextColor}
        style={styles.loader}
      />
    </>
  );
};

export default Loader;
