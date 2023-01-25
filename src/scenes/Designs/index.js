import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Design = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Design</Text>
    </View>
  );
};

export default Design;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});
