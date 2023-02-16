import {getAuthHeader} from '../../config/authSettings';
import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';

const FetchTags = async (workspaceId, page = 1, limit = 100000) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();

  return instance
    .get(`/tags?workspaceId=${workspaceId}&page=${page}&limit=${limit}`, token)
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          return {
            ...responseData,
            status: 200,
            data: response.data,
            count: response.count,
          };
        } else {
          return {
            ...responseData,
            message: response.message,
            data: [],
            count: 0,
          };
        }
      } else {
        return {
          ...responseData,
          message: ParseError(response.data),
          data: [],
          count: 0,
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

export {FetchTags};
