import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const DashBoard = () => {
  const {colors} = useTheme();
  const styles = useStyles(colors);

  return (
    <View style={styles.header}>
      <Text style={styles.text}>DashBoard</Text>
    </View>
  );
};

const useStyles = colors => {
  return StyleSheet.create({
    header: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    text: {
      color: colors.TextColor,
      fontSize: 20,
    },
  });
};

export default DashBoard;
