import axios from "axios";
import env from "react-dotenv";
import {
  REQUEST_AUTH_LOGIN,
  SUCCESS_AUTH_LOGIN,
  FAIL_AUTH_LOGIN,
  REQUEST_CHECK_TOKEN,
  SUCCESS_CHECK_TOKEN,
  FAIL_CHECK_TOKEN,
} from "../constants/authConstants";

export const authLogin = (email, password) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_AUTH_LOGIN, payload: null });
  try {
    const { data, token } = await axios.post(
      `${env.API_URL}/users/login`,
      JSON.stringify({
        email: email,
        password: password,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
   
    dispatch({ type: SUCCESS_AUTH_LOGIN, payload: data, token: data.token });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.data.email);
    localStorage.setItem("userId", data.data.ID);
    localStorage.setItem("tokenStatus", 1);
  } catch (e) {

    dispatch({ type: FAIL_AUTH_LOGIN, payload: e, status: e.response.status });
  }
};

export const checkToken = (token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CHECK_TOKEN, payload: null });
  try {
    const { data } = await axios.get(`${env.API_URL}/users/token`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    localStorage.setItem("tokenStatus", data.success);
    dispatch({ type: SUCCESS_CHECK_TOKEN, payload: data.success });
  } catch (e) {
    localStorage.setItem("tokenStatus", 0);
    dispatch({ type: FAIL_CHECK_TOKEN, payload: 0 });
  }
};
