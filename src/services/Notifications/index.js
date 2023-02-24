import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';
import {isObject} from 'lodash';

const AddNotification = async data => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .post('/mongodb/notification', data, token)
    .then(async response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          response = response.data;
          return {
            data: response,
            status: 200,
            message: 'Notification Saved Successfully.',
          };
        } else {
          return {
            ...responseData,
            data: response,
            status: 400,
            message: 'Notification Not Found.',
          };
        }
      } else {
        return {
          ...responseData,
          message: ParseError(response),
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

const UpdateNotification = async (formdata, id) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  const data = {
    ...formdata,
  };

  return instance
    .put(`/mongodb/notification/${id}`, data, token)
    .then(async response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          return {
            status: 200,
            message: 'Notification has been updated successfully.',
          };
        } else {
          return {
            ...responseData,
            data: response,
            status: 400,
            message: 'Notification Not Created Successfully.',
          };
        }
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

const GetNotificationByDeviceId = async device => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };

  const token = await getAuthHeader();

  return instance
    .get(`/mongodb/notification/device/${device}`, token)
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          const result = isObject(response.data)
            ? response.data
            : JSON.parse(response.data);
          return {
            ...responseData,
            data: isObject(result) ? result : {},
            status: 200,
            message: 'Notification of the user found successfully',
          };
        } else {
          return {
            ...responseData,
            message: 'Notification of the user not found',
          };
        }
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

export {GetNotificationByDeviceId, UpdateNotification, AddNotification};
