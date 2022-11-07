import React from "react";
import { apiUrl } from "../../../../contexts/constants";

function CartItem({
  cart: {
    quantity,
    product: {
      title,
      price,
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
          {size}
          </span>
        </div>
        <div className="quanlity-product">SL: X{quantity}</div>
      </div>
      <div className="price-product">{formatPrice.format(price)}</div>
    </div>
  );
}

export default CartItem;
