import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_REVIEW_DELETE_SUCCESS,
  PRODUCT_REVIEW_DELETE_REQUEST,
  PRODUCT_REVIEW_DELETE_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "./types";
import axios from "axios";
export const listProducts = (keywords) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });
  try {
    const { data } = await axios.post("/api/products", { keywords });
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, payload: error.message });
  }
};

export const productDetails = (id) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });
  try {
    const { data } = await axios.get("/api/products/" + id);
    console.log("data" + data);
    dispatch({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST, payload: productId });
  try {
    const { data } = await axios.delete("/api/products/delete/" + productId, {
      headers: {
        Authorization: `Bearer ${getState().userSignin.user.token}`,
      },
    });
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message });
  }
};

export const addProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: ADD_PRODUCT_REQUEST });
  try {
    const { data } = await axios.post(
      "/api/products/new",
      {
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        countInStock: product.countInStock,
        image: product.image,
      },
      {
        headers: {
          ContentType: "application/json",
          Authorization: `Bearer ${getState().userSignin.user.token}`,
        },
      }
    );
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message });
  }
};

export const getProduct = (id) => async (dispatch, getState) => {
  dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });
  try {
    const { data } = await axios.get("/api/product/details/" + id, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${getState().userSignin.user.token}`,
      },
    });

    dispatch({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

export const updateProduct = (product, id) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST });
  try {
    dispatch({ type: PRODUCT_UPDATE_SUCCESS });

    await axios.put(
      "/api/products/update/" + id,
      {
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        countInStock: product.countInStock,
        image: product.image,
      },
      {
        headers: {
          ContentType: "application/json",
          Authorization: `Bearer ${getState().userSignin.user.token}`,
        },
      }
    );
  } catch (error) {
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: error.message });
  }
};

export const reviewProduct = (review, id) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_REVIEW_REQUEST });
  try {
    const { data } = await axios.put(
      "/api/products/review/" + id,
      {
        rating: review.rating,
        comment: review.comment,
      },
      {
        headers: {
          ContentType: "application/json",
          Authorization: `Bearer ${getState().userSignin.user.token}`,
        },
      }
    );
    dispatch({ type: PRODUCT_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_REVIEW_FAIL, payload: error.message });
  }
};

export const deleteReview = (productId, reviewId) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PRODUCT_REVIEW_DELETE_REQUEST });

  try {
    const { data } = await axios.put(
      "/api/products/review/delete",
      { productId, reviewId },
      {
        headers: {
          Authorization: `Bearer ${getState().userSignin.user.token}`,
        },
      }
    );
    dispatch({ type: PRODUCT_REVIEW_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_REVIEW_DELETE_FAIL, payload: error.message });
  }
};

export const getTopProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_TOP_REQUEST });
  try {
    const { data } = await axios.get("/api/products/top");
    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_TOP_FAIL, payload: error.message });
  }
};
