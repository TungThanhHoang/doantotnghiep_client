import React from "react";
import { notification } from "antd";
function NotifyProduct() {
  const openNotification = () => {
    notification['success']({
      message: "Thành Công",
      description: "Sản phẩm đã được thêm vào giỏ hàng !",
    });
  };
  return <button onClick={openNotification}></button>;
}

export default NotifyProduct;
