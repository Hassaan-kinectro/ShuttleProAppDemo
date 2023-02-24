import {GetWorkSpace} from '../../services/Workspace';
import {
  POST_LIMIT,
  TIMELINE,
  DATE,
  POST_DATE_TIME,
} from '../../utils/constants';
import {capitalize} from '../../utils';
import {uniqBy, orderBy} from 'lodash';
import moment from 'moment';
import * as Constants from './Constants';
import {
  fetchNextInstagramPosts,
  InstagramPostPublish,
  deletInstaPost,
} from '../../services/Instagram';
import {FetchCategoryList} from '../../services/Categories';
import {FetchTags} from '../../services/Tags';
import {FetchProducts} from '../../services/Products';
import {
  fetchNextFacebookPosts,
  updateFacebookPostStatus,
  deletFbPost,
} from '../../services/Facebook';
import {SaveStories, SaveScheduleStories} from '../../services/SocialProfiles';
import {showMessage} from 'react-native-flash-message';

export const defaultWorkspace = {
  data: null,
  users: [],
  open: false,
  initial: false,
  socialProfile: false,
};
export const defaultProducts = {data: [], loading: false};
export const defaultTags = {data: [], loading: false};
export const defaultCategories = {data: [], loading: false};

export const selectionTypes = [
  {
    id: 'product',
    name: 'Product',
    label: 'Product',
    value: 'Product',
  },
  {
    id: 'category',
    name: 'Category',
    value: 'category',
    label: 'Category',
  },
  {
    id: 'tag',
    name: 'Tag',
    value: 'tag',
    label: 'Tag',
  },
];

export const getAllCategories = async (setCategories, workspaceId) => {
  setCategories(prev => {
    return {...prev, loading: true};
  });
  const resp = await FetchCategoryList(workspaceId);
  if (resp.status === 200 && resp.data && resp.data.length > 0) {
    setCategories(prev => {
      return {
        ...prev,
        data: resp.data.map(d => {
          return {
            id: d.id,
            name: d.name ? capitalize(d.name) : '',
            label: d.name ? capitalize(d.name) : '',
            value: d.name ? capitalize(d.name) : '',
          };
        }),
        loading: false,
      };
    });
  } else {
    setCategories(prev => {
      return {...prev, data: [], loading: false};
    });
  }
};

export const getAllTags = async (setTags, workspaceId) => {
  setTags(prev => {
    return {...prev, loading: true};
  });
  const resp = await FetchTags(workspaceId);
  if (resp.status === 200 && resp.data && resp.data.length > 0) {
    setTags(prev => {
      return {
        ...prev,
        data: resp.data.map(d => {
          return {
            id: d.id,
            name: d.value ? capitalize(d.value) : '',
            label: d.value ? capitalize(d.value) : '',
            value: d.value ? capitalize(d.value) : '',
          };
        }),
        loading: false,
      };
    });
  } else {
    setTags(prev => {
      return {...prev, data: [], loading: false};
    });
  }
};

export const getAllProducts = async (setProducts, workspaceId) => {
  setProducts(prev => {
    return {...prev, loading: true};
  });
  const resp = await FetchProducts(workspaceId);
  if (resp.status === 200 && resp.data && resp.data.length > 0) {
    setProducts(prev => {
      return {
        ...prev,
        data: resp.data.map(d => {
          console.log(d);
          return {
            ...d,
            label: d.name + ` (${capitalize(d.code || '')})`,
            value: d.id,
            name:
              d.name && d.code
                ? capitalize(d.name) + ` (${capitalize(d.code)})`
                : capitalize(d.name),
          };
        }),
        loading: false,
      };
    });
  } else {
    setProducts(prev => {
      return {...prev, data: [], loading: false};
    });
  }
};
export const postModalDefault = {
  singlePost: false,
  layoutPost: false,
  photoPost: false,
  multiPost: false,
  batchPost: false,
  autoScheduler: false,
  instaStory: false,
  facebookStory: false,
  loading: false,
};

export const defaultPosts = {
  data: [],
  page: 1,
  limit: POST_LIMIT,
  next: '',
  type: TIMELINE,
};

const UniquePosts = (data, key = 'id') =>
  orderBy(
    uniqBy(data, key).map(d => {
      return {...d, date: moment(d.date).format('YYYY-MM-DDTHH:mm')};
    }),
    'date',
    'desc',
  );

export const setInstagramPosts = (data, setPosts, setLoad) => {
  if (
    data &&
    data.instagram &&
    data.instagram.data &&
    data.instagram.data.length > 0
  ) {
    setPosts(prev => {
      return {
        ...prev,
        data:
          prev.data.length > 0
            ? UniquePosts(data.instagram.data.concat(prev.data))
            : data.instagram.data,
        next: prev.next ? prev.next : data.instagram.next,
      };
    });
  }
};

export const fetchNextInstPosts = async (
  next,
  setPosts,
  workspaceId,
  pageId,
) => {
  if (next) {
    const instagram = await fetchNextInstagramPosts(workspaceId, pageId, next);
    if (instagram.status === 200) {
      setPosts(prev => {
        return {
          ...prev,
          data: UniquePosts(instagram.data.concat(prev.data)),
          next: instagram.next,
        };
      });
    } else {
      console.log('not ran');
    }
  }
};

export const setFacebookPosts = (data, setPosts) => {
  if (
    data &&
    data.facebook &&
    data.facebook.data &&
    data.facebook.data.length > 0
  ) {
    setPosts(prev => {
      return {
        ...prev,
        data:
          prev.data.length > 0
            ? UniquePosts(data.facebook.data.concat(prev.data), 'id')
            : data.facebook.data,
        next: prev.next ? prev.next : data.facebook.next,
      };
    });
  }
};

export const getDisabledStatus = values => {
  let result = true;
  if (
    values &&
    values.selectionType &&
    values.selectionType.id === Constants.PRODUCT
  ) {
    result = Boolean(values.productIds && values.productIds.length === 0);
  } else if (
    values &&
    values.selectionType &&
    values.selectionType.id === Constants.CATEGORY
  ) {
    result = Boolean(!values.categoryId && true);
  } else if (
    values &&
    values.selectionType &&
    values.selectionType.id === Constants.TAG
  ) {
    result = Boolean(!values.tagId && true);
  }
  return result;
};

export const fetchNextFBPosts = async (next, setPosts, workspaceId, pageId) => {
  if (next) {
    const facebook = await fetchNextFacebookPosts(workspaceId, pageId, next);
    if (facebook.status === 200) {
      setPosts(prev => {
        return {
          ...prev,
          data: UniquePosts(facebook.data.concat(prev.data), 'faceBookPostId'),
          next: facebook.next ? facebook.next : '',
        };
      });
    } else {
      console.log('not ran');
    }
  }
};

export const getWorkspace = async (
  id,
  setWorkspace,
  setCurrentProfile,
  params = null,
) => {
  setWorkspace(prev => {
    return {...prev, loading: true};
  });
  const resp = await GetWorkSpace(id);
  if (resp.status === 200 && resp.data) {
    const profiles =
      resp.data.social_profiles && resp.data.social_profiles.length > 0
        ? resp.data.social_profiles
        : [];
    const profile =
      params && params.socialProfile && params.socialProfile.id
        ? profiles.find(p => p.id === params.socialProfile.id)
        : resp.data.social_profiles[0];
    setCurrentProfile(
      profile
        ? profile
        : resp.data.social_profiles[0]
        ? resp.data.social_profiles[0]
        : null,
    );
    setWorkspace(prev => {
      return {
        ...prev,
        data: resp.data,
        socialProfile:
          resp.data.social_profiles &&
          resp.data.social_profiles.length === 0 &&
          true,
        loading: false,
      };
    });
  } else {
    console.log(resp.message, 'in case of error');
    setWorkspace(prev => {
      return {...prev, loading: false};
    });
  }
};

const onClickEdit = (row, setOpen, setPost) => {
  setPost(row);
  setOpen(true);
};

const getLabel = (row, profileType, t) => {
  let text = t('dialog.post.publish');
  if (
    profileType !== 'facebook' &&
    ((row && row.instaPublishId) || (row && row.sequenceId))
  ) {
    text = t('dialog.post.publish.layout');
  }
  return text;
};

const onClickPublish = async (row, profileType, setPosts, t) => {
  if (profileType === Constants.FACEBOOK) {
    const resp = await updateFacebookPostStatus({
      id: row.id,
    });
    if (resp.status === 200) {
      setPosts(prev => {
        return {
          ...prev,
          data: prev.data.map(d =>
            d.id === row.id ? {...d, postStatus: Constants.PROCESSING} : d,
          ),
        };
      });
      showMessage({
        message: resp.message,
        description: 'Publish Successfully',
        type: 'success',
      });
    } else {
      showMessage({
        message: resp.message,
        description: 'Not Published ',
        type: 'DANGER',
      });
    }
  } else {
    const resp = await InstagramPostPublish({
      id: row.id,
    });
    if (resp.status === 200) {
      if (resp.data.length > 0) {
        setPosts(prev => {
          return {
            ...prev,
            data: prev.data.map(d =>
              resp.data.find(k => k.id === d.id)
                ? {...d, postStatus: Constants.PROCESSING}
                : d,
            ),
          };
        });
      } else {
        setPosts(prev => {
          return {
            ...prev,
            data: prev.data.map(d =>
              d.id === row.id ? {...d, postStatus: Constants.PROCESSING} : d,
            ),
          };
        });
      }
      showMessage({
        message: resp.message,
        description: 'Publish Successfully',
        type: 'success',
      });
    } else {
      showMessage({
        message: resp.message,
        description: 'Not Published',
        type: 'DANGER',
      });
    }
  }
};
const UpdateStatus = async (row, status, setPosts) => {
  // const resp = await UpdateInstagramPostStatus({
  //   id: row.id,
  //   status: status,
  // });
  // if (resp.status === 200) {
  //   if (resp.data.length > 0) {
  //     setPosts(prev => {
  //       return {
  //         ...prev,
  //         data: prev.data.map(d =>
  //           resp.data.find(k => k.id === d.id) ? {...d, postStatus: status} : d,
  //         ),
  //       };
  //     });
  //   } else {
  //     setPosts(prev => {
  //       return {
  //         ...prev,
  //         data: prev.data.map(d =>
  //           d.id === row.id ? {...d, postStatus: status} : d,
  //         ),
  //       };
  //     });
  //   }
  //   success(resp.message);
  // } else {
  //   error(resp.message);
  // }
};

const onClickReject = async (row, profileType, setPosts, t) => {
  if (profileType === Constants.FACEBOOK) {
    const resp = await updateFacebookPostStatus({
      id: row.id,
      status: Constants.REJECTED,
    });
    if (resp.status === 200) {
      setPosts(prev => {
        return {
          ...prev,
          data: prev.data.map(d =>
            d.id === row.id ? {...d, postStatus: Constants.REJECTED} : d,
          ),
        };
      });
      showMessage({
        message: resp.message,
        description: 'Publish Rejected Successfully',
        type: 'success',
      });
    } else {
      showMessage({
        message: resp.message,
        description: 'Not Rejected',
        type: 'DANGER',
      });
    }
  } else {
    await UpdateStatus(row, Constants.REJECTED, setPosts);
  }
};

const onClickDelete = async (row, profileType, setPosts, t) => {
  if (profileType === Constants.FACEBOOK) {
    const resp = await deletFbPost(row.id);
    if (resp.status === 200) {
      setPosts(prev => {
        return {
          ...prev,
          data: prev.data.filter(d => d.id !== row.id),
        };
      });
      showMessage({
        message: resp.message,
        description: 'Facebook Post Deleted Successfully',
        type: 'success',
      });
    } else {
      showMessage({
        message: resp.message,
        description: 'Not Deleted',
        type: 'DANGER',
      });
    }
  } else {
    const resp = await deletInstaPost(row.id);
    if (resp.status === 200) {
      setPosts(prev => {
        return {
          ...prev,
          data: prev.data.filter(d => d.id !== row.id),
        };
      });
      showMessage({
        message: resp.message,
        description: 'Instagram Post Deleted Successfully',
        type: 'success',
      });
    } else {
      showMessage({
        message: resp.message,
        description: 'Not Deleted',
        type: 'DANGER',
      });
    }
  }
};

const onClickShow = (row, profileType, setPosts) => {
  // const type =
  //   row.instagramPostId || row.instagramPostId === ''
  //     ? 'instagram'
  //     : 'facebook';
  // window.open(`/social-profiles/${row.id}?type=${type}`);
};

const onClickComments = (
  row,
  profileType,
  setPosts,
  setSelectedCommentPost,
) => {
  setSelectedCommentPost(row);
};
const CommonActions = [
  {
    label: 'comments',
    action: Constants.COMMETNS,
    // icon: <ConversationIcon className="text-xl text-fontPrimary" />,
    onClick: onClickComments,
  },
  {
    label: 'show',
    action: Constants.SHOW,
    // icon: <ShowIcon className="text-xl text-fontPrimary" />,
    onClick: onClickShow,
  },
];
const ActionMenuList = [
  {
    postStatus: 'pending',
    list: [
      // {
      //   label: 'edit',
      //   action: Constants.EDIT,
      //   // icon: <EditIcon className="text-xl text-fontPrimary" />,
      //   onClick: onClickEdit,
      // },
      {
        label: 'Approve & Publish',
        action: Constants.APPROVE,
        // icon: <PublishIcon className="text-xl text-fontPrimary" />,
        onClick: onClickPublish,
      },
      {
        label: 'reject',
        action: Constants.REJECT,
        // icon: <ClearIcon className="text-xl text-fontPrimary" />,
        onClick: onClickReject,
      },
      // ...CommonActions,
      {
        label: 'delete',
        action: Constants.DELETE,
        // icon: <TrashIcon className="text-xl text-fontPrimary" />,
        onClick: onClickDelete,
      },
    ],
  },
  {
    postStatus: 'rejected',
    list: [
      // {
      //   label: 'edit',
      //   action: Constants.EDIT,
      //   // icon: <EditIcon className="text-xl text-fontPrimary" />,
      //   onClick: onClickEdit,
      // },
      {
        label: 'Approve & Publish',
        action: Constants.APPROVE,
        // icon: <ApprovedIcon className="text-xl text-fontPrimary" />,
        onClick: onClickPublish,
      },
      ...CommonActions,
      {
        label: 'delete',
        action: Constants.DELETE,
        // icon: <TrashIcon className="text-xl text-fontPrimary" />,
        onClick: onClickDelete,
      },
    ],
  },
  {
    postStatus: 'processing',
    list: [],
  },
];

export const GetMenuList = (postStatus, scheduleId) => {
  let result = ActionMenuList.find(d => d.postStatus === postStatus);
  if (result) {
    // if (scheduleId) {
    //   return result.list.filter((k) => k.label !== "publish") || [];
    // }
    return result.list || [];
  }
};

export const saveStory = async (values, handles, closeStoryModal) => {
  if (values[Constants.FORM_TYPE] === Constants.CUSTOM) {
    let dateFormat = '';
    if (values.date) {
      dateFormat = moment(values.date).format(POST_DATE_TIME);
    }

    handles.setFieldValue('loading', true);
    let formData = {
      type: values.type || '',
      pageName: values.pageName || '',
      pagelogo: values.pagelogo || '',
      workspaceId: values.workspaceId.toString() || '',
      pageId: values.pageId || '',
      accessToken: values.accessToken || '',
      carousel: values.carousel || '',
      productIds: values.products || [],
      userId: values.userId || '',
      shareAt: dateFormat,
    };
    console.log(formData);
    const resp = await SaveStories(formData);
    if (resp.status === 200) {
      showMessage({
        message: resp.message,
        description: 'Story Saved Successfully',
        type: 'success',
      });
      handles.resetForm();
      closeStoryModal();
    } else {
      showMessage({
        message: resp.message,
        description: ' Story Not Saved',
        type: 'DANGER',
      });
    }
    handles.setFieldValue('loading', false);
  } else {
    handles.setFieldValue('loading', true);
    const stories = values.slots.map(s => {
      return {
        type: values.type || '',
        pageName: values.pageName || '',
        pagelogo: values.pagelogo || '',
        workspaceId: values.workspaceId.toString() || '',
        pageId: values.pageId || '',
        accessToken: values.accessToken || '',
        userId: values.userId || '',
        images: s.images.map(i => i.url) || [],
        productIds: s.products || [],
        shareAt: s.date,
      };
    });

    const resp = await SaveScheduleStories(stories);
    if (resp.status === 200) {
      showMessage({
        message: resp.message,
        description: 'Story Schedule Saved Successfully',
        type: 'success',
      });
      handles.resetForm();
      closeStoryModal();
    } else {
      showMessage({
        message: resp.message,
        description: ' Story Not Scheduled ',
        type: 'DANGER',
      });
    }
    handles.setFieldValue('loading', false);
  }
};
