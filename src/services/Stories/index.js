import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';

export const FetchStories = async (workspaceId, page = 1, limit = 500) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };

  const token = await getAuthHeader();
  return instance
    .get(`/stories/?workspaceId=${workspaceId}`, token)
    .then(response => {
      if (response && response.data && response.data.code === 200) {
        response = {
          published: response && response.data && response.data.published,
          unPublished: response && response.data && response.data.unPublished,
          status: 200,
          message: 'Stories fetched Successfully.',
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
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};
export const DeleteStoryById = async id => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };

  const token = await getAuthHeader();
  return instance
    .delete(`/stories/${id}`, token)
    .then(response => {
      if (response && response.data && response.data.code === 200) {
        response = {
          status: 200,
          message: 'Stories Deleted Successfully.',
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
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};
export const UpdateStoryById = async id => {
  console.log(id, 'in the service update');
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };

  const token = await getAuthHeader();
  console.log(token, 'this is token');
  return instance
    .put(`/stories/${id}`, {data: {}}, token)
    .then(response => {
      console.log(response, 'aaaaaaaaarrrrrrrrrrr');
      if (response && response.data && response.data.code === 200) {
        response = {
          status: 200,
          data: response && response.data,
          message: 'Stories Updated Successfully.',
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
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};
