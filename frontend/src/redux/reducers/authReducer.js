import { LOGIN_SUCCESS, LOGOUT } from '../actionTypes';

const initialState = {
  user: null,
  isLoggedIn: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export default authReducer;