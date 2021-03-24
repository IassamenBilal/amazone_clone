import React, { useEffect } from "react";
import Product from "../Product";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../../actions/products.actions";
import TopProducts from "./TopProducts";
import SideBarMenu from "../SideBarMenu";
export default function Home() {
  const productsList = useSelector((state) => state.productList);
  const { keywords } = useSelector((state) => state.keywordsProduct);
  const { products, loading, error } = productsList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(keywords));
  }, [keywords, dispatch]);
  if (products.length === 0) {
    return <div>No product found</div>;
  }
  return (
    <div>
      <SideBarMenu />
      {!keywords && <TopProducts />}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
}
