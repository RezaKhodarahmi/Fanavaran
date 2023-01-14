import React from "react";
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

export const postsCategoryReducer = (
  state = { loading: false, categories: null, err: null },
  action
) => {
  switch (action.type) {
    case REQUEST_GET_POSTS_CATEGORY:
      return { loading: true, categories: null };
    case SUCCESS_GET_POSTS_CATEGORY:
      return { loading: false, categories: action.payload };
    case FAIL_GET_POSTS_CATEGORY:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
export const createCategoryReducer = (
  state = { loading: false, success: null, id: null, err: null },
  action
) => {
  switch (action.type) {
    case REQUEST_CREATE_POSTS_CATEGORY:
      return { loading: true, success: false };
    case SUCCESS_CREATE_POSTS_CATEGORY:
      return { loading: false, success: true, id: action.payload };
    case FAIL_CREATE_POSTS_CATEGORY:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
export const editCategoryReducer = (
  state = { loading: false, success: false, err: null },
  action
) => {
  switch (action.type) {
    case REQUEST_UPDATE_POSTS_CATEGORY:
      return { loading: true, success: null };
    case SUCCESS_UPDATE_POSTS_CATEGORY:
      return { loading: false, success: true };
    case FAIL_UPDATE_POSTS_CATEGORY:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
export const deleteCategoryReducer = (
  state = { loading: false, data: [], err: [] },
  action
) => {
  switch (action.type) {
    case REQUEST_DELETE_CATEGORY:
      return { loading: true, data: null };
    case SUCCESS_DELETE_CATEGORY:
      return { loading: false, data: action.payload };
    case FAIL_DELETE_CATEGORY:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
