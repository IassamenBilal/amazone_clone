import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createdOrder } from "../../actions/orders.actions";
import { ORDER_CREATE_RESET } from "../../actions/types";
import CheckoutSteps from "../CheckoutSteps";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

export default function PlaceOrder(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.shippingPrice = toPrice(
    cart.itemsPrice > 100 ? toPrice(0) : toPrice(20)
  );
  cart.totalPrice = cart.shippingPrice + cart.taxPrice + cart.itemsPrice;

  const dispatch = useDispatch();

  const { loading, success, error, order } = useSelector(
    (state) => state.order
  );
  const placeOrderHandler = () => {
    dispatch(createdOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order.order._id);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, dispatch, props.history]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>
                  {cart.shippingAddress.fullName}
                  <strong> Address: </strong>
                  {cart.shippingAddress.address},{cart.shippingAddress.city},
                  {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong>
                  {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item, index) => (
                    <li key={index}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${cart.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cart.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong> ${cart.totalPrice}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  className="primary block"
                  block
                  style={{ marginTop: "10px" }}
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  PlaceOrder
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
