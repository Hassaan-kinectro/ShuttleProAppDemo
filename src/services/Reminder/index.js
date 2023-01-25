import instance from '../../config/axios';
import {isArray, isNumber, isObject} from 'lodash';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';

const GetNotificationsUnReadCount = async () => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .get('/v1/reminders/un_read_by_user', token)
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          console.log(response.data);
          const notifications = isNumber(response.data)
            ? response.data
            : JSON.parse(response.data);
          return {
            ...responseData,
            data: isNumber(notifications) ? notifications : 0,
            status: 200,
            message: 'Notification fetched successfully.',
          };
        } else {
          return {
            ...responseData,
            message: 'Notification not found!',
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
      console.log(err.response);
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};

export {GetNotificationsUnReadCount};
