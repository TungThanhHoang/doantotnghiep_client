import React from "react";
import { Row, Col } from "antd";
function BannerFooter() {
  return (
    <div className="banner-footer__wrap bg-slate-100">
      <div className="container">
        <Row className="banner-footer__column">
          <Col sm={24} lg={12} xl={12} className="mt-10">
            <span className="text-4xl font-medium text-slate-900">Dễ dàng mua sắm với ứng dụng trên nền tảng điện thoại</span>
            <p className="my-6 text-lg">
              Market giúp việc mua sắm nhu yếu phẩm trở nên nhanh chóng và dễ dàng, hổ trợ giao hàng trong ngày.
            </p>
            <div className="flex items-center space-x-4">
              <img src="../../../../app-store.webp" alt=""  className="h-12 rounded-md"/>
              <img src="../../../../play-store.webp" alt="" className="h-12 rounded-md" />
            </div>
          </Col>
          <Col xs={24} sm={24} lg={12} xl={12}>
            <img
              src="../../../../app-thumbnail.webp"
              alt=""
              className="bg-img"
              style={{ height: "100%", width: "100%" ,objectFit:"cover" }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BannerFooter;
