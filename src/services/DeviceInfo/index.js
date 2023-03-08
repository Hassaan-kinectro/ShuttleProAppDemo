import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';
import {getAuthHeader} from '../../config/authSettings';
import {isObject} from 'lodash';

const AddDeviceInfo = async data => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const token = await getAuthHeader();
  return instance
    .post('/devices', data, token)
    .then(async response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          response = response.data;
          return {
            data: response,
            status: 200,
            message: 'Device information saved successfully!',
          };
        } else {
          return {
            ...responseData,
            data: response,
            status: 400,
            message: 'Could not saved device infromation!',
          };
        }
      } else {
        return {
          ...responseData,
          message: ParseError(response),
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

const UpdateDeviceInfo = async (formdata, id) => {
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
    .put(`/devices/${id}`, data, token)
    .then(async response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          return {
            status: 200,
            message: 'Device information has been updated successfully!',
          };
        } else {
          return {
            ...responseData,
            data: response,
            status: 400,
            message: 'Device information not updated!',
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

const GetDeviceInfoByDeviceId = async device => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };

  const token = await getAuthHeader();

  return instance
    .get(`/devices/device/${device}`, token)
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          const result = isObject(response.data)
            ? response.data
            : JSON.parse(response.data);
          return {
            ...responseData,
            data: isObject(result) ? result : {},
            status: 200,
            message: 'Device information found!',
          };
        } else {
          return {
            ...responseData,
            message: 'Device information not found!',
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

export {AddDeviceInfo, UpdateDeviceInfo, GetDeviceInfoByDeviceId};
