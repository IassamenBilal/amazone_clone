import {
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_RESET,
  ADD_PRODUCT_RESET,
  KEYWORD_UPDATE,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_RESET,
  PRODUCT_REVIEW_DELETE_REQUEST,
  PRODUCT_REVIEW_DELETE_SUCCESS,
  PRODUCT_REVIEW_DELETE_FAIL,
  PRODUCT_REVIEW_DELETE_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../actions/types";

const initialState = {
  products: [],

  loading: true,
  error: "",
  success: false,
};
export const ProductListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        success: true,
      };
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return { ...state };
  }
};

export const getProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return {};
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AddProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { loading: true };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ADD_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADD_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const keywordsProductReducer = (state = {}, action) => {
  switch (action.type) {
    case KEYWORD_UPDATE:
      return {
        keywords: action.payload,
      };
    default:
      return state;
  }
};

export const reviewProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case PRODUCT_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case PRODUCT_REVIEW_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productDeleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_REVIEW_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_REVIEW_DELETE_FAIL:
      return {
        loading: false,
        success: false,
      };
    case PRODUCT_REVIEW_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const topProductsReducer = (
  state = { products: {}, loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_TOP_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_TOP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
