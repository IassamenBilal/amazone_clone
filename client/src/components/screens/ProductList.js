import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/products.actions";
import { deleteProduct } from "../../actions/products.actions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

export default function ProductList(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const {
    success: successDelete,
    error: errorDelete,
    loading: deleteLoading,
  } = useSelector((state) => state.deleteProduct);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);

  const handleDelete = (id) => {
    window.confirm("Delete product ?") && dispatch(deleteProduct(id));
  };

  const handleUpdate = (id) => {
    props.history.push(`/products/${id}/edit`);
  };
  const handleDetails = (id) => {
    props.history.push(`/product/${id}`);
  };
  return (
    <div>
      <h1>Products</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variat="danger">{error}</MessageBox>
      ) : (
        <>
          <button
            type="button"
            className="primary"
            onClick={() => {
              props.history.push("/admin/products/newproduct");
            }}
          >
            Add product
          </button>
          <br />
          <br />
          {deleteLoading && <LoadingBox />}
          {successDelete && (
            <MessageBox variant="success">Deleted successfully</MessageBox>
          )}
          {errorDelete && (
            <MessageBox variant="danger">Error deleting product</MessageBox>
          )}
          <table className="table">
            <thead>
              <th>PICTURE</th>
              <th>NAME</th>
              <th>BRAND</th>
              <th>PRICE</th>
              <th>COUNT IN STOCK</th>

              <th>ACTIONS</th>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="small"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.price}</td>
                  <td>{product.countInStock}</td>

                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        handleDetails(product._id);
                      }}
                    >
                      Details
                    </button>

                    <button
                      type="button"
                      className="small"
                      onClick={() => handleUpdate(product._id)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
