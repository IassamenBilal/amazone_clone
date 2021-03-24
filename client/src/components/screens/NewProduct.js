import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/products.actions";
import axios from "axios";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { ADD_PRODUCT_RESET } from "../../actions/types";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const { error, loading, success } = useSelector((state) => state.addProduct);

  useEffect(() => {
    dispatch({ type: ADD_PRODUCT_RESET });
  }, [dispatch]);
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
    const newProduct = {
      name,
      brand,
      price,
      category,
      countInStock,
      image,
    };
    dispatch(addProduct(newProduct));
  };
  return (
    <div>
      <form action="" className="form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <h1>New Product</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {success && (
          <MessageBox variant="success">Product added successfully</MessageBox>
        )}
        <div>
          <label htmlFor="name">Image</label>
          <input
            type="file"
            name="pic"
            id="pic"
            required
            placeholder="Enter product picture"
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
        <div>
          <label></label>
          <button type="submit" className="primary">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
