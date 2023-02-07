import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';

export const FetchActivities = async (workspaceId, page = 1, limit = 500) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };

  const token = await getAuthHeader();
  return instance
    .get(
      `/activity?workspaceId=${workspaceId}&page=${page}&limit=${limit}`,
      token,
    )
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        response = {
          data: response.data,
          count: response.count,
          status: 200,
          message: 'Activities fetched Successfully.',
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

export const FetchActivitiesByOrderId = async (workspace_id, order_id) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };

  const token = await getAuthHeader();
  return instance
    .get(
      `/activity/order?orderId=${order_id}&workspaceId=${workspace_id}`,
      token,
    )
    .then(response => {
      if (response.status === 200) {
        response = response.data.data;
        response = {
          data: response,
          status: 200,
          message: 'Activities fetched Successfully.',
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
export const CreateActivity = async formData => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .post('/activity', formData, token)
    .then(response => {
      if (response.status === 200) {
        response = response.data.data;
        response = {
          data: response,
          status: 200,
          message: 'Activity created Successfully.',
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
