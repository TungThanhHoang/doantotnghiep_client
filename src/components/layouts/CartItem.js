import React from "react";
import Promotion from "../../utils/Promotion";
function CartItem({
  itemcart: {
    id,
    quantity,
    product: {
      title,
      price,
      promotion,
      picture: {
        0: {
          url
        }
      }
    },
  },
  formatPrice,
}) {

  return (
    <>
      <div className="cart-item flex justify-start">
        <img
          src={url}
          alt=""
          style={{ width: "70px", height: "70px" }}
        />
        <div className="ml-4  grow">
          <div className="text-md font-medium capitalize">{title}</div>
          <div className="flex justify-between">
            <span>x{quantity}</span>
            <span className="cart-price">{formatPrice.format( promotion ? Promotion(promotion) * price : price )}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
