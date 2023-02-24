import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';

const fetchNextFacebookPosts = async (workspaceId, pageId, next) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .post(
      '/socialProfiles/facebook/next/posts',
      {
        workspaceId: workspaceId,
        pageId: pageId,
        next: next,
      },
      token,
    )
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          const data = response.data;
          return {
            ...responseData,
            status: 200,
            message: response.message,
            next: response.next,
            data,
          };
        }
        return {
          ...responseData,
          message: response.message,
        };
      } else {
        console.log(response, 'else ran');
        return {
          ...responseData,

          message: ParseError(response.data),
        };
      }
    })
    .catch(err => {
      console.log(err);
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};
const updateFacebookPostStatus = async data => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  const url = data.status
    ? '/socialProfiles/facebook/update-status'
    : '/socialProfiles/facebook/publish';
  return instance
    .put(url, data, token)
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          const data = response.data;
          return {
            ...responseData,
            status: 200,
            message: response.message,
            next: response.next,
            data,
          };
        }
        return {
          ...responseData,
          message: response.message,
        };
      } else {
        return {
          ...responseData,
          message: ParseError(response.data),
        };
      }
    })
    .catch(err => {
      console.log(err);
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};

const deletFbPost = async id => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();

  return instance
    .delete('/socialProfiles/facebook/' + id, token)
    .then(response => {
      if (response.status === 200) {
        response = response.data;

        return {
          status: response.code,
          message: response.message,
          data: response.data,
        };
      } else {
        return {
          ...responseData,
          message: ParseError(response.data),
        };
      }
    })
    .catch(err => {
      console.log(err);
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};

const getPostSlots = async (data, workspaceId) => {
  console.log(data, workspaceId);
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .post(
      '/socialProfiles/facebook/getSchedulePostSlots',
      {...data, workspaceId},
      token,
    )
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          const data = response.data;
          return {
            ...responseData,
            status: 200,
            message: response.message,
            data,
          };
        }
        return {
          ...responseData,
          message: response.message,
        };
      } else {
        console.log(response, 'else ran');
        return {
          ...responseData,
          message: ParseError(response.data),
        };
      }
    })
    .catch(err => {
      console.log(err);
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};

export {
  fetchNextFacebookPosts,
  updateFacebookPostStatus,
  deletFbPost,
  getPostSlots,
};
