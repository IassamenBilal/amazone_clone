import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  CART_EMPTY,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADRESS,
} from "../actions/types";

const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  shippingAddress: localStorage.getItem("shipAddress")
    ? JSON.parse(localStorage.getItem("shipAddress"))
    : {},
  paymentMethod: "Paypal",
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (itemInCart) => itemInCart.product == item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((itemInCart) =>
            itemInCart.product == existItem.product ? item : itemInCart
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_DELETE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_EMPTY:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export default cartReducer;
