import instance from '../../config/axios';
import {ParseError} from '../../utils/Parser';
import {setAuth, setUser, setStore} from '../../config/authSettings';

const AuthLogin = (email = '', password = '') => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  return instance
    .post('/auth', {
      email: email.toLowerCase(),
      password: password,
    })
    .then(response => {
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          setAuth(response?.data?.token);
          setUser(JSON.stringify(response?.data?.user));
          if (response?.data?.store) {
            setStore(JSON.stringify(response?.data?.store));
          }
          return {
            ...responseData,
            userId: response?.data?.user?.id,
            status: 200,
            message: 'Login Successfully.',
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
      return {
        ...responseData,
        message: ParseError(
          err.response && err.response.data ? err.response.data : err.message,
        ),
      };
    });
};

export {AuthLogin};
