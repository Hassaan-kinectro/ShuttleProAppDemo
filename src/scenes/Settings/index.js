import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Settings = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
};

export default Settings;

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
