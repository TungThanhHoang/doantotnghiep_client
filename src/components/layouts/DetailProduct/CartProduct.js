import React, { useState, useContext } from "react";
import { Row, Col, Button, Image, Rate, message } from "antd";
import {
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Slider from "react-slick";
import { CartContext } from "../../../contexts/CartContext";
import Promotion from '../../../utils/Promotion'
import { Link } from "react-router-dom";
function CardProduct({
  item: {
    id,
    attributes: {
      title,
      size,
      price,
      content,
      promotion,
      category: { data: { attributes: { title: titleCategory } } },
      picture: {
        data: listImage
      },
      picture
    }
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

  const settings = {
    customPaging: function (i) {
      return (
        <Link className="">
          <img src={listImage[i]?.attributes?.url} alt="" />
        </Link>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  return (
    <div style={{ backgroundColor: "#fff", borderRadius: ".4rem" }}>
      <Row>
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <div className="detail-product__left mt-4">
            {promotion && (
              <div className="absolute z-50 left-3">
                <span className="px-3 py-1.5 rounded-sm text-sm font-medium bg-yellow-400 text-slate-600">Sale!</span>
                <div className="mt-4"></div>
                <span className="px-3 py-1.5 rounded-sm text-sm font-medium bg-yellow-400 text-slate-700">{promotion?.split(" ")[1]}</span>
              </div>
            )}
            <div className="">
              <Slider {...settings}>
                {listImage?.map(item => {
                  return (
                    <div className="w-80 h-80 object-cover mx-auto">
                      <img src={item?.attributes?.url} alt="" className="w-80 h-80 mx-auto" />
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={14} xl={14}>
          <Row className="detail-product__right mt-28 lg:mt-0">
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              className="info-product"
            >
              <div className="font-bold text-2xl">{title}</div>
              <div className="sub-title">
                <div className="category-wrap my-2">
                  <span className="text-slate-600">Danh mục:</span>
                  <span className="font-medium text-base ml-2">{titleCategory}</span>
                </div>
                <div className="flex items-center mb-4">
                  <Rate defaultValue="4" style={{ fontSize: "15px" }} />
                  <span className="feed-back__title">2 BÀI ĐÁNH GIÁ</span>
                </div>
              </div>
              <div className="flex justify-start mr-4 grow">
                <div className="mr-2 text-gray-500 line-through text-lg">{promotion && formatPrice.format(price)}</div>
                <div className="text-slate-700 font-medium text-lg">{formatPrice.format(promotion ? Promotion(promotion) * price : price)}</div>
              </div>
              <div className="mt-3">
                {content}
              </div>
              <div className="weight-product">
                <div className="text-md">Trọng lượng:</div>
                <div className="ml-2 font-medium text-slate-800">
                  {size}
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="flex">
                  <div className="flex">
                    <button
                      color="warning"
                      onClick={() => setCountNumber(countNumber - 1)}
                      className="w-12 h-12 border font-bold hover:bg-slate-50 rounded-l-md inline-grid items-center"
                    >
                      <MinusOutlined />
                    </button>
                    <div className="w-16 h-12 flex items-center justify-center font-bold border">{countNumber}</div>
                    <button className="border w-12 h-12 font-bold hover:bg-slate-50 rounded-r-md inline-grid items-center" onClick={() => setCountNumber(countNumber + 1)}>
                      <PlusOutlined />
                    </button>
                  </div>
                  <button className="ml-6 grow bg-yellow-400 hover:bg-yellow-500 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-0 sm:px-5 py-3 justify-center inline-flex items-center  mr-2 mb-2" onClick={() => handleAddProduct(id, countNumber)}>
                    Thêm Vào Giỏ Hàng
                  </button>
                </div>
                <div className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex justify-center  mr-2 mb-2">
                  <button onClick={() => handleAddProduct(id, 1)}>
                    Mua Ngay
                  </button>
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
