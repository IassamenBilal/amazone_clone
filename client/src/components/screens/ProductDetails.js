import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "../Ratings";
import {
  deleteReview,
  productDetails,
  reviewProduct,
} from "../../actions/products.actions";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../LoadingBox";
import MessageBoxCart from "../MessageBoxCart";

import {
  PRODUCT_REVIEW_DELETE_RESET,
  PRODUCT_REVIEW_RESET,
} from "../../actions/types";

export default function ProductDetails(props) {
  const productId = props.match.params.id;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.getProduct);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const { user } = useSelector((state) => state.userSignin);
  const {
    loading: reviewLoading,
    error: reviewError,
    success: reviewSuccess,
  } = useSelector((state) => state.reviewProduct);

  const { success: deleteReviewSuccess } = useSelector(
    (state) => state.productDeleteReview
  );
  useEffect(() => {
    if (reviewSuccess) {
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_RESET });
    }
    if (deleteReviewSuccess) {
      dispatch({ type: PRODUCT_REVIEW_DELETE_RESET });
    }
    dispatch(productDetails(productId));
  }, [dispatch, reviewSuccess, productId, deleteReviewSuccess, user.name]);
  const product = useSelector((state) => state.getProduct.product);

  const addToCart = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  const handleReview = (id) => {
    const review = {
      rating,
      comment,
    };
    dispatch(reviewProduct(review, id));
  };
  const handleDeleteReview = (productId, reviewId) => {
    window.confirm("Delete review ?") &&
      dispatch(deleteReview(productId, reviewId));
  };

  const hasReviewd = product
    ? product.reviews.find((r) => r.user === user._id)
    : false;
  return !product ? (
    <div>Product does not exist</div>
  ) : (
    <>
      <Link to="/">
        <i className="fa fa-arrow-left"></i> Back to products
      </Link>
      {loading || reviewLoading ? (
        <LoadingBox />
      ) : (
        <>
          <div className="row top">
            <div className="col-2">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Ratings
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>Price : ${product.price}</li>
                <li>
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">$ {product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="error">Unvailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (item) => (
                                  <option key={item + 1} value={item + 1}>
                                    {item + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCart}
                          className="primary block"
                          style={{ marginTop: "10px" }}
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-1">
            <h2>Reviews</h2>
            {product.reviews.length === 0 && (
              <MessageBoxCart variant="info">No reviews</MessageBoxCart>
            )}

            {product.reviews.map((review) => (
              <div className="card card-body" key={review._id}>
                <p>
                  <strong>{review.name}</strong> (
                  {review.createdAt.substring(0, 10)})
                </p>
                <Ratings rating={review.rating} />

                <p>{review.comment}</p>
                <div>
                  {review.user === user._id && (
                    <button
                      className="primary"
                      onClick={() => handleDeleteReview(productId, review._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="col-1">
            {user.name ? (
              !hasReviewd && (
                <div className="card card-body">
                  <h1>Review Product</h1>
                  <ul>
                    <li>
                      <div className="row">
                        <div>
                          <label htmlFor="rating">Rating</label>
                        </div>
                        <div>
                          <select
                            name="rating"
                            required
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select ...</option>
                            <option value="1">1- Poor</option>
                            <option value="2">2- Fair</option>
                            <option value="3">3- Good</option>
                            <option value="4">4- Very good</option>
                            <option value="5">5- Excellent</option>
                          </select>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>
                          <label htmlFor="comment">Comment</label>
                        </div>
                        <div>
                          <textarea
                            name="comment"
                            id=""
                            cols="13"
                            rows="3"
                            value={comment}
                            required
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </li>
                    <li style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        onClick={() => handleReview(productId)}
                        className="primary block"
                        style={{ marginTop: "10px", maxWidth: "50rem" }}
                        disabled={
                          comment === "" || rating === "" || reviewError
                        }
                      >
                        Review
                      </button>
                    </li>
                  </ul>
                </div>
              )
            ) : (
              <MessageBoxCart>
                Please <Link to="/signin">sign in</Link> to write a review
              </MessageBoxCart>
            )}
          </div>
        </>
      )}
    </>
  );
}
