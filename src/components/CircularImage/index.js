import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors, Mixins, Text} from '../../styles';

const CircularImage = props => {
  const {colors} = useTheme();
  const styles = useStyles(colors);
  const name = props.name
    ? props.name.replace(/[^a-zA-Z ]/g, '').slice(0, 1)
    : '';
  return (
    <View style={props.style}>
      {props.img ? (
        <>
          {/* <Text>image</Text> */}
          <FastImage
            source={{uri: props.img}}
            resizeMode={FastImage.resizeMode.cover}
            style={[props.style, styles.image]}
          />
          {props.imageName && (
            <Text
              lines={1}
              size={Mixins.scaleFont(10)}
              style={{width: 30}}
              weight="100">
              {props.imageName ? props.imageName : ''}
            </Text>
          )}
        </>
      ) : (
        <Text
          size={Mixins.scaleFont(16)}
          style={[props.style, styles.CircularLetterStyle]}>
          {props.name ? name.toUpperCase() : 'S'}
        </Text>
      )}
    </View>
  );
};

const useStyles = colors => {
  return StyleSheet.create({
    CircularLetterStyle: {
      backgroundColor: colors.gradient1,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    image: {borderWidth: 1, borderColor: colors.boxColor},
  });
};
export default CircularImage;
