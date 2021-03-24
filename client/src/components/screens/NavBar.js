import React, { useState, useEffect } from "react";
import SideBarMenu from "../SideBarMenu";
import { useDispatch, useSelector } from "react-redux";
import { SearchRounded } from "@material-ui/icons";
import { KEYWORD_UPDATE } from "../../actions/types";
import { signout } from "../../actions/user.actions";
import { Link, withRouter } from "react-router-dom";

const NavBar = withRouter(({ history }) => {
  const [keywords, setKeywords] = useState("");
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userInfo = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  useEffect(() => {
    dispatch({ type: KEYWORD_UPDATE, payload: keywords });
  }, [keywords, dispatch]);

  const isActiveMenuUser = (history, path) => {
    if (
      history.location.pathname === "/orderhistory" ||
      history.location.pathname === "/profile"
    )
      return { color: "#ffa806" };
    else return { color: "#ffffff" };
  };
  const isActiveMenuAdmin = (history, path) => {
    if (
      history.location.pathname === "/admin/dashboard" ||
      history.location.pathname === "/admin/users" ||
      history.location.pathname === "/admin/orders" ||
      history.location.pathname === "/admin/products"
    )
      return { color: "#ffa806" };
    else return { color: "#ffffff" };
  };

  const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ffa806" };
    else return { color: "#ffffff" };
  };

  return (
    <header className="row">
      <SideBarMenu />

      <div style={{ marginLeft: "5rem" }}>
        <Link to="/" className="brand" style={isActive(history, "/")}>
          amazon
        </Link>
      </div>

      <div className="header-search">
        <input
          type="text"
          name="keyword"
          className="header-search-input"
          placeholder="Search products ..."
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <SearchRounded className="search-icon" />
      </div>
      <div>
        <Link to="/cart" style={isActive(history, "/cart")}>
          Cart
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
        </Link>
        {userInfo.isAuth ? (
          <div className="dropdown">
            <Link to="#" style={isActiveMenuUser(history, "")}>
              {userInfo.user.name} <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/profile" style={isActive(history, "/profile")}>
                  User profile
                </Link>
              </li>

              <li>
                <Link
                  to="/orderhistory"
                  style={isActive(history, "/orderhistory")}
                >
                  Orders history
                </Link>
              </li>
              <li>
                <Link
                  to="#signout"
                  onClick={signoutHandler}
                  style={{ color: "#ffffff" }}
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signin" style={isActive(history, "/signin")}>
            Sign In
          </Link>
        )}
        {userInfo.isAuth && userInfo.user.isAdmin && (
          <div className="dropdown">
            <Link to="#admin" style={isActiveMenuAdmin(history, "")}>
              Admin <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link
                  to="/admin/dashboard"
                  style={isActive(history, "/admin/dashboard")}
                >
                  Dashbord
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products"
                  style={isActive(history, "/admin/products")}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  style={isActive(history, "/admin/users")}
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  style={isActive(history, "/admin/orders")}
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
});

export default NavBar;
