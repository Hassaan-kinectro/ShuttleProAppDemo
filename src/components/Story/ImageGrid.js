/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, Image} from 'react-native';
import React from 'react';
import AIcon from 'react-native-vector-icons/AntDesign';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ImageGrid = ({item, selectedImages, setSelectedImages}) => {
  const styles = useStyles();
  const {colors} = useTheme();
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
    <TouchableOpacity onPress={() => handleImagePress(item.image)}>
      <Image source={{uri: item.image}} style={styles.imageArr} />
      {selectedImages.includes(item && item.image) ? (
        <MaterialIcons
          name="check-box"
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
  );
};

export default ImageGrid;