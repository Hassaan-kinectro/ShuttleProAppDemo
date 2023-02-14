import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAuth = data => {
  AsyncStorage.setItem('token', data);
};
export const setTheme = data => {
  AsyncStorage.setItem('Theme', data);
};
export const setPageAccessToken = data => {
  AsyncStorage.setItem('page_access_token', data);
};
export const setAccessToken = data => {
  AsyncStorage.setItem('access_token', data);
};

export const isAuthExist = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem('token')
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
export const getTheme = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem('token')
      .then(res => {
        if (res !== null) {
          resolve(null);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
export const isAccessTokenExist = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem('access_token')
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });

const keys = ['token', 'user', 'access_token', 'fbUserId', 'Theme'];
export const SignOut = () => AsyncStorage.multiRemove(keys);

export const setUser = data => {
  AsyncStorage.setItem('user', data);
};

export const getUser = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem('user')
      .then(res => {
        if (res !== null) {
          resolve(JSON.parse(res));
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
export const getAuthHeader = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem('token')
      .then(res => {
        if (res !== null) {
          const bearerToken = {
            headers: {
              Authorization: 'Bearer ' + res,
              'Content-type': 'application/json',
              Accept: 'application/json',
            },
          };
          resolve(bearerToken);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });

export const getAuthToken = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem('token')
      .then(res => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });

export const getAuthHeaderForFiles = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem('token')
      .then(res => {
        if (res !== null) {
          const bearerToken = {
            headers: {
              Authorization: 'Bearer ' + res,
              'Content-type': 'multipart/form-data',
              Accept: 'application/json',
              maxContentLength: 400000000,
              maxBodyLength: 400000000,
            },
          };
          resolve(bearerToken);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
