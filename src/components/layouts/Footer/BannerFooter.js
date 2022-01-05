import React from "react";
import { Row, Col } from "antd";
function BannerFooter() {
  return (
    <div className="banner-footer__wrap">
      <div className="container">
        <Row className="banner-footer__column">
          <Col sm={24} lg={12} xl={12} className="info-promotion">
            <span>Giảm giá 50.000 cho đơn hàng đầu tiên của bạn</span>
            <h2>Tham gia cùng chúng tôi để nhận ngay quà tặng giá trị</h2>
            <span>
              Tham gia đăng ký email của chúng tôi ngay bây giờ để nhận thông
              tin cập nhật về chương trình khuyến mãi và mã phiếu thưởng
            </span>
            <div className="form-field">
              <input type="text" className="input-field" placeholder="Địa chỉ email của bạn" />
              {/* <label htmlFor="" className="label-input">
                Địa chỉ email của bạn
              </label> */}
              <button>Xác nhận</button>
            </div>
          </Col>
          <Col xs={24} sm={24} lg={12} xl={12}>
            <img
              src="../../../../coupon.png"
              alt=""
              className="bg-img"
              style={{ height: "100%" ,width:"100%"}}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BannerFooter;
