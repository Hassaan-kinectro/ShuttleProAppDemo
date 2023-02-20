/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, Image, View} from 'react-native';
import React from 'react';
import useStyles from './styles';
import {WarningIcon} from '../../icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  deviceWidth,
  deviceHeight,
  getFixedHeaderHeight,
} from '../../utils/orientation';
import {useTheme} from '@react-navigation/native';
import {Text, GlobalStyle} from '../../styles';

const box = (deviceWidth - 80) / 3;
const ImageGrid = ({item, selectedImages, setSelectedImages}) => {
  const {colors} = useTheme();
  const Styles = GlobalStyle();
  const styles = useStyles();
  const MAX_IMAGES = 10;
  const handleImagePress = image => {
    if (selectedImages.includes(image)) {
      setSelectedImages(
        selectedImages.filter(selectedImage => selectedImage !== image),
      );
    } else if (selectedImages.length < MAX_IMAGES) {
      setSelectedImages([...selectedImages, image]);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => handleImagePress(item.image)}>
        <Image
          source={{uri: item.image}}
          style={[styles.imageArr, {width: box, height: box}]}
        />
        {selectedImages.includes(item && item.image) ? (
          <MaterialIcons
            name="check-box"
            color={colors.backgroundColor}
            size={20}
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              borderRadius: 50,
              color: 'white',
            }}
          />
        ) : (
          <MaterialIcons
            name="check-box-outline-blank"
            size={20}
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              borderRadius: 50,
              color: 'white',
            }}
          />
        )}
      </TouchableOpacity>
    </>
  );
};

export default ImageGrid;
