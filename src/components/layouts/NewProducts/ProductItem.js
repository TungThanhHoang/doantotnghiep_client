import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MapPin, ShoppingCart } from "react-feather";
import { Button, message } from "antd";
import { CartContext } from "../../../contexts/CartContext";

function ProductItem({
  product: {
    id,
    title,
    Price,
    slug,
    size,
    picture: {
      0: { url },
    },
    wards,
  },
  formatPrice,
}) {
  const { addProductToCart } = useContext(CartContext);

  const handleAddProduct = (productId, quanlity) => {
    const addCart = addProductToCart(productId, quanlity);
    if (addCart) {
      message.success("Thêm sản phẩm thành công", 1);
    }
    return addCart;
  };
  const newWard = [];
  const getWard = localStorage.getItem("ward");
  wards.map((item) => {
    if (item.name === getWard) newWard.push(item.name);
    return newWard;
  });
  return (
    <div className="card-product__item">
      <Link
        to={{
          pathname: `/product/${id}`,
          state: { newWard },
        }}
      >
        <img
          className="bg-img img-product"
          src={`http://localhost:1337` + url}
          alt=""
          style={{
            width: "100%",
            height: "170px",
            borderRadius: "10px",
          }}
        />
        <div className="title-product">{title}</div>
        <div className="address-product">
          <MapPin size={14} style={{ color: "orange" }} />
          <span>{newWard}</span>
        </div>
        <div className="main-product">
          <div className="price-product">{formatPrice.format(Price)}</div>
          <div className="weight-product">
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
          </div>
        </div>
      </Link>
      <Button className="add-cart" onClick={() => handleAddProduct(id, 1)}>
        <span>Thêm vào giỏ</span>
        <ShoppingCart size={18} />
      </Button>

      {/* {isloading && (
        <Button
          loading
          className="add-cart"
          onClick={() => {
            handleAddProduct(id);
          }}
        >
          <span>Thêm vào giỏ</span>
          <ShoppingCart size={18} />
        </Button>
      )} */}
    </div>
  );
}

export default ProductItem;
