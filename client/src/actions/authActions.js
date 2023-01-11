import axios from "axios";
import {
  REQUEST_AUTH_LOGIN,
  SUCCESS_AUTH_LOGIN,
  FAIL_AUTH_LOGIN,
  SUCCESS_AUTH_REGISTER,
  FAIL_AUTH_REGISTER,
  REQUEST_AUTH_REGISTER,
  REQUEST_VERIFY_EMAIL,
  SUCCESS_VERIFY_EMAIL,
  FAIL_VERIFY_EMAIL,
} from "../constants/authConstants";

export const authLogin = (email, password) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_AUTH_LOGIN, payload: null });
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/users/login",
      JSON.stringify({
        email: email,
        password: password,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: SUCCESS_AUTH_LOGIN, payload: data });
    localStorage.setItem(
      "token",
      JSON.stringify(getState().loggedInUser?.user?.token)
    );
  } catch (err) {
    dispatch({
      type: FAIL_AUTH_LOGIN,
      payload: err.message,
      status: err.response.status,
    });
  }
};

export const authRegister =
  (username, email, password) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_AUTH_REGISTER, payload: null });

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/create",
        JSON.stringify({
          user_login: username,
          email: email,
          password: password,
          display_name: username,
          email_verification: null,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch({ type: SUCCESS_AUTH_REGISTER, payload: data });
    } catch (err) {
      dispatch({
        type: FAIL_AUTH_REGISTER,
        payload: err.response.data.errno,
        status: err.response.status,
      });
    }
  };

export const verifyEmail = (email, code) => async (dispatch, getState) => {
  try {
    dispatch({ type: REQUEST_VERIFY_EMAIL, payload: null });
    const { success } = await axios.post(
      "http://localhost:5000/api/users/verify",
      JSON.stringify({
        email: email,
        email_verification: code,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch({ type: SUCCESS_VERIFY_EMAIL, payload: success });
  } catch (err) {
    dispatch({ type: FAIL_VERIFY_EMAIL, payload: err.message });
  }
};
