import React from "react";
import { apiUrl } from "../../../../contexts/constants";

function CartItem({
  cart: {
    quanlity,
    products: {
      title,
      Price,
      size,
      picture: {
        0: { url },
      },
    },
  },
  formatPrice,
}) {
  return (
    <div className="product-item">
      <img src={url} alt="" />
      <div className="info-product">
        <div className="title-product">{title}</div>
        <div className="weight-product">
          Phân loại:{" "}
          <span>
            {" "}
            {size === "onebox"
              ? "Hộp"
              : size === "onebotlle"
              ? "Chai"
              : size === "fivegram"
              ? "500g"
              : size === "onegram"
              ? "100g"
              : size === "onekilogram"
              ? "1kg"
              : "1 túi"}
          </span>
        </div>
        <div className="quanlity-product">SL: X{quanlity}</div>
      </div>
      <div className="price-product">{formatPrice.format(Price)}</div>
    </div>
  );
}

export default CartItem;
