import {Text, View, FlatList} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../../styles';
import AutoSchedularList from './autoSchedularList';
const AutoSchedularPreview = ({values}) => {
  const Styles = GlobalStyle();
  values &&
    values.slots &&
    values.slots.length > 0 &&
    values.slots.map(i => {
      console.log(i, 'this is i');
      //   i &&
      //     i.images &&
      //     i.images.length > 0 &&
      //     i.images.map(j => {
      //       console.log(j.url, 'these are urls');
      //     });
    });
  return (
    <>
      <View>
        <Text>AutoSchedularPreview</Text>
      </View>
      <FlatList
        data={
          values && values.slots && values.slots.length > 0 ? values.slots : []
        }
        contentContainerStyle={Styles.pT10}
        keyExtractor={item => item.toString()}
        renderItem={({item, index}) => {
          console.log(item, 'item');
          return (
            <>
              <AutoSchedularList item={item} />
            </>
          );
        }}
      />
    </>
  );
};

export default AutoSchedularPreview;
