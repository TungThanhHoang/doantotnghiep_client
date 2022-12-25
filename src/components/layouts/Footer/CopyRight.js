import React from "react";
import { Row, Col } from "antd";
import {
  PhoneOutlined,
  TwitterOutlined,
  InstagramOutlined,
  FacebookFilled,
} from "@ant-design/icons";
function CopyRight() {
  return (
    <div className="copy-right__wrap">
      <div className="container">
        <Row justify="space-around">
          <Col md={24} lg={8}>
            <div className="hotline">
              <div className="icon-phone">
                <PhoneOutlined style={{ fontSize: 32 }} />
              </div>
              <div>
                <div className="phone-us">0365781235</div>
                <div className="time-working">Làm việc từ 8:00 - 17:00</div>
              </div>
            </div>
          </Col>
          <Col md={24} lg={16}>
            <Row className="social-us">
              <Col xs={24} sm={24} md={8} xl={10}>
                <div className="title-download">
                  Tải ứng dụng trên điện thoại
                </div>
              </Col>
              <Col className="download-mobile" xs={24} sm={24} md={8} xl={8}>
                <img src="../../../../app-store.png" alt="" />
                <img src="../../../../google-play.png" alt="" />
              </Col>
              <Col xs={24} sm={24} md={8} xl={6} className="card-icon">
                <div className="card-social">
                  <InstagramOutlined className="icon-social" />
                </div>
                <div className="card-social">
                  <TwitterOutlined className="icon-social" />
                </div>
                <div className="card-social">
                  <FacebookFilled className="icon-social" />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="center" className="copyright">
          <Col xs={24} md={12} lg={12} className="title-right">
            <div className="copy-right">
              Copyright 2021 &copy; Shopping Market. Đã đăng ký bản quyền
            </div>
          </Col>
          <Col xs={24} md={12} lg={12}>
            <div className="term-use">
              <span>Chính sách bảo mật</span>
              <span>Điều khoản sử dụng</span>
              <span>Cookie</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CopyRight;
