import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import useStyles from '../styles';
import FastImage from 'react-native-fast-image';
import {Text} from '../../../styles';
import StoryPreview from './storyPreview';
import moment from 'moment';

const AutoSchedularList = ({item, index}) => {
  const styles = useStyles();
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(index);
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleImagePress = index => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  return (
    <>
      <View
        style={{
          // flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <Text style={{marginBottom: 10}}>
          {item.date
            ? moment(item.date).format('DD MMM YYYY | hh:mm A')
            : moment(item.created_at).format('YYYY-MM-DD hh:mm A')}
        </Text>
        <TouchableOpacity onPress={() => handleImagePress(index)}>
          <FastImage
            source={{uri: item && item.images[0].url}}
            style={{
              height: 300,
              width: 300,
              borderRadius: 10,
              borderColor: 'lightblue',
              borderWidth: 2,
            }}
          />
        </TouchableOpacity>
        {modalVisible && (
          <StoryPreview
            visible={modalVisible}
            setModalVisible={setModalVisible}
            values={
              item && item.images && item.images.length > 0 ? item.images : []
            }
          />
        )}
      </View>
    </>
  );
};

export default AutoSchedularList;
