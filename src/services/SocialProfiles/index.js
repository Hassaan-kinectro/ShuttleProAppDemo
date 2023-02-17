import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';

const SaveStories = async data => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  console.log(data, 'this is data');
  const token = await getAuthHeader();
  return instance
    .post('/stories/', data, token)
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          console.log(response, 'this is response');
          return {
            ...responseData,
            status: 200,
            data: response.data,
            message: response.message,
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

const SaveScheduleStories = async data => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .post('/stories/schedule', data, token)
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          return {
            ...responseData,
            status: 200,
            data: response.data,
            message: response.message,
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

export {SaveScheduleStories, SaveStories};
