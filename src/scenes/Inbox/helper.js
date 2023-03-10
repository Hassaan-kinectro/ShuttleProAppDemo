import {FetchStories} from '../../services/Stories';
export const getStories = async (
  setLoading,
  setUnPublishedStories,
  setPublishedStories,
  workspaceId,
) => {
  setLoading(true);
  await FetchStories(workspaceId).then(res => {
    console.log(res);
    if (res.status === 200) {
      if (res && res.published && res.unPublished) {
        setPublishedStories(res.published);
        setUnPublishedStories(res.unPublished);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  });
};

export const onRefresh = async (
  setRefresh,
  setUnPublishedStories,
  setPublishedStories,
  workspaceId,
) => {
  console.log(workspaceId);
  setRefresh(true);
  await FetchStories(workspaceId).then(res => {
    console.log(res);
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
