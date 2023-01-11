import React from "react";
import axios from "axios";
import env from "react-dotenv";
import {
  REQUEST_GET_POSTS,
  SUCCESS_GET_POSTS,
  FAIL_GET_POSTS,
  REQUEST_CREATE_POSTS,
  SUCCESS_CREATE_POSTS,
  FAIL_CREATE_POSTS,
  REQUEST_UPDATE_POSTS,
  SUCCESS_UPDATE_POSTS,
  FAIL_UPDATE_POSTS,
  REQUEST_DELETE_POSTS,
  SUCCESS_DELETE_POSTS,
  FAIL_DELETE_POSTS,
  REQUEST_GET_POST,
  SUCCESS_GET_POST,
  FAIL_GET_POST,
} from "../constants/postsConstants";

export const getPosts = (token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_GET_POSTS, payload: null });
  try {
    const { data } = await axios.get(`${env.API_URL}/posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    dispatch({ type: SUCCESS_GET_POSTS, payload: data.data });
  } catch (e) {
    dispatch({ type: FAIL_GET_POSTS, payload: e.response.data });
  }
};
export const getSinglePostAction =
  (id, token) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_GET_POST, payload: null });
    try {
      const { data } = await axios.get(`${env.API_URL}/posts/single/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      dispatch({ type: SUCCESS_GET_POST, payload: data.data });
    } catch (e) {
      console.log(e)

      dispatch({ type: FAIL_GET_POST, payload: e.response.data });
    }
  };
export const createPostAction =
  (inputs, token) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_CREATE_POSTS, payload: null });
    try {
      const { data } = await axios.post(`${env.API_URL}/posts/create`, inputs, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log(data.data.insertId);
      dispatch({ type: SUCCESS_CREATE_POSTS, payload: data.data });
    } catch (e) {
      dispatch({ type: FAIL_CREATE_POSTS, payload: e.response.data });
    }
  };

export const updatePost = (inputs, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_UPDATE_POSTS, payload: null });
  try {
    const { data } = await axios.patch(`${env.API_URL}/posts/update`, inputs, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    dispatch({ type: SUCCESS_UPDATE_POSTS, payload: data.data });
  } catch (e) {
    dispatch({ type: FAIL_UPDATE_POSTS, payload: e.response.data });
  }
};

export const deletePost = (id, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_DELETE_POSTS, payload: null });
  try {
    const { data } = await axios.delete(`${env.API_URL}/posts/delete`, {
      data: { id: id },
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: SUCCESS_DELETE_POSTS, payload: data });
  } catch (e) {
    dispatch({ type: FAIL_DELETE_POSTS, payload: e.response.data });
  }
};
