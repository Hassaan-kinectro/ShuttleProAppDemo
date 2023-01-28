/* eslint-disable prettier/prettier */
import instance from '../../config/axios';
import {isArray} from 'lodash';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';

const GetUsers = async () => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .get('/users', token)
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        return {
          ...responseData,
          data: isArray(response) ? response : [],
          status: 200,
          message: 'Users fetched successfully.',
        };
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
export {GetUsers};
