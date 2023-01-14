import React from "react";
import axios from "axios";
import env from "react-dotenv";
import {
  REQUEST_GET_POSTS_CATEGORY,
  SUCCESS_GET_POSTS_CATEGORY,
  FAIL_GET_POSTS_CATEGORY,
  REQUEST_CREATE_POSTS_CATEGORY,
  SUCCESS_CREATE_POSTS_CATEGORY,
  FAIL_CREATE_POSTS_CATEGORY,
  REQUEST_UPDATE_POSTS_CATEGORY,
  SUCCESS_UPDATE_POSTS_CATEGORY,
  FAIL_UPDATE_POSTS_CATEGORY,
  REQUEST_DELETE_CATEGORY,
  SUCCESS_DELETE_CATEGORY,
  FAIL_DELETE_CATEGORY,
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
export const createCategory = (inputs, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CREATE_POSTS_CATEGORY, payload: null });
  try {
    const { data } = await axios.post(`${env.API_URL}/posts/create`, inputs, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    dispatch({ type: SUCCESS_CREATE_POSTS_CATEGORY, payload: data.data });
  } catch (e) {
    dispatch({ type: FAIL_CREATE_POSTS_CATEGORY, payload: e.response.data });
  }
};
export const updateCategory = (inputs, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_UPDATE_POSTS_CATEGORY, payload: null });
  try {
    const { data } = await axios.patch(`${env.API_URL}/posts/update`, inputs, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    dispatch({ type: SUCCESS_UPDATE_POSTS_CATEGORY, payload: data.data });
  } catch (e) {
    dispatch({ type: FAIL_UPDATE_POSTS_CATEGORY, payload: e.response.data });
  }
};
export const deleteCategory = (ID, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_DELETE_CATEGORY, payload: null });
  try {
    const { data } = await axios.delete(`${env.API_URL}/posts/delete`, {
      data: { ID: ID },
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: SUCCESS_DELETE_CATEGORY, payload: data });
  } catch (e) {
    dispatch({ type: FAIL_DELETE_CATEGORY, payload: e });
  }
};
