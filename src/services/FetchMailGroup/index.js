import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';

export const FetchMailGroups = async (workspaceId, page = 1, limit = 10000) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };

  const token = await getAuthHeader();
  return instance
    .get(
      `/mailGroups?workspaceId=${workspaceId}&page=${page}&limit=${limit}`,
      token,
    )
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        response = {
          data: response.data,
          count: response.count,
          status: 200,
          message: 'Mail groups Fetched Successfully.',
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
