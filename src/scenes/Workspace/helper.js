export const onRefresh = (setRefresh, GetWorkSpaceUser, setWorkspaceList) => {
  setRefresh(true);
  GetWorkSpaceUser()
    .then(res => {
      if (res.status === 200 && res.data.length > 0) {
        setRefresh(false);
        setWorkspaceList(res.data);
      } else {
        setRefresh(false);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const getRecord = (setLoading, GetWorkSpaceUser, setWorkspaceList) => {
  setLoading(true);
  GetWorkSpaceUser()
    .then(res => {
      if (res.status === 200 && res.data.length > 0) {
        setTimeout(() => {
          setWorkspaceList(res.data);
          setLoading(false);
        }, 300);
      } else {
        setTimeout(() => {
          setWorkspaceList([]);
          setLoading(false);
        }, 300);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
