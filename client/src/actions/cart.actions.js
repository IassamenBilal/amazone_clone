import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  CART_SAVE_SHIPPING_ADRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "./types";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios("/api/products/" + productId);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const deleteFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_DELETE_ITEM, payload: id });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAdress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADRESS, payload: data });
  localStorage.setItem("shipAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
