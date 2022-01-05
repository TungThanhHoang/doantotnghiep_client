import React from "react";
import { Row, Col, Carousel } from "antd";
// import { ArrowLeft, ArrowRight } from "react-feather";
import "./Poster.css";
export default function Poster() {
  const imgPoster = [
    { img: "../../../slider-6.png", title: "Sản phẩm tươi mới mỗi ngày" },
    {
      img: "../../../slider-5.png",
      title: "Hàng hóa sản phẩm đảm bảo chất lượng",
    },
    {
      img: "../../../slider-4.jpg",
      title: "Đón tết bình an, tràn ngập sức khỏe",
    },
  ];
  return (
    <div className="poster-main">
      <Row>
        <Col md={16} sm={24} xs={24}>
          <div className="poster-main__left">
            <Carousel
              autoplay
              autoplaySpeed={4000}
              speed={1000}
              pauseOnHover="true"
              dotPosition="bottom"
            >
              {imgPoster?.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      className="carousel-item bg-img"
                      style={{
                        backgroundImage: `url(${item.img})`,
                        width: "100%",
                        height: "390px",
                      }}
                    >
                      <div className="title-banner">{item.title}</div>
                      <button className="btn-buy">Mua Ngay</button>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </Col>
        <Col md={8} xs={12}>
          <div className="poster-main__right">
            <Col>
              <div
                className="poster-main__right--item bg-img"
                style={{
                  backgroundImage: "url(../../../banner-right-1.png)",
                  width: "100%",
                  height: "190px",
                }}
              ></div>
            </Col>
            <Col>
              <div
                className="poster-main__right--item bg-img"
                style={{
                  backgroundImage: "url(../../../banner-delivery.jpg)",
                  width: "100%",
                  height: "190px",
                }}
              ></div>
            </Col>
          </div>
        </Col>
      </Row>
    </div>
  );
}
