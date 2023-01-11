import React from "react";
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

export const postsReducer = (
  state = { loading: false, data: null, err: null },
  action
) => {
  switch (action.type) {
    case REQUEST_GET_POSTS:
      return { loading: true, data: null };
    case SUCCESS_GET_POSTS:
      return { loading: false, data: action.payload };
    case FAIL_GET_POSTS:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
export const SinglePostReducer = (
  state = { loading: false, data: null, err: null },
  action
) => {
  switch (action.type) {
    case REQUEST_GET_POST:
      return { loading: true, data: null };
    case SUCCESS_GET_POST:
      return { loading: false, data: action.payload };
    case FAIL_GET_POST:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
export const cretePostReducer = (
  state = { loading: false, success: false, err: false },
  action
) => {
  switch (action.type) {
    case REQUEST_CREATE_POSTS:
      return { loading: true };
    case SUCCESS_CREATE_POSTS:
      return { loading: false, success: true };
    case FAIL_CREATE_POSTS:
      return { loading: false, err: action.payload, success: false };
    default:
      return state;
  }
};
export const updatePostReducer = (
  state = { loading: false, success: false, err: false },
  action
) => {
  switch (action.type) {
    case REQUEST_UPDATE_POSTS:
      return { loading: true };
    case SUCCESS_UPDATE_POSTS:
      return { loading: false, success: true };
    case FAIL_UPDATE_POSTS:
      return { loading: false, err: true, success: false };
    default:
      return state;
  }
};
