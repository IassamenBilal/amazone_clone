import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../../actions/user.actions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

export default function Signin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userInfo = useSelector((state) => state.userSignin);
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo.isAuth) {
      props.history.push(redirect);
    }
  }, [userInfo, dispatch, redirect, props.history]);
  return (
    <div>
      <form action="" className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {userInfo.loading && <LoadingBox />}
        {userInfo.error && (
          <MessageBox variant="danger">{userInfo.error}</MessageBox>
        )}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label htmlFor=""></label>
          <div>
            New customer ?<Link to="/register"> Create new account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
