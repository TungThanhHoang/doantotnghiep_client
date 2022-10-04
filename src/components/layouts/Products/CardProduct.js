import React, { useContext } from "react";
import { Col, message } from "antd";
import { ShoppingCart, MapPin } from "react-feather";
import { CartContext } from "../../../contexts/CartContext";
import { ProductContext } from "../../../contexts/ProductContext";
import { Link } from "react-router-dom";
function CardProduct({
  product: {
    id,
    attributes: {
      title,
      price,
      slug,
      size,
      picture: {
        data: {
          0: {
            attributes: {
             url
            }
          }
        }
      },
    }
  },
}) {

  const { formatPrice } = useContext(ProductContext);
  const { addProductToCart } = useContext(CartContext);

  const handleAddProduct = (productId, quanlity) => {
    const addCart = addProductToCart(productId, quanlity);
    if (addCart) {
      message.success("Thêm sản phẩm thành công", 1);
    }
    return addCart;
  };

  return (
    <Col className="card-product col-five ">
      <div className="card-product__wrap ">
        <Link to={{ pathname: `product/${id}` }}>
          <img src={url} alt="" className="bg-img" />
          <div className="padding-content">
            <div className="title-product">{title}</div>
            <div className="ward-product">
              <MapPin size={14} style={{ color: "orange" }} />
              <span></span>
            </div>
            <div className="quality-product">
              <div className="price-product">{formatPrice.format(price)}</div>
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
        <button className="" onClick={() => handleAddProduct(id, 1)}>
          <span style={{ marginRight: "8px" }} className="title-add-cart">
            Thêm vào giỏ
          </span>
          <ShoppingCart size={18} />
        </button>
      </div>
    </Col>
  );
}

export default CardProduct;
