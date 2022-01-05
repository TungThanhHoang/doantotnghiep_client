import React from "react";
import { Row, Col } from "antd";
function MenuFooter() {
  return (
    <div className="menu-footer__wrap">
      <Row className="container" justify="space-around" align="middle">
        <Col xs={12} sm={6} md={6} xl={3} lg={3}>
          <div className="title-menu">Dầu ăn - Gia vị</div>
        </Col>
        <Col xs={12} sm={6} md={6} xl={3} lg={3}>
          <div className="title-menu">Sữa</div>
        </Col>
        <Col xs={12} sm={6} md={6} xl={3} lg={3}>
          <div className="title-menu">Đồ uống giải khát</div>
        </Col>
        <Col xs={12} sm={6} md={6} xl={3} lg={3}>
          <div className="title-menu">Rau củ quả</div>
        </Col>
        <Col xs={12} sm={6} md={6} xl={3} lg={3}>
          <div className="title-menu">Thịt</div>
        </Col>
        <Col xs={12} sm={6} md={6} xl={3} lg={3}>
          <div className="title-menu">Trái cây</div>
        </Col>
        <Col xs={12} sm={6} md={6} xl={3} lg={3}>
          <div className="title-menu">Hải sản</div>
        </Col>
        <Col xs={12} sm={6} md={6} xl={3} lg={3}>
          <div className="title-menu">Thức ăn khô</div>
        </Col>
      </Row>
    </div>
  );
}

export default MenuFooter;
