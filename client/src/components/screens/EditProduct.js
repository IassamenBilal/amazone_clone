import React, { useEffect, useState } from "react";
import { getProduct, updateProduct } from "../../actions/products.actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Link } from "react-router-dom";
import { PRODUCT_UPDATE_RESET } from "../../actions/types";

export default function EditProduct(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const { product } = useSelector((state) => state.getProduct);
  const { success: updateSuccess } = useSelector(
    (state) => state.updateProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      props.history.push("/admin/products");
    } else {
      if (!product) {
        dispatch(getProduct(productId));
      } else {
        setName(product.name);
        setBrand(product.brand);
        setCountInStock(product.countInStock);
        setPrice(product.price);
        setCategory(product.category);
        setImage(product.image);
      }
    }
  }, [dispatch, product, updateSuccess, productId, props.history]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    try {
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      brand,
      price,
      category,
      countInStock,
      image,
    };
    dispatch(updateProduct(updatedProduct, productId));
  };
  return (
    <div>
      <h1>
        <Link to="/admin/products">Go back</Link>
      </h1>
      <form action="" className="form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <h1>Edit Product</h1>
        </div>
        <>
          <div>
            <label htmlFor="name">Image</label>
            <input
              type="file"
              name="pic"
              id="pic"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <div>
            <label htmlFor="name">Product name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category">Product category</label>
            <input
              type="text"
              name="category"
              id="category"
              required
              placeholder="Enter product category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="brand">Product brand</label>
            <input
              type="text"
              name="brand"
              id="brand"
              required
              placeholder="Enter product brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="brand">Product price</label>
            <input
              type="number"
              name="price"
              id="price"
              min="0"
              required
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="brand">Product count in stock</label>
            <input
              type="number"
              name="count"
              id="count"
              min="0"
              required
              placeholder="Enter product count in stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </div>
        </>

        <div>
          <label></label>
          <button type="submit" className="primary">
            Edit Product
          </button>
        </div>
      </form>
    </div>
  );
}
