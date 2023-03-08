import {FetchStories} from '../../../services/Stories';
export const getStories = async (
  setLoading,
  setUnPublishedStories,
  setPublishedStories,
  profileId,
  selected = '',
) => {
  setLoading(true);
  await FetchStories(profileId, selected).then(res => {
    if (res.status === 200) {
      if (res && res.published && res.unPublished) {
        setPublishedStories(res.published);
        setUnPublishedStories(res.unPublished);
        setLoading(false);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  });
};

export const onRefresh = async (
  setRefresh,
  setUnPublishedStories,
  setPublishedStories,
  profileId,
  selected = '',
) => {
  setRefresh(true);
  await FetchStories(profileId, selected).then(res => {
    if (res.status === 200) {
      if (res && res.published && res.unPublished) {
        setPublishedStories(res.published);
        setUnPublishedStories(res.unPublished);
        setRefresh(false);
      }
    } else {
      setRefresh(false);
    }
  });
};
