import React from "react";
import {
  REQUEST_GET_POSTS_TAG,
  SUCCESS_GET_POSTS_TAG,
  FAIL_GET_POSTS_TAG,
} from "../constants/postsConstants";

export const postsTagsReducer = (
  state = { loading: false, tags: null, err: null },
  action
) => {
  switch (action.type) {
    case REQUEST_GET_POSTS_TAG:
      return { loading: true, tags: null };
    case SUCCESS_GET_POSTS_TAG:
      return { loading: false, tags: action.payload };
    case FAIL_GET_POSTS_TAG:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
