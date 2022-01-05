import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header-main">
          <div className="header-main__left">
            <div className="main-left__item">
              <Link to="">Về chúng tôi</Link>
            </div>
            <div className="main-left__item">
              <Link to="/user/info">Tài khoản của tôi</Link>
            </div>
            <div className="main-left__item">
              <Link to="/user/bill">Đơn hàng</Link>
            </div>
          </div>
          <div className="header-main__right">
            <div>Bạn cần trợ giúp?</div>
            <div>
              Hotline: <span>0123456788</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
