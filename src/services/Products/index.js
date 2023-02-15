/* eslint-disable prettier/prettier */
import instance from '../../config/axios';
import {isArray, isObject} from 'lodash';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';
const FetchAllProducts = async workspaceId => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .get(`/products?workspaceId=${workspaceId}`, token)
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        response = response.data;

        if (response.code === 200) {
          const product = isArray(response.data)
            ? response.data
            : JSON.parse(response.data);
          return {
            ...responseData,
            data: isArray(product) ? product : [],
            status: 200,
            message: 'Products fetched successfully.',
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

export {FetchAllProducts};
