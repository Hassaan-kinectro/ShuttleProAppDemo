/* eslint-disable prettier/prettier */
import instance from '../../config/axios';
import {isArray, isObject} from 'lodash';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';
const CreateCheckpoint = async formdata => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  const data = {
    ...formdata,
  };
  console.log(data);
  return instance
    .post('/v1/checkpoints', data, token)
    .then(response => {
      console.log('the response', response);
      if (response.status === 200 || response.status === 201) {
        response = response.data;
        console.log(response);
        if (response.code === 200) {
          const order = isArray(response.data)
            ? response.data
            : JSON.parse(response.data);
          console.log(order);
          return {
            ...responseData,
            data: isObject(order) ? order : {},
            status: 200,
            message: 'Checkpoint Created successfully.',
          };
        } else {
          return {
            ...responseData,
            message: 'Checkpoint not Created!',
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
      console.log(err);
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};

export {CreateCheckpoint};
