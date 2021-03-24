import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_UPDATE_PROFILE_RESET } from "../../actions/types";
import { detailsUser, updateUserProfile } from "../../actions/user.actions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

export default function Profile(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: USER_UPDATE_PROFILE_RESET });

    if (!user) {
      dispatch(detailsUser(userSignin.user._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user, userSignin.user._id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ userId: user._id, name, email, password }));
  };
  return (
    <div>
      <form action="" className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={name}
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
                value={email}
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
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
