import * as Types from './types';

export const ChangeTheme = type => ({
  type: type,
  payload: '',
});

export const UpdateTheme = type => {
  return dispatch => {
    dispatch(ChangeTheme(type));
  };
};
