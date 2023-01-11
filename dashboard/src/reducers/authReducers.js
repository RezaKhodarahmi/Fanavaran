import {
  REQUEST_AUTH_LOGIN,
  SUCCESS_AUTH_LOGIN,
  FAIL_AUTH_LOGIN,
  REQUEST_CHECK_TOKEN,
  SUCCESS_CHECK_TOKEN,
  FAIL_CHECK_TOKEN
} from "../constants/authConstants";

export const loginReducer = (
  state = { loading: false, user: [],status:null,success:false,err:false, token: null },
  action
) => {
  switch (action.type) {
    case REQUEST_AUTH_LOGIN:
      return { loading: true };
    case SUCCESS_AUTH_LOGIN:
      return { loading: false, user: action.payload,status:200,success:true, token: action.token };
    case FAIL_AUTH_LOGIN:
      return { loading: false,status:action.status,user:null,err:true };
    default:
      return state;
  }
};

export const tokenCheckReducer = (
  state = { loading: false, status:0 },
  action
) => {
  switch (action.type) {
    case REQUEST_CHECK_TOKEN:
      return { loading: true };
    case SUCCESS_CHECK_TOKEN:
      return { loading: false, status: action.payload };
    case FAIL_AUTH_LOGIN:
      return { loading: false,status:action.payload };
    default:
      return state;
  }
};
