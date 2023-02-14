import {GetWorkSpace} from '../../services/Workspace';
import {POST_LIMIT, TIMELINE} from '../../utils/constants';
import {uniqBy, orderBy} from 'lodash';
import moment from 'moment';
import {fetchNextInstagramPosts} from '../../services/Instagram';
import {fetchNextFacebookPosts} from '../../services/Facebook';

export const defaultWorkspace = {
  data: null,
  users: [],
  open: false,
  initial: false,
  socialProfile: false,
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

export const setInstagramPosts = (data, setPosts) => {
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
      console.log(prev.data.concat());
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
  profileId = null,
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
    const profile = profileId
      ? profiles.find(p => p.id.toString() === profileId.toString())
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
