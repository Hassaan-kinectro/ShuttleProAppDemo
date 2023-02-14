import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';
const responseData = {
  loading: false,
  status: 210,
  message: 'Something went wrong, Please try again.',
};

const FetchDaysOrderByDate = async (workspaceId, startDate, endDate) => {
  const token = await getAuthHeader();
  return instance
    .get(
      '/orders/daysOrdersByDate?workspaceId=' +
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
          return {
            ...responseData,
            status: 200,
            message: response.message,
            data: response.data,
          };
        } else {
          return {
            ...responseData,
            message: response.message,
          };
        }
      } else {
        // console.log(response);
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

const FetchCriticalOrdersByDate = async (workspaceId, startDate, endDate) => {
  const token = await getAuthHeader();

  return instance
    .get(
      '/orders/criticalOrders?workspaceId=' +
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
          return {
            ...responseData,
            status: 200,
            queriedCount: response.inprogressCount,
            message: response.message,
            data: response.data,
          };
        } else {
          return {
            ...responseData,
            message: response.message,
          };
        }
      } else {
        // console.log(response);
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

const FetchReturnOrdersByDate = async (workspaceId, startDate, endDate) => {
  const token = await getAuthHeader();

  return instance
    .get(
      '/orders/returnOrders?workspaceId=' +
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
          return {
            ...responseData,
            status: 200,
            message: response.message,
            data: response.data,
            queriedCount: response.returnedOrderCount,
          };
        } else {
          return {
            ...responseData,
            message: response.message,
          };
        }
      } else {
        // console.log(response);
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

const FetchStaticsByDate = async (workspaceId, startDate, endDate) => {
  const token = await getAuthHeader();
  return instance
    .get(
      '/orders/orderStatisticsByDates?workspaceId=' +
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
          return {
            ...responseData,
            status: 200,
            message: response.message,
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
  FetchDaysOrderByDate,
  FetchStaticsByDate,
  FetchCriticalOrdersByDate,
  FetchReturnOrdersByDate,
};
