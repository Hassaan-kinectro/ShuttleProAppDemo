import themeChange from './theme/reducer';
import {WorkspaceReducer} from './workspace';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {UserReducer} from './user';

const appReducer = combineReducers({
  themeChange,
  workspace: WorkspaceReducer,
  user: UserReducer,
});
const middlewares = [thunk];
export default createStore(appReducer, {}, applyMiddleware(...middlewares));
