import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../actions/cart.actions";
import { Link } from "react-router-dom";
import MessageBoxCart from "../MessageBoxCart";

export default function Cart(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, dispatch, qty]);

  const removeFromCart = (id) => {
    dispatch(deleteFromCart(id));
  };
  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBoxCart>
            Cart is empty <Link to="/">go Shopping</Link>
          </MessageBoxCart>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name} className="small" />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((item) => (
                        <option key={item + 1} value={item + 1}>
                          {item + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.qty * c.price, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                className="primary block"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
