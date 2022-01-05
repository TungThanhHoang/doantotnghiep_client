import React from "react";
import { Row, Col } from "antd";
import {
  CarOutlined,
  DollarCircleOutlined,
  SafetyOutlined,
  ShopOutlined,
} from "@ant-design/icons";
function InfoUs() {
  return (
    <div className="info-wrap">
      <Row className="container card-info__us">
        <Col xs={24} md={6} lg={6}>
          <div className="title-card">
            <ShopOutlined  className="icon-intro"/> Sản phẩm tươi hàng ngày
          </div>
        </Col>
        <Col xs={24} md={6} lg={6}>
          <div className="title-card">
            <CarOutlined  className="icon-intro"/> Miễn phí giao hàng
          </div>
        </Col>
        <Col xs={24} md={6} lg={6}>
          <div className="title-card">
            <DollarCircleOutlined  className="icon-intro"/>
            Giá cả cạnh tranh
          </div>
        </Col>
        <Col xs={24} md={6} lg={6}>
          <div className="title-card">
            <SafetyOutlined  className="icon-intro"/>
            Giao hàng an toàn trong mùa dịch
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default InfoUs;
