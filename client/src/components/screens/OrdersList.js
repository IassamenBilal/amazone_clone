import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getOrders } from "../../actions/orders.actions";
import { ORDER_DELIVER_RESET } from "../../actions/types";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

export default function OrdersList(props) {
  const { loading, error, orders } = useSelector((state) => state.getOrders);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.userSignin);
  if (!isAuth) {
    props.history.push("/");
  }

  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = useSelector((state) => state.orderDeliver);

  useEffect(() => {
    if (successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });
    }

    dispatch(getOrders());
  }, [dispatch, successDeliver]);
  const handleDelivered = (orderId) => {
    dispatch(deliverOrder(orderId));
  };
  return (
    <div>
      <h1>Orders List</h1>
      {loading || loadingDeliver ? (
        <LoadingBox />
      ) : error || errorDeliver ? (
        <MessageBox variat="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTIONS</th>
          </thead>
          <tbody>
            {orders
              ? orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPAid ? order.paidAt.substring(0, 10) : "No"}
                    </td>
                    <td>
                      {order.isDelivred
                        ? order.deliveredAt.substring(0, 10)
                        : "No"}
                    </td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        type="button"
                        className="small"
                        onClick={() => {
                          props.history.push("/order/" + order._id);
                        }}
                      >
                        Details
                      </button>
                      {!order.isDelivred && (
                        <button
                          type="button"
                          className="small"
                          onClick={() => handleDelivered(order._id)}
                        >
                          Mark as delivered
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      )}
    </div>
  );
}
