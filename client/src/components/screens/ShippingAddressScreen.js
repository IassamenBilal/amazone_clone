import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAdress } from "../../actions/cart.actions";
import CheckoutSteps from "../CheckoutSteps";

export default function ShippingAddressScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [city, setCity] = useState(shippingAddress.city);
  const [address, setAddress] = useState(shippingAddress.address);
  const [country, setCountry] = useState(shippingAddress.country);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const userSignin = useSelector((state) => state.userSignin);

  const dispatch = useDispatch();

  if (!userSignin.isAuth) {
    props.history.push("/signin");
  }

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAdress({ fullName, address, city, country, postalCode })
    );
    props.history.push("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form action="" className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            required
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Enter your fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            required
            type="text"
            name="address"
            id="address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            required
            type="text"
            name="city"
            id="city"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postalcode">Postal code</label>
          <input
            required
            type="text"
            name="postalcode"
            id="postalcode"
            placeholder="Enter your postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            required
            type="text"
            name="country"
            id="country"
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor=""></label>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
