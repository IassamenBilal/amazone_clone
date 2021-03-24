import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function AdminRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  return (
    <Route
      {...rest}
      render={(props) =>
        userSignin.isAuth && userSignin.user.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
}
