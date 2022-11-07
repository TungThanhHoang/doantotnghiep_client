import React from "react";
import CardProduct from "./CardProduct";
import { Row } from "antd";
import "./ProductHome.css";

function ProductHome({ product, formatPrice, title }) {

  return (
    <div className="main-product mb-8">
      <div className="card-new__title">{title}</div>
      <Row className="box-product">
        {product?.map((item) => {
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
