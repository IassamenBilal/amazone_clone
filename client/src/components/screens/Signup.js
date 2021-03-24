import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register, signin } from "../../actions/user.actions";
import MessageBox from "../MessageBox";

export default function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  useEffect(() => {
    if (userRegister.isAuth) {
      props.history.push(redirect);
    }
  }, [userRegister, dispatch]);
  return (
    <div>
      <form action="" className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign Up</h1>
        </div>
        {userRegister.loading && (
          <>
            {" "}
            <i className="fa fa-spinner fa-spin" style={{ color: "black" }}></i>
            Loading...
          </>
        )}
        {userRegister.error && (
          <MessageBox variant="danger">{userRegister.error}</MessageBox>
        )}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            Sign Up
          </button>
        </div>
        <div>
          <label htmlFor=""></label>
          <div>
            Already have an account ?
            <Link to={"/signin?redirect=" + redirect}> Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
