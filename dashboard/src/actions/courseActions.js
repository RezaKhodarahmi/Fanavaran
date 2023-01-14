import axios from "axios";
import env from "react-dotenv";
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

export const getCourses = (token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_GET_COURSES, payload: null });
  try {
    const { data } = await axios.get(`${env.API_URL}/courses`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    dispatch({ type: SUCCESS_GET_COURSES, payload: data.data });
  } catch (e) {
    dispatch({ type: FAIL_GET_COURSES, payload: e.response.data });
  }
};
export const getCourseById = (id, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_GET_COURSE, payload: null });
  try {
    const { data } = await axios.get(`${env.API_URL}/courses/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    dispatch({ type: SUCCESS_GET_COURSE, payload: data.data, categories:data.categories });
  } catch (e) {
    dispatch({ type: FAIL_GET_COURSE, payload: e.response.data });
  }
};
export const createCourse = (inputs, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CREATE_COURSES, payload: null });
  try {
    const { data } = await axios.post(`${env.API_URL}/courses/create`, inputs, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    dispatch({ type: SUCCESS_CREATE_COURSES, payload: data.data.insertId });
  } catch (e) {
    dispatch({ type: FAIL_CREATE_COURSES, payload: e.response.data });
  }
};

export const editCourse = (inputs, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_EDIT_COURSES, payload: null });
  try {
    const { data } = await axios.patch(
      `${env.API_URL}/courses/update`,
      inputs,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    dispatch({ type: SUCCESS_EDIT_COURSES, payload: data });
  } catch (e) {
    console.log(e.response.data);
    dispatch({ type: FAIL_EDIT_COURSES, payload: e.response.data });
  }
};

export const deleteCourse = (id, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_DELETE_COURSES, payload: null });
  try {
    const { data } = await axios.delete(`${env.API_URL}/courses/delete`, {
      data: { id: id },
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: SUCCESS_DELETE_COURSES, payload: data });
  } catch (e) {
    dispatch({ type: FAIL_DELETE_COURSES, payload: e.response.data });
  }
};
