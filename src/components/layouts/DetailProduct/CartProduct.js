import React, { useState, useContext } from "react";
import { Row, Col, Button, Image, Rate, message } from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  CarOutlined,
  SafetyCertificateOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { apiUrl } from "../../../contexts/constants";
import { MapPin, ShoppingBag, Truck, Shield } from "react-feather";
import { CartContext } from "../../../contexts/CartContext";
function CardProduct({
  item: {
    id,
    title,
    size,
    Price,
    category: { description },
    picture: {
      0: { url },
    },
  },
  formatPrice,
}) {
  const { addProductToCart } = useContext(CartContext);
  const [countNumber, setCountNumber] = useState(1);

  const handleAddProduct = (productId, quanlity) => {
    const addCart = addProductToCart(productId, quanlity);
    if (addCart) {
      message.success("Thêm sản phẩm thành công", 1);
    }
    return addCart;
  };
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: ".4rem" }}>
      <Row>
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <div className="detail-product__left">
            <div className="title-product">{title}</div>
            <div className="sub-title">
              <div className="category-wrap">
                <span className="category">Danh mục:</span>
                <span className="title-category">{description}</span>
              </div>
              <div className="feed-back">
                <div className="feed-back__star">
                  <Rate defaultValue="4" style={{ fontSize: "15px" }} />
                </div>
                <div className="feed-back__title">2 BÀI ĐÁNH GIÁ</div>
              </div>
            </div>
            <Image style={{ width: "100%" }} src={`${apiUrl}${url}`} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={14} xl={14}>
          <Row className="detail-product__right">
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={14}
              xl={14}
              className="info-product"
            >
              <div className="address-product">
                <MapPin size={18} style={{ color: "var(--color-footer)" }} />
                <span style={{ color: "var(--color-gray)" }}>
                  Phường Khuê Trung
                </span>
              </div>
              <div className="price-product">{formatPrice.format(Price)}</div>
              <div className="weight-product">
                <div style={{ fontSize: "14px" }}>Trọng lượng:</div>
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
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda vero temporibus a ducimus animi perspiciatis est
                maiores.
              </div>
              <div className="quanlity-product">
                <Button
                  color="warning"
                  onClick={() => setCountNumber(countNumber - 1)}
                >
                  <MinusOutlined />
                </Button>
                <div className="number-quanlity">{countNumber}</div>
                <Button onClick={() => setCountNumber(countNumber + 1)}>
                  <PlusOutlined />
                </Button>
              </div>
              <div className="detail-product__button">
                <button onClick={() => handleAddProduct(id, 1)}>
                  Mua Ngay
                </button>
                <button onClick={() => handleAddProduct(id, countNumber)}>
                  Thêm Vào Giỏ Hàng
                </button>
                <img
                  className="bg-img card-img-social"
                  src="../../../../icon-social.png"
                  alt=""
                  style={{ marginTop: "1.5rem" }}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={10} xl={10}>
              <div className="intro-card">
                <div className="title-intro">Giao hàng sản phẩm</div>
                <div className="card-delivery">
                  <div className="icon-message">
                    <CarOutlined style={{ fontSize: "18px" }} />
                    <div>
                      Giao hàng miễn phí áp dụng cho tất cả đơn hàng trên
                      200.000 đ
                    </div>
                  </div>
                  <div className="icon-message">
                    <FileDoneOutlined style={{ fontSize: "18px" }} />
                    <div> Sản phẩm đảm bảo chất lượng</div>
                  </div>
                  <div className="icon-message">
                    <SafetyCertificateOutlined style={{ fontSize: "18px" }} />
                    <div> Giao hàng đảm bảo tiêu chuẩn chống dịch</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default CardProduct;
