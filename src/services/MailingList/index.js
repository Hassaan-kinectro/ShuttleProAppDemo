/* eslint-disable prettier/prettier */
import instance from '../../config/axios';
import {isArray} from 'lodash';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';
const GetMailingLists = async () => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .get('/v1/mailing_lists', token)
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        return {
          ...responseData,
          data: isArray(response) ? response : [],
          status: 200,
          message: 'Mailing lists fetched successfully.',
        };
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
export {GetMailingLists};
