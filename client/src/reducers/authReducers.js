import {
  SUCCESS_AUTH_LOGIN,
  FAIL_AUTH_LOGIN,
  REQUEST_AUTH_LOGIN,
  REQUEST_AUTH_REGISTER,
  SUCCESS_AUTH_REGISTER,
  FAIL_AUTH_REGISTER,
  REQUEST_VERIFY_EMAIL,
  SUCCESS_VERIFY_EMAIL,
  FAIL_VERIFY_EMAIL
} from "../constants/authConstants";
//Login 
export const loginReducer = (state = {loading:false, user: [] }, action) => {
  switch (action.type) {
    case REQUEST_AUTH_LOGIN:
      return { loading: true };
    case SUCCESS_AUTH_LOGIN:
      return { loading: false, user: action.payload };
    case FAIL_AUTH_LOGIN:
      return { loading: false, err: action.payload, status: action.status };
    default:
      return state;
  }
};
//Register
export const registerReducer = (state = {loading: false, registeredUser: [] }, action) => {
  switch (action.type) {
    case REQUEST_AUTH_REGISTER:
      return { loading: true };
    case SUCCESS_AUTH_REGISTER:
      return { loading: false, registeredUser: action.payload };
    case FAIL_AUTH_REGISTER:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
// Verify code sent to email
export const verifyEmailReducer = (state = {loading:false,status:null} , action) => {
  switch (action.type) {
    case REQUEST_VERIFY_EMAIL:
      return { loading: true };
    case SUCCESS_VERIFY_EMAIL:
      return { loading: false, status: action.payload };
    case FAIL_VERIFY_EMAIL:
      return { loading: false, status: action.payload };
    default:
      return state;
  }
};
