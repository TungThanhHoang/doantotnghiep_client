import React from "react";
import "./NotifyOrder.css";
import Lottie from "react-lottie";
import { Link, useLocation } from "react-router-dom";
import loading from '../../../assets/orderSuccess.json'
function NotifyOrder() {
  const location = useLocation();
  const idCode = location.state.code;
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="notify-success">
      <div>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="title-success">Đặt hàng thành công</div>
      <span className="code-order">Mã đơn hàng: {idCode} </span>
      <div className="navigation-user">
        <Link to="/user/bill"> Chi tiết đơn hàng</Link>
        <Link to="/"> Trở về trang chủ</Link>
      </div>
    </div>
  );
}

export default NotifyOrder;
