import React, { useContext, useEffect } from "react";
import slug from "slug";
import CardProduct from "./CardProduct";
import { Row } from "antd";
import "./ProductHome.css";
import { ProductContext } from "../../../contexts/ProductContext";
import { AuthContext } from "../../../contexts/AuthContext";
function ProductHome() {
  const {
    productState: { products },
    loadProduct,
    formatPrice,
  } = useContext(ProductContext);
  const {
    authState: {
      user: { ward },
    },
  } = useContext(AuthContext);
  useEffect(() => {
    setTimeout(() => {
      const getToken = localStorage.getItem("ward");
      const tokenProduct = slug(ward ? ward : "");
      loadProduct(tokenProduct);
    });
  }, []);
  return (
    <div className="main-product">
      <div className="card-new__title">Các loại sản phẩm</div>
      <Row className="box-product">
        {products?.map((item) => {
          return (
            <CardProduct
              key={item.id}
              product={item}
              formatPrice={formatPrice}
            />
          );
        })}
      </Row>
    </div>
  );
}

export default ProductHome;
