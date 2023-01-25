import instance from '../../config/axios';
import {ExtractHeader, ParseError} from '../../utils/Parser';
import {setAuth, setUser, setStore} from '../../config/authSettings';
import FormData from 'form-data';

const AuthLogin = (email = '', password = '') => {
  console.log('yayayyyy');
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
      console.log('response', response);
      if (response.status === 200) {
        console.log(response.status);
        response = response.data;
        if (response.code === 200) {
          console.log(response.code);
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

const AuthRegister = (data, create = true) => {
  const responseData = {
    loading: false,
    status: 210,
    message: 'Something went wrong, Please try again.',
  };
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('password_confirmation', data.password_confirmation);
  formData.append('name', data.name);
  formData.append('profile_picture', {
    uri: data.file.path, // your file path string
    name: data.file.filename
      ? data.file.filename
      : Math.random().toString(36).slice(2) + getExtension(data.file.mime),
    type: data.file.mime,
  });
  console.log(formData);
  return instance
    .post('/auth/register', formData)
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        response = response.data;
        if (response.code === 200) {
          console.log(response);
          setAuth(response?.data?.token);
          setUser(JSON.stringify(response?.data?.user));
          if (response?.data?.store) {
            setStore(JSON.stringify(response?.data?.store));
          }
          return {
            ...responseData,
            userId: response?.data?.user?.id,
            status: 200,
            message: 'Signup Successfully.',
          };
        }
        console.log(response);
        return {
          ...responseData,
          message: response.message,
        };
      } else {
        console.log(response);
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
export {AuthLogin, AuthRegister};
