import * as Type from './types';
import {isObject} from 'lodash';

const WorkspaceReducer = (
  state = {
    workspace: null,
    workspaceId: '',
  },
  action,
) => {
  switch (action.type) {
    case Type.SET_WORKSPACE:
      state = {
        ...state,
        workspace: action.payload,
        workspaceId:
          (action.payload &&
            action.payload.workspace &&
            action.payload.workspace.id) ||
          '',
      };
      break;
    default:
      state = {
        workspace: !isObject(state.workspace)
          ? ParseValue(state.workspace)
          : state.workspace,
        workspaceId: state.workspaceId,
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
export default WorkspaceReducer;
