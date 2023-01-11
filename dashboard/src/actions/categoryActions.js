import axios from "axios";
import env from "react-dotenv";
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

export const getAllCategories = (token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_GET_CATEGORIES, payload: null });
  try {
    const { data } = await axios.get(`${env.API_URL}/category`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    dispatch({ type: SUCCESS_GET_CATEGORIES, payload: data.data });
  } catch (e) {
    dispatch({ type: FAIL_GET_CATEGORIES, payload: e.response.data });
  }
};
export const getCategoryById = (id, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_GET_CATEGORY, payload: null });
  try {
    const { data } = await axios.get(`${env.API_URL}/category/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    dispatch({ type: SUCCESS_GET_CATEGORY, payload: data.data });
  } catch (e) {
    dispatch({ type: FAIL_GET_CATEGORY, payload: e.response.data });
  }
};
export const createCategory = (inputs, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CREATE_CATEGORIES, payload: null });
  try {
    const { data } = await axios.post(`${env.API_URL}/category/create`, inputs, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    dispatch({ type: SUCCESS_CREATE_CATEGORIES, payload: data.data });
  } catch (e) {
    dispatch({ type: FAIL_CREATE_CATEGORIES, payload: e.response.data.message });
  }
};

export const editCategory = (inputs, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_EDIT_CATEGORIES, payload: null });
  try {
    const { data } = await axios.patch(
      `${env.API_URL}/category/update`,
      inputs,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    dispatch({ type: SUCCESS_EDIT_CATEGORIES, payload: data });
  } catch (e) {
    console.log(e.response.data);
    dispatch({ type: FAIL_EDIT_CATEGORIES, payload:  e.response.data.message });
  }
};

export const deleteCategory = (id, token) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_DELETE_CATEGORIES, payload: null });
  try {
    const { data } = await axios.delete(`${env.API_URL}/category/delete`, {
      data: { id: id },
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: SUCCESS_DELETE_CATEGORIES, payload: data });
  } catch (e) {
    dispatch({ type: FAIL_DELETE_CATEGORIES, payload: e.response.data });
  }
};
