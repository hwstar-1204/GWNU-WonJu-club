import { LOGIN_SUCCESS, LOGOUT } from '../actionTypes';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export function logout() {
  return async dispatch => {
    // perform async operations
    dispatch({ type: 'LOGOUT' });
  };
}