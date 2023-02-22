/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {getStories} from './helper';
import StoryList from '../../../components/Story/storyContainer';

const defaultValue = {id: null, loading: false};

const PublishedStories = ({currentProfile, postModals, setPostModals}) => {
  const workspaceId = useSelector(state => state.workspace.workspaceId);

  const [loading, setLoading] = React.useState(false);
  const [loadingImages, setLoadingImages] = React.useState(defaultValue);
  const [publishedStories, setPublishedStories] = React.useState([]);

  React.useEffect(() => {
    getStories(
      setLoading,
      setPublishedStories,
      workspaceId,
      currentProfile.profile_type,
    );
    return () => {
      setPublishedStories([]);
      setLoading(false);
      setLoadingImages(defaultValue);
    };
  }, []);

  const closeStoryModal = React.useCallback(() => {
    setPostModals(prev => {
      return {
        ...prev,
        facebookStory: false,
      };
    });
  }, [setPostModals]);

  return (
    <StoryList
      publishedStories={publishedStories}
      setPublishedStories={setPublishedStories}
      currentProfile={currentProfile}
      closeModal={closeStoryModal}
      open={postModals.facebookStory}
      loading={postModals.loading}
    />
  );
};

export default PublishedStories;
