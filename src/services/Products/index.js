/* eslint-disable prettier/prettier */
import instance from '../../config/axios';
import {isArray} from 'lodash';
import {ParseError, responseData} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';
const FetchAllProducts = async (workspaceId, limit = 100000, page = 1) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .get(
      `/products?workspaceId=${workspaceId}&limit=${limit}&page=${page}`,
      token,
    )
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
            count: response.count,
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

const FetchProducts = async (workspaceId, limit = 100000, page = 1) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .get(
      `/products?workspaceId=${workspaceId}&limit=${limit}&page=${page}`,
      token,
    )
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          return {
            ...responseData,
            status: 200,
            message: response.message,
            count: response.count,
            data: response.data,
          };
        }
        return {
          ...responseData,
          message: response.message,
        };
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
const FetchFilterProducts = async (values, limit = 100000, page = 1) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  const filterConditons = {
    category_id:
      values && values.category && values.category.length > 0
        ? values.category[0]
        : null,
    preference_id: (values.preference && values.preference.id) || null,
    tag_id:
      values && values.tag && values.tag.length > 0 ? values.tag[0] : null,
    limit: limit,
    page: page,
  };
  const formData = {
    ...filterConditons,
    workspace_id: values && values.workspaceId ? values.workspaceId : null,
  };
  return instance
    .post('/products/filter', formData, token)
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          return {
            ...responseData,
            status: 200,
            message: response.message,
            count: response.count,
            data: response.data,
          };
        }
        return {
          ...responseData,
          message: response.message ? response.message : response.status,
        };
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
const FetchAllProductsCreateOrder = async workspaceId => {
  const token = await getAuthHeader();
  return instance
    .get(`/products/all?workspaceId=${workspaceId}`, token)
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          return {
            ...responseData,
            status: 200,
            message: response.message,
            data: response.data,
          };
        }
        return {
          ...responseData,
          message: response.message,
        };
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
export {
  FetchAllProducts,
  FetchProducts,
  FetchFilterProducts,
  FetchAllProductsCreateOrder,
};
