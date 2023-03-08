import {FetchStories} from '../../../services/Stories';
export const getStories = async (
  setLoading,
  setPublishedStories,
  pageId,
  profileType,
) => {
  setLoading(true);
  await FetchStories(pageId, '', profileType).then(res => {
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
  pageId,
) => {
  setRefresh(true);
  await FetchStories(pageId, '', profileType).then(res => {
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
