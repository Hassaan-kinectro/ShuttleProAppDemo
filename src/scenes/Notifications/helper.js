import {showMessage} from 'react-native-flash-message';
import {
  NotificationMarkAsRead,
  AllNotificationMarkAsRead,
  GetNotifications,
} from '../../services/Notifications';
import {GetWorkSpace} from '../../services/Workspace';
import {Routes} from '../../utils/constants';
import {uniqBy} from 'lodash';
const limit = 50;
export const pageLimit = limit;
export const defaultValue = {
  count: 0,
  data: [],
  loading: false,
  record: [],
  showAll: true,
  page: 1,
  loadMoreLoading: false,
};
const UniqueNotifications = (data, key = '_id') => uniqBy(data, key);

export const setNotificationsData = (data, setNotifications) => {
  if (
    data &&
    data.getAllNotificationUpdates &&
    data.getAllNotificationUpdates.length > 0
  ) {
    setNotifications(prev => {
      const record =
        prev.data.length > 0
          ? UniqueNotifications(
              data.getAllNotificationUpdates.concat(prev.data),
            )
          : data.getAllNotificationUpdates;
      const count = record.reduce((p, n) => (!n.isRead ? p + 1 : p), 0);
      return {
        ...prev,
        data: record,
        count: count,
        record: record.filter(n => (prev.showAll ? true : !n.isRead)),
      };
    });
  }
};
export const redirectToScreen = async (
  notification,
  workspace,
  setNotifications,
  navigateTo,
) => {
  setNotifications(prev => {
    return {...prev, loading: true};
  });
  if (
    (workspace &&
      workspace.workspace &&
      workspace.workspace.id &&
      workspace.workspace.id.toString() !==
        notification.workspaceId.toString()) ||
    !workspace
  ) {
    const res = await GetWorkSpace(notification.workspaceId);
    if (res && res.status === 200 && res.data && res.data.workspace) {
      moveToScreen(notification, setNotifications, navigateTo, res.data);
    } else {
      showMessage({
        message: '',
        description: 'Could not open notification',
        type: 'error',
      });
    }
  } else {
    moveToScreen(notification, setNotifications, navigateTo, workspace);
  }
};
const moveToScreen = (
  notification,
  setNotifications,
  navigateTo,
  workspace,
) => {
  if (notification.type.toLowerCase() === 'lowProductInventory'.toLowerCase()) {
    navigateTo(workspace, {
      screen: Routes.BOTTOMTAB,
      params: {
        screen: Routes.PRODUCTS,
        params: {
          screen: Routes.PRODUCTSLIST,
          // params: {
          //   workspaceId: workspace.workspace.id,
          // },
        },
      },
    });
  } else if (notification.type.toLowerCase() === 'activity'.toLowerCase()) {
    navigateTo(workspace, {
      screen: Routes.BOTTOMTAB,
      params: {
        screen: Routes.ORDERS,
        params: {
          screen: Routes.ORDERSLIST,
          // params: {
          //   workspaceId: workspace.workspace.id,
          // },
        },
      },
    });
  } else if (
    notification.type.toLowerCase() === 'internalComments'.toLowerCase() ||
    notification.type.toLowerCase() === 'instagramPost'.toLowerCase() ||
    notification.type.toLowerCase() === 'facebookPost'.toLowerCase()
  ) {
    // const profile = workspace.social_profiles.find(
    //   w => notification.routes && w.page_id === notification.routes.id,
    // );
    // if (!profile) {
    //   setNotifications(prev => {
    //     return {...prev, loading: false};
    //   });
    //   return showMessage({
    //     message: '',
    //     description: 'Could not open notification',
    //     type: 'error',
    //   });
    // }
    navigateTo(workspace, {
      screen: Routes.BOTTOMTAB,
      params: {
        screen: Routes.SOCIALPROFILE,
        params: {
          screen: Routes.SOCIALPROFILELIST,
          // params: {
          //   workspaceId: workspace.workspace.id,
          //   socialProfile: profile,
          // },
        },
      },
    });
  } else if (notification.type.toLowerCase() === 'Story'.toLowerCase()) {
    const profile = workspace.social_profiles.find(
      w => notification.routes && w.page_id === notification.routes.queryData,
    );
    if (!profile) {
      setNotifications(prev => {
        return {...prev, loading: false};
      });
      return showMessage({
        message: '',
        description: 'Could not open notification',
        type: 'error',
      });
    }
    navigateTo(workspace, {
      screen: Routes.BOTTOMTAB,
      params: {
        screen: Routes.SOCIALPROFILE,
        params: {
          screen: Routes.SHOWSTORY,
          // currentProfile: profile,
          params: {
            currentProfile: profile,
            openId: notification.routes.id,
          },
        },
      },
    });
  } else if (
    notification.type.toLowerCase() ===
      'instagramDirectMessage'.toLowerCase() ||
    notification.type.toLowerCase() === 'facebookDirectMessage'.toLowerCase()
  ) {
    setNotifications(prev => {
      return {...prev, loading: false};
    });
    return showMessage({
      message: '',
      description: 'Could not open notification',
      type: 'error',
    });
  }
  setNotifications(prev => {
    return {...prev, loading: false};
  });
};
export const setMarkAsRead = (item, setNotifications) => {
  setNotifications(prev => {
    return {...prev, loading: true};
  });
  NotificationMarkAsRead(item.id, {isRead: true}).then(res => {
    if (res.status === 200) {
      setNotifications(prev => {
        const data = prev.data.map(d =>
          d.id === item.id ? {...d, isRead: true} : d,
        );
        return {
          ...prev,
          data: data,
          record: toggleUnRead(data, prev.showAll),
          loading: false,
        };
      });
      showMessage({
        message: '',
        description: res.message,
        type: 'success',
      });
    } else {
      setNotifications(prev => {
        return {...prev, loading: false};
      });
      showMessage({
        message: '',
        description: res.message,
        type: 'error',
      });
    }
  });
};
export const setMarkAsReadAll = (userId, setNotifications) => {
  setNotifications(prev => {
    return {...prev, loading: true};
  });
  AllNotificationMarkAsRead({userId: userId}).then(res => {
    if (res.status === 200) {
      setNotifications(prev => {
        const data = prev.data.map(d => {
          return {...d, isRead: true};
        });
        return {
          ...prev,
          data: data,
          record: toggleUnRead(data, prev.showAll),
          loading: false,
        };
      });
      showMessage({
        message: '',
        description: res.message,
        type: 'success',
      });
    } else {
      setNotifications(prev => {
        return {...prev, loading: false};
      });
      showMessage({
        message: '',
        description: res.message,
        type: 'error',
      });
    }
  });
};
const toggleUnRead = (data, state) => {
  return data.filter(d => (state ? true : !d.isRead));
};
export const setUnReadToggle = setNotifications => {
  setNotifications(prev => {
    return {
      ...prev,
      record: toggleUnRead(prev.data, !prev.showAll),
      showAll: !prev.showAll,
    };
  });
};
export const setOnRefresh = (setRefresh, userId, setNotifications) => {
  setRefresh(true);
  GetNotifications(userId, 1, limit).then(res => {
    if (res.status === 200 && res.data && res.data.length > 0) {
      setNotifications(prev => {
        const record =
          prev.data.length > 0
            ? UniqueNotifications(res.data.concat(prev.data))
            : res.data;
        const count = record.reduce((p, n) => (!n.isRead ? p + 1 : p), 0);
        return {
          ...prev,
          data: record,
          count: count,
          record: record.filter(n => (prev.showAll ? true : !n.isRead)),
        };
      });
      setRefresh(false);
    } else {
      setRefresh(false);
    }
  });
};
export const setLoadMore = (notifications, userId, setNotifications) => {
  if (notifications.loadMoreLoading) {
    return false;
  }
  const page = notifications.page + 1;
  setNotifications(prev => {
    return {...prev, loadMoreLoading: true};
  });
  GetNotifications(userId, page, limit).then(res => {
    if (res.status === 200 && res.data && res.data.length > 0) {
      setNotifications(prev => {
        const record =
          prev.data.length > 0
            ? UniqueNotifications(res.data.concat(prev.data))
            : res.data;
        const count = record.reduce((p, n) => (!n.isRead ? p + 1 : p), 0);
        return {
          ...prev,
          data: record,
          count: count,
          page: page,
          record: record.filter(n => (prev.showAll ? true : !n.isRead)),
          loadMoreLoading: false,
        };
      });
    } else {
      setNotifications(prev => {
        return {...prev, loadMoreLoading: true};
      });
    }
  });
};
