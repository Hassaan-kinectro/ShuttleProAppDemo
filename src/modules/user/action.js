import * as Types from './types';

export const SetUser = data => ({
  type: Types.SET_USER,
  payload: data,
});
