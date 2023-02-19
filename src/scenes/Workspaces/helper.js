import {GetWorkSpaceUser} from '../../services/Workspace';
export const onRefresh = (setRefresh, setWorkspaceList) => {
  setRefresh(true);
  GetWorkSpaceUser()
    .then(res => {
      if (res.status === 200 && res.data.length > 0) {
        setRefresh(false);
        setWorkspaceList(prev => {
          return {...prev, data: res.data};
        });
      } else {
        setRefresh(false);
      }
    })
    .catch(err => {
      setRefresh(false);
      console.log(err);
    });
};

export const getRecord = setWorkspaceList => {
  setWorkspaceList(prev => {
    return {...prev, loading: true};
  });
  GetWorkSpaceUser()
    .then(res => {
      if (res.status === 200 && res.data.length > 0) {
        setTimeout(() => {
          setWorkspaceList({data: res.data, loading: false});
        }, 300);
      } else {
        setTimeout(() => {
          setWorkspaceList({data: [], loading: false});
        }, 300);
      }
    })
    .catch(err => {
      setWorkspaceList(prev => {
        return {...prev, loading: false};
      });
      console.log(err);
    });
};
