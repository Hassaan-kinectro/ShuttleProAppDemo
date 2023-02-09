/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, Image, TouchableOpacity, Alert} from 'react-native';
import CircularImage from '../CircularImage';
import {useTheme} from '@react-navigation/native';
import {ADDSTORY, FACEBOOK, INSTAGRAM} from '../../utils/imagesPath';
import {useSelector} from 'react-redux';
import useStyles from './styles';

const StoryList = ({publishedStories}) => {
  const {colors} = useTheme();
  const workspaceIcon = useSelector(
    state => state.workspace.workspace.workspace.icon.thumb.url,
  );
  const workspaceName = useSelector(
    state => state.workspace.workspace.workspace.name,
  );

  const styles = useStyles();

  return (
    <View
      style={{
        marginBottom: 20,
        borderColor: colors.boxBorderColor,
      }}>
      <FlatList
        data={publishedStories && publishedStories}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <TouchableOpacity
              style={styles.profileIcon}
              onPress={() => Alert.alert('Create Story', 'Coming Soon')}>
              <CircularImage
                img={workspaceIcon}
                name={workspaceName}
                style={styles.HeaderImage}
              />
              <Image source={ADDSTORY} style={styles.active} />
            </TouchableOpacity>
          </>
        )}
        renderItem={({item, index}) => {
          console.log(item, 'these are the item in flatlist above');
          return (
            <TouchableOpacity style={styles.profileIcon2} onPress={() => {}}>
              {item.type === 'instagram' && (
                <>
                  <CircularImage
                    img={item.image ? item.image : item.pageicon}
                    name={item.pageName}
                    style={styles.HeaderImage}
                  />
                  <Image source={INSTAGRAM} style={styles.active} />
                </>
              )}
              {item.type === 'facebook' && (
                <>
                  <CircularImage
                    img={item.image ? item.image : item.pageicon}
                    name={item.pageName}
                    style={styles.HeaderImage}
                  />
                  <Image source={FACEBOOK} style={styles.active} />
                </>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default StoryList;
