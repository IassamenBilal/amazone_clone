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
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../actions/types";

const initialState = {
  loading: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  error: "",
  isAuth: localStorage.getItem("user") ? true : false,
};

export const userSigninReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {
        loading: true,
      };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuth: true,
        error: "",
      };
    case USER_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuth: false,
      };
    case USER_SIGNOUT:
      return {
        ...state,
        user: {},
        isAuth: false,
      };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return {
        loading: true,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuth: true,
        error: "",
      };
    case USER_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuth: false,
      };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateUserProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        success: false,
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true };
    case DELETE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
      };
    case DELETE_USER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
