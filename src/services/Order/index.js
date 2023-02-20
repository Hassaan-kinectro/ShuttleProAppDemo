/* eslint-disable prettier/prettier */
import instance from '../../config/axios';
import {isArray, isObject} from 'lodash';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';

const GetOrders = async (workspaceId, page, offset) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .get(
      `/orders?workspace_id=${workspaceId}&page=${page}&limit=${offset}`,
      token,
    )
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          const product = isArray(response.data)
            ? response.data
            : JSON.parse(response.data);
          return {
            ...responseData,
            data: isArray(product) ? product : [],
            status: 200,
            message: 'Orders fetched successfully.',
          };
        } else {
          return {
            ...responseData,
            message: 'Orders not found!',
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
const GetOrdersByFilter = async (workspaceId, page, offset, filter) => {
  const responseData = {
    loading: false,
    status: 210,
    count: 0,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  const data = {
    ...filter,
    start_date: filter.startDate,
    end_date: filter.endDate,
    workspace_id: workspaceId,
    page: page,
    limit: offset,
  };
  return instance
    .post('/orders/filter', data, token)
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        response = response.data;
        if (response.code === 200) {
          return {
            ...responseData,
            status: 200,
            message: response.message,
            count: response.count,
            data: response.data,
          };
        } else {
          return {
            ...responseData,
            message: 'Orders not found!',
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
const CreateOrders = async (formdata, workspace_id) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  const data = {
    workspace_id: workspace_id,
    ...formdata,
  };

  return instance
    .post('/orders', data, token)
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        response = response.data;

        if (response.code === 200) {
          const order = isArray(response.data) ? response.data : response.data;

          return {
            ...responseData,
            data: isObject(order) ? order : {},
            status: 200,
            message: 'Orders Created successfully.',
          };
        } else {
          return {
            ...responseData,
            message: 'Orders not Created!',
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
const UpdateOrders = async formdata => {
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
    .put('/orders', data, token)
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        response = response.data;

        if (response.code === 200) {
          const order = isArray(response.data) ? response.data : response.data;

          return {
            ...responseData,
            data: isObject(order) ? order : {},
            status: 200,
            message: 'Orders Updated successfully.',
          };
        } else {
          return {
            ...responseData,
            message: 'Orders not Updated!',
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
const getOrderStatus = async (workspace_id, order_id) => {
  try {
    const responseData = {
      loading: false,
      status: 210,
      message: 'Something went wrong, Please try again.',
    };
    const token = await getAuthHeader();
    console.log('enter', token);
    return instance
      .get(
        '/orders/order_status?workspace_id=' +
          workspace_id +
          '&order_id=' +
          order_id,
        token,
      )
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          response = response.data;
          if (response.code === 200) {
            const order = response.data
              ? response.data
              : JSON.parse(response.data);
            return {
              ...responseData,
              data: isObject(order) ? order : {},
              status: 200,
              message: 'Order status fetched successfully.',
            };
          } else {
            return {
              ...responseData,
              message: 'Order not found!',
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
        console.log(err, err.response.data);
        return {
          ...responseData,
          message: ParseError(
            err.response && err.response.data ? err.response.data : err.message,
          ),
        };
      });
  } catch (error) {
    console.log(error);
  }
};
const getOrderDetail = async (order_id, workspace_id) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .get(
      `/orders/order_info?workspaceId=${workspace_id}&order_id=${order_id}`,
      token,
    )
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        response = response.data;
        if (response.code === 200) {
          const order = response.data
            ? response.data
            : JSON.parse(response.data);
          return {
            ...responseData,
            data: isObject(order) ? order : {},
            status: 200,
            message: 'Order Detail fetched successfully.',
          };
        } else {
          return {
            ...responseData,
            message: 'Order not found!',
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
const cancelOrder = async (workspace_id, order_id) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .get(
      '/orders/cancel_order?workspace_id=' +
        workspace_id +
        '&order_id=' +
        order_id,
      token,
    )
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        response = response.data;
        if (response.code === 200) {
          const order = isArray(response.data)
            ? response.data
            : JSON.parse(response.data);
          return {
            ...responseData,
            data: isArray(order) ? order : [],
            status: 200,
            message: 'Order cancel successfully.',
          };
        } else {
          return {
            ...responseData,
            message: 'Order not found!',
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
const getOrdersByDates = async (workspaceId, startDate, endDate) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .get(
      '/orders/get_order_by_date?workspace_id=' +
        workspaceId +
        '&start_date=' +
        startDate +
        '&end_date=' +
        endDate,
      token,
    )
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        response = response.data;
        if (response.code === 200) {
          const order = isArray(response.data)
            ? response.data
            : JSON.parse(response.data);
          return {
            ...responseData,
            data: isObject(order) ? order : {},
            status: 200,
            message: 'Orders fetched successfully.',
          };
        } else {
          return {
            ...responseData,
            message: 'Orders not found!',
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
      console.log(err.response);
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};
const getDaysOrdersByDates = async (workspaceId, startDate, endDate) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .get(
      '/orders/get_days_orders_by_date?workspace_id=' +
        workspaceId +
        '&start_date=' +
        startDate +
        '&end_date=' +
        endDate,
      token,
    )
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        response = response.data;
        if (response.code === 200) {
          const order = isArray(response.data)
            ? response.data
            : JSON.parse(response.data);
          return {
            ...responseData,
            data: isObject(order) ? order : {},
            status: 200,
            message: 'Orders fetched successfully.',
          };
        } else {
          return {
            ...responseData,
            message: 'Orders not found!',
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
const getOrdersStatisticsByDates = async (workspaceId, startDate, endDate) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .get(
      '/orders/get_orders_statistics_by_dates?workspace_id=' +
        workspaceId +
        '&start_date=' +
        startDate +
        '&end_date=' +
        endDate,
      token,
    )
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        response = response.data;
        if (response.code === 200) {
          const order = isArray(response.data)
            ? response.data
            : JSON.parse(response.data);
          return {
            ...responseData,
            data: isObject(order) ? order : {},
            status: 200,
            message: 'Orders fetched successfully.',
          };
        } else {
          return {
            ...responseData,
            message: 'Orders not found!',
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

export {
  GetOrders,
  GetOrdersByFilter,
  getOrderStatus,
  cancelOrder,
  CreateOrders,
  UpdateOrders,
  getOrderDetail,
  getOrdersByDates,
  getOrdersStatisticsByDates,
  getDaysOrdersByDates,
};
