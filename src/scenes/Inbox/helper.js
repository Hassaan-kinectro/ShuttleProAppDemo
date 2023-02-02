import {FetchStories} from '../../services/Stories';
export const getStories = async (setLoading, setStories, workspaceId) => {
  setLoading(true);
  await FetchStories(workspaceId).then(res => {
    console.log(res, 'this is response');
    if (res.status === 200) {
      console.log(res.status, 'this is response statuss');
      if (res && res.data) {
        console.log(res.data, 'this is response statuss after 200');
        setStories(res.data);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  });
};
