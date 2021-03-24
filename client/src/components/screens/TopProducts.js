import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopProducts } from "../../actions/products.actions";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { Link } from "react-router-dom";

export default function TopProducts() {
  const { products, loading, error } = useSelector(
    (state) => state.topProducts
  );
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    dispatch(getTopProducts());
  }, []);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Carousel>
      {products.map((product) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to={`/product/${product._id}`}>
            <div className="carousel-img">
              <img
                src={product.image}
                alt={product.name}
                style={{ maxHeight: "20rem", maxWidth: "20rem" }}
              />
            </div>

            <h1 className="legend">
              {product.name} ${product.price}
            </h1>
          </Link>
        </div>
      ))}
    </Carousel>
  );
}
