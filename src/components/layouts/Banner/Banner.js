import React from "react";
import "./Banner.css";
import { Row, Col } from "antd";
function Banner() {
  return (
    <div>
      <div style={{ width: "100%" }}>
        <Row className="banner-covid">
          <Col md={19} lg={19} xl={19} className="banner-title">
            <div>Giao Hàng An Toàn</div>
            <div>
              Nhận hàng đảm bảo phòng chống dịch bệnh, bằng quét mã QR code
            </div>
          </Col>
          <Col
            md={4}
            lg={4}
            xl={4}
            className="bg-img banner-img"
            style={{
              backgroundImage: "url(../../../banner-covid.jpg)",
              height: "100px",
              width: "180px",
            }}
          ></Col>
        </Row>
      </div>
    </div>
  );
}
export default Banner;
