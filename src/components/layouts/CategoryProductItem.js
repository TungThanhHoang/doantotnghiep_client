import React, { useContext } from "react";
import { Col, message } from "antd";
import { ShoppingCart, MapPin } from "react-feather";
import { CartContext } from "../../contexts/CartContext";
import { ProductContext } from "../../contexts/ProductContext";
import { AuthContext } from "../../contexts/AuthContext";
import { apiUrl } from "../../contexts/constants";
import { Link } from "react-router-dom";
function CategoryProductItem({
  product: {
    id,
    title,
    Price,
    size,
    picture: {
      0: { url },
    },
  },
}) {
  const {
    authState: {
      user: { ward },
    },
  } = useContext(AuthContext);
  const { formatPrice } = useContext(ProductContext);
  const { addProductToCart } = useContext(CartContext);

  const handleAddProduct = (productId) => {
    const addCart = addProductToCart(productId);
    if (addCart) {
      message.success("Thêm sản phẩm thành công", 1);
    }
    return addCart;
  };
  return (
    <Col xs={12} sm={8} lg={6} xl={6} className="card-product">
      <div className="card-product__wrap ">
        <Link to={{ pathname: `/product/${id}` }}>
          <img src={url} alt="" className="bg-img" />
          <div className="padding-content">
            <div className="title-product">{title}</div>
            <div className="ward-product">
              <MapPin size={14} style={{ color: "orange" }} />{" "}
              <span>{ward}</span>
            </div>
            <div className="quality-product">
              <div
                className="price-product"
                style={{ color: "var(--color-background)" }}
              >
                {formatPrice.format(Price)}
              </div>
              <div className="size-product">
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
          </div>
        </Link>
        <button className="" onClick={(e) => handleAddProduct(id)}>
          <span>Thêm vào giỏ</span>
          <ShoppingCart size={18} style={{ marginLeft: "8px" }} />
        </button>
      </div>
    </Col>
  );
}

export default CategoryProductItem;
