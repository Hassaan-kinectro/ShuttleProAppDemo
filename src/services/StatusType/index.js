/* eslint-disable prettier/prettier */
import instance from '../../config/axios';
import {isArray} from 'lodash';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';
const GetStatusTypes = async () => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .get('/statusTypes', token)
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          return {
            ...responseData,
            status: 200,
            message: 'Status types fetch successfully.',
            data: response.data,
          };
        } else {
          return {
            ...responseData,
            message: response.message,
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
      console.log(err, 'asaddsa');
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};
export {GetStatusTypes};
