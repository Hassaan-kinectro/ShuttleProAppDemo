import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DashBoard = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>DashBoard</Text>
    </View>
  );
};

export default DashBoard;

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
