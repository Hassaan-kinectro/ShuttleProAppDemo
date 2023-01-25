import themeChange from './theme/reducer';
import {WorkspaceReducer} from './workspace';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// import logger from "redux-logger";
// import promise from "redux-promise-middleware";
const appReducer = combineReducers({
  /* your app’s top-level reducers */
  // authChange,
  themeChange,
  workspace: WorkspaceReducer,
  // balanceReducer,
  // userInfoReducer,
  // userDetail: userDetail
});
const middlewares = [thunk];
export default createStore(appReducer, {}, applyMiddleware(...middlewares));
