import {StyleSheet, ImageBackground} from 'react-native';
import React from 'react';

const Wrapper = props => {
  return (
    <ImageBackground style={styles.image} source={props.imageSource}>
      {props.children}
    </ImageBackground>
  );
};

export default Wrapper;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
