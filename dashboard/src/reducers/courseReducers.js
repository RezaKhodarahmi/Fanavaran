import {
  REQUEST_GET_COURSES,
  SUCCESS_GET_COURSES,
  FAIL_GET_COURSES,
  REQUEST_EDIT_COURSES,
  SUCCESS_EDIT_COURSES,
  FAIL_EDIT_COURSES,
  REQUEST_CREATE_COURSES,
  SUCCESS_CREATE_COURSES,
  FAIL_CREATE_COURSES,
  REQUEST_DELETE_COURSES,
  SUCCESS_DELETE_COURSES,
  FAIL_DELETE_COURSES,
  REQUEST_GET_COURSE,
  SUCCESS_GET_COURSE,
  FAIL_GET_COURSE,
} from "../constants/coursesConstants";

export const getCoursesReducer = (
  state = { loading: false, data: [], err: [] },
  action
) => {
  switch (action.type) {
    case REQUEST_GET_COURSES:
      return { loading: true, data: null };
    case SUCCESS_GET_COURSES:
      return { loading: false, data: action.payload };
    case FAIL_GET_COURSES:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
export const getCourseByIdReducer = (
  state = { loading: false, data: [], categories: [], err: [] },
  action
) => {
  switch (action.type) {
    case REQUEST_GET_COURSE:
      return { loading: true, data: null };
    case SUCCESS_GET_COURSE:
      return {
        loading: false,
        data: action.payload,
        categories: action.categories,
      };
    case FAIL_GET_COURSE:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
export const createCourseReducer = (
  state = { loading: false, success: null, id: null, err: null },
  action
) => {
  switch (action.type) {
    case REQUEST_CREATE_COURSES:
      return { loading: true, success: false };
    case SUCCESS_CREATE_COURSES:
      return { loading: false, success: true, id: action.payload };
    case FAIL_CREATE_COURSES:
      return { loading: false, err: true };
    default:
      return state;
  }
};
export const editCourseReducer = (
  state = { loading: false, success: false, err: null },
  action
) => {
  switch (action.type) {
    case REQUEST_EDIT_COURSES:
      return { loading: true, success: null };
    case SUCCESS_EDIT_COURSES:
      return { loading: false, success: true };
    case FAIL_EDIT_COURSES:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
export const deleteCourseReducer = (
  state = { loading: false, data: [], err: [] },
  action
) => {
  switch (action.type) {
    case REQUEST_DELETE_COURSES:
      return { loading: true, data: null };
    case SUCCESS_DELETE_COURSES:
      return { loading: false, data: action.payload };
    case FAIL_DELETE_COURSES:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};
