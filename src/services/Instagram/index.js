import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';

const fetchNextInstagramPosts = async (workspaceId, pageId, next) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .post(
      '/socialProfiles/instagram/next/posts',
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

const InstagramPostPublish = async data => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .put('/socialProfiles/instagram/publish', data, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
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
          data,
          message: response.message,
        };
      } else {
        console.log(response);
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

const deletInstaPost = async id => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();

  return instance
    .delete('/socialProfiles/instagram/' + id, token)
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
const FetchProductImages = async (ids = 1, workspaceId) => {
  console.log(ids, workspaceId, ' in the service');
  const responseData = {
    loading: false,
    status: 210,
    message: 'something went wrong, please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .post(
      '/socialProfiles/instagram/products/images',
      {
        ids: ids,
        workspaceId,
      },
      token,
    )
    .then(response => {
      if (response.status === 200) {
        response = response.data.data;
        response = {
          data: response,
          status: 200,
          message: 'Instagram post fetched Successfully.',
        };
        return response;
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

export {
  fetchNextInstagramPosts,
  InstagramPostPublish,
  deletInstaPost,
  FetchProductImages,
};
