import {FetchStories} from '../../../services/Stories';
export const getStories = async (
  setLoading,
  setPublishedStories,
  workspaceId,
  profileType,
) => {
  setLoading(true);
  await FetchStories(workspaceId, profileType).then(res => {
    if (res.status === 200) {
      if (res && res.published && res.unPublished) {
        setPublishedStories(res.published);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  });
};

export const onRefresh = async (
  setRefresh,
  profileType,
  setPublishedStories,
  workspaceId,
) => {
  setRefresh(true);
  await FetchStories(workspaceId, profileType).then(res => {
    if (res.status === 200) {
      if (res && res.published && res.unPublished) {
        setPublishedStories(res.published);
        setRefresh(false);
      }
    } else {
      setRefresh(false);
    }
  });
};
