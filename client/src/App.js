import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/screens/Home";
import ProductDetails from "./components/screens/ProductDetails";
import Cart from "./components/screens/Cart";
import Signin from "./components/screens/Signin";
import Signup from "./components/screens/Signup";
import ShippingAddressScreen from "./components/screens/ShippingAddressScreen";
import PaymentMethod from "./components/screens/PaymentMethod";
import PlaceOrder from "./components/screens/PlaceOrder";
import Order from "./components/screens/Order";
import OrderHistory from "./components/screens/OrderHistory";
import Profile from "./components/screens/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/screens/AdminRoute";
import ListUsers from "./components/screens/ListUsers";
import ProductList from "./components/screens/ProductList";
import NewProduct from "./components/screens/NewProduct";
import EditProduct from "./components/screens/EditProduct";
import React from "react";
import Dashboard from "./components/screens/Dashboard";
import OrdersList from "./components/screens/OrdersList";
import NavBar from "./components/screens/NavBar";
import HelmetMetaData from "./components/HelmetMetaData";
function App() {
  return (
    <Router>
      <div className="App">
        <HelmetMetaData></HelmetMetaData>
        <div className="grid-container">
          <NavBar />
          <main>
            <Route path="/" exact component={Home} />
            <Route path="/product/:id" exact component={ProductDetails} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/register" exact component={Signup} />
            <Route path="/shipping" exact component={ShippingAddressScreen} />
            <Route path="/payment" exact component={PaymentMethod} />
            <Route path="/placeorder" exact component={PlaceOrder} />
            <Route path="/orderhistory" exact component={OrderHistory} />
            <PrivateRoute path="/profile" exact component={Profile} />
            <AdminRoute path="/admin/users" exact component={ListUsers} />
            <AdminRoute path="/admin/dashboard" exact component={Dashboard} />
            <AdminRoute path="/admin/products" exact component={ProductList} />
            <AdminRoute path="/admin/orders" exact component={OrdersList} />
            <AdminRoute
              path="/admin/products/newproduct"
              exact
              component={NewProduct}
            />
            <AdminRoute
              path="/products/:id/edit"
              exact
              component={EditProduct}
            />

            <Route path="/order/:id" exact component={Order} />

            <Route path="/cart/:id?" exact component={Cart} />
          </main>
          <footer className="row center">All rights reserved</footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
