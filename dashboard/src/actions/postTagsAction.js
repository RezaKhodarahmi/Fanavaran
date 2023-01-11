import React from "react";
import axios from "axios";
import env from "react-dotenv";
import {
  REQUEST_GET_POSTS_TAG,
  SUCCESS_GET_POSTS_TAG,
  FAIL_GET_POSTS_TAG,
} from "../constants/postsConstants";

export const getTags = (token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_GET_POSTS_TAG, payload: null });
  try {
    const { data } = await axios.get(`${env.API_URL}/posts/tags`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
 
    dispatch({ type: SUCCESS_GET_POSTS_TAG, payload: data.data });
  } catch (e) {
    dispatch({ type: FAIL_GET_POSTS_TAG, payload: e.response.data });
  }
};
