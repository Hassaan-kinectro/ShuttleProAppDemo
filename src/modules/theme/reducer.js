import * as Type from './types';
const themeChangerReducer = (
  state = {
    theme: 'DARK',
  },
  action,
) => {
  switch (action.type) {
    case Type.DARK_THEME:
      state = {
        ...state,
        theme: action.type,
      };
      break;
    case Type.LIGHT_THEME:
      state = {
        ...state,
        theme: action.type,
      };
      break;
    default:
      state = {
        ...state,
      };
      break;
  }
  return state;
};
export default themeChangerReducer;
