import React from "react";
import { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions/orders.actions";
import { listUsers } from "../../actions/user.actions";
import LoadingBox from "../LoadingBox";
import { Avatar } from "@material-ui/core";

export default function Dashboard() {
  const { orders } = useSelector((state) => state.getOrders);
  let isPaid = [];
  let delivered = [];
  let orderLength = 0;
  if (orders) {
    isPaid = orders.filter((order) => order.isPaid);
    delivered = orders.filter((order) => order.isDelivred);
    orderLength = orders.length;
  }
  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <>
      <div>
        <div className="card-green card-body">
          {loading ? (
            <LoadingBox />
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar />
              <h1 style={{ marginLeft: "0.5rem" }}> {users.length} Users</h1>
            </div>
          )}
        </div>
      </div>
      <div className="card card-body">
        <h1>Orders Statistics</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Chart
            width={"400px"}
            height={"300px"}
            chartType="PieChart"
            loader={<LoadingBox />}
            data={[
              ["Orders", "Paid not Paid"],
              ["Paid order", isPaid.length],
              ["Not Paid order", orderLength - isPaid.length],
            ]}
            options={{
              legend: "yes",
              title: "Paid / Not Paid",
              pieStartAngle: 100,
            }}
            rootProps={{ "data-testid": "4" }}
          />
          <Chart
            width={"400px"}
            height={"300px"}
            chartType="PieChart"
            loader={<LoadingBox />}
            data={[
              ["Orders", "Paid not Paid"],
              ["Delivered order", delivered.length],
              ["Not delivered order", orderLength - delivered.length],
            ]}
            options={{
              legend: "yes",
              title: "Delivered/ Not delivered",
              pieStartAngle: 100,
            }}
            rootProps={{ "data-testid": "4" }}
          />
        </div>
      </div>
      <div className="card card-body">
        <h1>Product Statistics</h1>
      </div>
    </>
  );
}
