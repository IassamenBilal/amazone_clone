import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  return (
    <Route
      {...rest}
      render={(props) =>
        userSignin.isAuth ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}
