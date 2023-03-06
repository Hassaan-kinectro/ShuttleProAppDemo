import {getAuthHeaderWithoutContentType} from '../../config/authSettings';
import instance from '../../config/axios';
import {ParseError, responseData} from '../../utils/Parser';

const GetShippers = async workspaceId => {
  const token = await getAuthHeaderWithoutContentType();
  return instance
    .get(`/shipper?workspaceId=${workspaceId}`, token)
    .then(response => {
      console.log('response sevice', response);
      if (response.status === 200 || response.status === 201) {
        response = response.data;
        console.log(response.data, 'shipperResp222');

        if (response.code === 200) {
          return {
            ...responseData,
            status: 200,
            data: response.data.map(e => {
              return {
                ...e,
                label: e?.name,
              };
            }),
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
      console.log('catch', err);
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};

export {GetShippers};
