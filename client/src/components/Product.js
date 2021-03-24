import React from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";

export default function Product({ product }) {
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt="product" className="product-image" />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Ratings rating={product.rating} numReviews={product.numReviews} />
        <div className="price">
          <p>${product.price}</p>
        </div>
      </div>
    </div>
  );
}
