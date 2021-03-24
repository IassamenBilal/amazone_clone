import axios from "axios";
import {
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "./types";

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const body = { email, password };
    const { data } = await axios.post("/api/users/signin", body);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST, payload: { name, email, password } });
  try {
    const body = { name, email, password };
    const { data } = await axios.post("/api/users/register", body);
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
  localStorage.removeItem("shipAddress");
  dispatch({ type: USER_SIGNOUT });
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  try {
    const { data } = await axios("/api/users/" + userId, {
      headers: {
        Authorization: `Bearer ${getState().userSignin.user.token}`,
      },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.message });
  }
};

export const updateUserProfile = ({ userId, name, email, password }) => async (
  dispatch,
  getState
) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
  try {
    const { data } = await axios.put(
      "/api/users/update",
      { userId, name, email, password },
      {
        headers: {
          Authorization: `Bearer ${getState().userSignin.user.token}`,
        },
      }
    );
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("user", JSON.stringify(data));
    console.log("updated");
  } catch (error) {
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: error.message });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/users", {
      headers: {
        Authorization: `Bearer ${getState().userSignin.user.token}`,
      },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: error.message });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: DELETE_USER_REQUEST });
  try {
    const { data } = await axios.delete("/api/users/" + userId, {
      headers: {
        Authorization: `Bearer ${getState().userSignin.user.token}`,
      },
    });
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
