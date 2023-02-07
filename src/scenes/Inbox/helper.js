import {FetchStories} from '../../services/Stories';
export const getStories = async (setLoading, setStories, workspaceId) => {
  setLoading(true);
  await FetchStories(workspaceId).then(res => {
    if (res.status === 200) {
      if (res && res.data) {
        setStories(res.data);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  });
};
