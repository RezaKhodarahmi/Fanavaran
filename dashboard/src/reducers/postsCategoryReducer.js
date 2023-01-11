import React from "react";
import {
  REQUEST_GET_POSTS_CATEGORY,
SUCCESS_GET_POSTS_CATEGORY,
FAIL_GET_POSTS_CATEGORY
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
