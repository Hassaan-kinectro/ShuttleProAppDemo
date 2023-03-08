import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';
import {isObject} from 'lodash';

const GetNotifications = async (id, page = 1, limit = 50) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .get(`/notifications/${id}?page=${page}&limit=${limit}`, token)
    .then(async response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          response = response.data;
          return {
            data: response,
            status: 200,
            message: 'Notification fetch successfully!',
          };
        } else {
          return {
            ...responseData,
            data: response,
            status: 400,
            message: 'Notification not found!',
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
const NotificationMarkAsRead = async (id, data) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .put(`/notifications/updateNotification/${id}`, data, token)
    .then(async response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          response = response.data;
          return {
            data: response,
            status: 200,
            message: 'Notification update successfully!',
          };
        } else {
          return {
            ...responseData,
            data: response,
            status: 400,
            message: 'Notification not found!',
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

const AllNotificationMarkAsRead = async formdata => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .post('/notifications/updateAllNotifications', formdata, token)
    .then(async response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          return {
            status: 200,
            message: 'Notification has been updated successfully!',
          };
        } else {
          return {
            ...responseData,
            data: response,
            status: 400,
            message: 'Notification not updated!',
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

export {GetNotifications, NotificationMarkAsRead, AllNotificationMarkAsRead};
