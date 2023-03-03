import * as Type from './types';
import {isObject} from 'lodash';
const UserReducer = (
  state = {
    user: null,
    userId: '',
  },
  action,
) => {
  switch (action.type) {
    case Type.SET_USER:
      state = {
        ...state,
        user: action.payload,
        userId: (action.payload && action.payload.id) || '',
      };
      break;
    default:
      state = {
        user: !isObject(state.user) ? ParseValue(state.user) : state.user,
        userId: state.userId,
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
