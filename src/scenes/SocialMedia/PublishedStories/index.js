/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {getStories} from './helper';
import StoryList from '../../../components/Story/storyContainer';

const defaultValue = {id: null, loading: false};

const PublishedStories = props => {
  const workspaceId = useSelector(
    state => state.workspace.workspace.workspace.id,
  );

  const [loading, setLoading] = React.useState(false);
  const [loadingImages, setLoadingImages] = React.useState(defaultValue);
  const [publishedStories, setPublishedStories] = React.useState([]);

  React.useEffect(() => {
    getStories(setLoading, setPublishedStories, workspaceId);
    return () => {
      setPublishedStories([]);
      setLoading(false);
      setLoadingImages(defaultValue);
    };
  }, []);

  return (
    <>
      <View style={[]}>
        <StoryList publishedStories={publishedStories} />
      </View>
    </>
  );
};

export default PublishedStories;