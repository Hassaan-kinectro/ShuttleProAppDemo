import {getAuthHeaderWithoutContentType} from '../../config/authSettings';
import instance from '../../config/axios';
import {ParseError, responseData} from '../../utils/Parser';

const FetchCities = async () => {
  const token = await getAuthHeaderWithoutContentType();

  return instance
    .get('/cities', token)
    .then(response => {
      if (response.status === 200) {
        console.log(response, 'cities response frontend');
        // response = response.data;
        if (response.status === 200) {
          return {
            ...responseData,
            status: 200,
            message: response.message,
            data: response.data && response.data.code ? response.data.data : [],
            // data: response.data && response.data.code ? [] : response.data.data,
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

export {FetchCities};
