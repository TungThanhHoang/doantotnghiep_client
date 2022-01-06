import React from "react";
function CartItem({
  itemcart: {
    id:itemId,
    products: {
      title,
      Price,
      picture: {
        0: { url },
      },
    },
  },
  formatPrice,
}) {
  return (
    <>
      <div className="cart-item">
        <img
          src={url}
          alt=""
          style={{ width: "50px", height: "50px" }}
        />
        <div className="cart-title">{title}</div>
        <div className="cart-price">{formatPrice.format(Price)}</div>
      </div>
    </>
  );
}

export default CartItem;
