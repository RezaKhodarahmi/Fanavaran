import {
  REQUEST_GET_CATEGORIES,
  SUCCESS_GET_CATEGORIES,
  FAIL_GET_CATEGORIES,
  REQUEST_GET_CATEGORY,
  SUCCESS_GET_CATEGORY,
  FAIL_GET_CATEGORY,
  REQUEST_EDIT_CATEGORIES,
  SUCCESS_EDIT_CATEGORIES,
  FAIL_EDIT_CATEGORIES,
  REQUEST_CREATE_CATEGORIES,
  SUCCESS_CREATE_CATEGORIES,
  FAIL_CREATE_CATEGORIES,
  REQUEST_DELETE_CATEGORIES,
  SUCCESS_DELETE_CATEGORIES,
  FAIL_DELETE_CATEGORIES,
} from "../constants/categoryConstants";

export const getCategoriesReducer = (
  state = { loading: false, allCategories: [], err: [] },
  action
) => {
  switch (action.type) {
    case REQUEST_GET_CATEGORIES:
      return { loading: true, allCategories: null };
    case SUCCESS_GET_CATEGORIES:
      return { loading: false, allCategories: action.payload };
    case FAIL_GET_CATEGORIES:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
export const getCategoryByIdReducer = (
  state = { loading: false, data: [], err: [] },
  action
) => {
  switch (action.type) {
    case REQUEST_GET_CATEGORY:
      return { loading: true, data: null };
    case SUCCESS_GET_CATEGORY:
      return { loading: false, data: action.payload };
    case FAIL_GET_CATEGORY:
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
    case REQUEST_CREATE_CATEGORIES:
      return { loading: true, success: false };
    case SUCCESS_CREATE_CATEGORIES:
      return { loading: false, success: true, id: action.payload };
    case FAIL_CREATE_CATEGORIES:
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
    case REQUEST_EDIT_CATEGORIES:
      return { loading: true, success: null };
    case SUCCESS_EDIT_CATEGORIES:
      return { loading: false, success: true };
    case FAIL_EDIT_CATEGORIES:
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
    case REQUEST_DELETE_CATEGORIES:
      return { loading: true, data: null };
    case SUCCESS_DELETE_CATEGORIES:
      return { loading: false, data: action.payload };
    case FAIL_DELETE_CATEGORIES:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
