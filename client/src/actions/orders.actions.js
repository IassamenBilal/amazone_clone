import axios from "axios";
import {
  CART_EMPTY,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_SUCCESS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_REQUEST,
  GET_ORDERS_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
} from "./types";

export const getOrders = () => async (dispatch, getState) => {
  dispatch({ type: GET_ORDERS_REQUEST });
  try {
    const { data } = await axios.get("/api/orders", {
      headers: {
        Authorization: `Bearer ${getState().userSignin.user.token}`,
      },
    });
    dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload: error.message,
    });
  }
};

export const createdOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${getState().userSignin.user.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cart");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  console.log("in act");
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  try {
    const { data } = await axios.get("/api/orders/" + orderId, {
      headers: {
        Authorization: `Bearer ${getState().userSignin.user.token}`,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
  try {
    const { data } = await axios.put(
      `/api/orders/${order._id}/pay`,
      paymentResult,
      {
        headers: {
          Authorization: "Bearer " + getState().userSignin.user.token,
        },
      }
    );
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/orders/mine", {
      headers: {
        Authorization: "Bearer " + getState().userSignin.user.token,
      },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_MINE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST });
  try {
    const { data } = await axios.put(
      "/api/orders/deliver",
      { orderId },
      {
        headers: {
          Authorization: "Bearer " + getState().userSignin.user.token,
        },
      }
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
