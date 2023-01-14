import axios from "axios";
import env from "react-dotenv";
import currentDate from "../components/tools/currentDate";
import {
  REQUEST_GET_USERS,
  SUCCESS_GET_USERS,
  FAIL_GET_USERS,
  REQUEST_GET_USER_ID,
  SUCCESS_GET_USER_ID,
  FAIL_GET_USER_ID,
  REQUEST_GET_USER_META,
  SUCCESS_GET_USER_META,
  FAIL_GET_USER_META,
  REQUEST_CREATE_USER_META,
  SUCCESS_CREATE_USER_META,
  FAIL_CREATE_USER_META,
  REQUEST_UPDATE_USER,
  SUCCESS_UPDATE_USER,
  FAIL_UPDATE_USER,
  REQUEST_UPDATE_USER_AVATAR,
  SUCCESS_UPDATE_USER_AVATAR,
  FAIL_UPDATE_USER_AVATAR,
  REQUEST_UPDATE_USER_META,
  SUCCESS_UPDATE_USER_META,
  FAIL_UPDATE_USER_META,
  REQUEST_DELETE_USER,
  SUCCESS_DELETE_USER,
  FAIL_DELETE_USER,
  REQUEST_CREATE_USER,
  SUCCESS_CREATE_USER,
  FAIL_CREATE_USER,
  REQUEST_GET_INSTRUCTORS,
SUCCESS_GET_INSTRUCTORS,
FAIL_GET_INSTRUCTORS
} from "../constants/userConstants";

export const createNewUser = (input, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CREATE_USER, data: null });

  try {
    const { data } = await axios.post(
      `${env.API_URL}/users/create`,
      {
        user_login: input.userName,
        email: input.email,
        email_verification: input.e_verification,
        user_status: input.userStatus,
        role: input.role,
        display_name: input.displayName,
        password: input.pwd,
        user_nicename: input.userNicename,
        user_url: input.userUrl,
        created_at: currentDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    dispatch({ type: SUCCESS_CREATE_USER, data: data });
  } catch (e) {
    dispatch({
      type: FAIL_CREATE_USER,
      status: e.response.status,
      message: e.response.data.message,
    });
  }
};
export const getUsers = (token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_GET_USERS, payload: null });
  try {
    const { data } = await axios.get(`${env.API_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    dispatch({ type: SUCCESS_GET_USERS, payload: data.data });
  } catch (e) {
    dispatch({ type: FAIL_GET_USERS, payload: e });
  }
};
export const getInstractors = (token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_GET_INSTRUCTORS, payload: null });
  try {
    const { data } = await axios.get(`${env.API_URL}/users/instructors`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    dispatch({ type: SUCCESS_GET_INSTRUCTORS, payload: data.data });
  } catch (e) {
    dispatch({ type: FAIL_GET_INSTRUCTORS, payload: e });
  }
};
export const getUserById = (id, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_GET_USER_ID, payload: null });

  try {
    const { data } = await axios.get(`${env.API_URL}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    dispatch({ type: SUCCESS_GET_USER_ID, payload: data.data });
  } catch (e) {
    dispatch({ type: FAIL_GET_USER_ID, payload: e });
  }
};
export const updateUser = (state, id, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_UPDATE_USER, payload: null });

  try {
    const { data } = await axios.patch(
      `${env.API_URL}/users/update`,
      {
        ID: id,
        user_login: state.userName,
        email: state.email,
        email_verification: state.e_verification,
        user_nicename: state.userNicename,
        display_name: state.displayName,
        user_status: state.userStatus,
        role: state.role,
        user_url: state.userUrl,
        password: state.pwd,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    dispatch({ type: SUCCESS_UPDATE_USER, payload: data });
  } catch (e) {
    dispatch({ type: FAIL_UPDATE_USER, payload: e });
  }
};
export const updateUserAvatar =
  (id, url, token) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_UPDATE_USER_AVATAR, payload: null });
    try {
      const { data } = await axios.patch(
        `${env.API_URL}/users/update/profile`,
        {
          ID: id,
          image: url,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      dispatch({ type: SUCCESS_UPDATE_USER_AVATAR, payload: data });
    } catch (e) {
      dispatch({ type: FAIL_UPDATE_USER_AVATAR, payload: e });
    }
  };
export const deleteUser = (ID, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_DELETE_USER, payload: null });
  try {
    const { data } = await axios.delete(`${env.API_URL}/users/delete`, {
      data: { ID: ID },
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: SUCCESS_DELETE_USER, payload: data });
  } catch (e) {
    dispatch({ type: FAIL_DELETE_USER, payload: e });
  }
};
export const createUserMeta =
  (usermeta, id, token) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_CREATE_USER_META, payload: null });

    try {
      const { data } = await axios.post(
        `${env.API_URL}/users/create-meta/${id}`,

        usermeta,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      dispatch({ type: SUCCESS_CREATE_USER_META, payload: data });
    } catch (e) {
      dispatch({ type: FAIL_CREATE_USER_META, payload: e });
    }
  };

export const getUserMeta = (id, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_GET_USER_META, payload: null });

  try {
    const { data } = await axios.get(`${env.API_URL}/users/user-meta/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    dispatch({ type: SUCCESS_GET_USER_META, payload: data.data });
  } catch (e) {
    dispatch({ type: FAIL_GET_USER_META, payload: e });
  }
};

export const updateUserMeta =
  (usermeta, id, token) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_UPDATE_USER_META, payload: null });

    try {
      const { data } = await axios.patch(
        `${env.API_URL}/users/update-meta/${id}`,
        usermeta,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      dispatch({ type: SUCCESS_UPDATE_USER_META, payload: data.data });
    } catch (e) {
      dispatch({ type: FAIL_UPDATE_USER_META, payload: e });
    }
  };
