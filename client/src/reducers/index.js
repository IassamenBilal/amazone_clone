import { combineReducers } from "redux";
import cartReducer from "./cart.reducer";
import {
  orderDetailsReducer,
  orderMineListReducer,
  orderPayReducer,
  orderReducer,
  getOrdersReducer,
  orderDeliverReducer,
} from "./order.reducer";
import {
  ProductListReducer,
  deleteProductReducer,
  AddProductReducer,
  updateProductReducer,
  getProductReducer,
  keywordsProductReducer,
  reviewProductReducer,
  productDeleteReviewReducer,
  topProductsReducer,
} from "./product.reducer";
import {
  deleteUserReducer,
  updateUserProfileReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
} from "./user.reducer";

export default combineReducers({
  productList: ProductListReducer,
  getProduct: getProductReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: updateUserProfileReducer,
  userList: userListReducer,
  userDelete: deleteUserReducer,
  deleteProduct: deleteProductReducer,
  addProduct: AddProductReducer,
  updateProduct: updateProductReducer,
  keywordsProduct: keywordsProductReducer,
  reviewProduct: reviewProductReducer,
  getOrders: getOrdersReducer,
  productDeleteReview: productDeleteReviewReducer,
  orderDeliver: orderDeliverReducer,
  topProducts: topProductsReducer,
});
