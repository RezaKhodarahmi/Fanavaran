import React from "react";
import axios from "axios";
import env from "react-dotenv";
import {
  REQUEST_GET_POSTS_CATEGORY,
SUCCESS_GET_POSTS_CATEGORY,
FAIL_GET_POSTS_CATEGORY
} from "../constants/postsConstants";

export const getCategories = (token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_GET_POSTS_CATEGORY, payload: null });
  try {
    const { data } = await axios.get(`${env.API_URL}/posts/category`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    dispatch({ type: SUCCESS_GET_POSTS_CATEGORY, payload: data.data });
  } catch (e) {
    dispatch({ type: FAIL_GET_POSTS_CATEGORY, payload: e.response.data });
  }
};
