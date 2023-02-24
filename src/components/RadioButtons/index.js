import {Text, View} from 'react-native';
import React from 'react';
import useStyles from './styles';

const Radio = props => {
  const styles = useStyles();
  return (
    <View style={styles.radio}>
      <View
        style={[styles.radioIcon, props.selected && styles.radioIconSelected]}
      />
      <Text>{props.value}</Text>
    </View>
  );
};

export default Radio;
