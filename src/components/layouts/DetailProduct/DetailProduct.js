import { Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../../contexts/ProductContext";
import CardProduct from "./CartProduct";
import "./DetailProduct.css";
function DetailProduct() {
  const { id } = useParams();
  const {
    productState: { product },
    isloading,
    loadOneProduct,
    formatPrice,
  } = useContext(ProductContext);

  useEffect(() => {
    loadOneProduct(id);
  }, []);

  return (
    <div>
      {isloading ? (
        <div className="spin-load">
      <Spin />
        </div>
      ) : (
        <div>
          {product?.map((item , index) => {
            return <CardProduct key={index} item={item} formatPrice={formatPrice} />;
          })}
        </div>
      )}
    </div>
  );
}

export default DetailProduct;
