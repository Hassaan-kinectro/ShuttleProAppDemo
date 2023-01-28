import * as Type from './types';
import {isObject} from 'lodash';
const UserReducer = (
  state = {
    user: null,
  },
  action,
) => {
  switch (action.type) {
    case Type.SET_USER:
      state = {
        ...state,
        user: action.payload,
      };
      break;
    default:
      state = {
        user: !isObject(state.user) ? ParseValue(state.user) : state.user,
      };
      break;
  }
  return state;
};

const ParseValue = user => {
  let val = null;
  try {
    val = JSON.parse(user);
  } catch (e) {
    val = null;
  }
  return val;
};

export default UserReducer;
