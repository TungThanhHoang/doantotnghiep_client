import React from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
function BreadCrumbEcommerce() {
  return (
    <div className="container">
      <div style={{ margin: "1rem 0" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">
              <HomeOutlined style={{ fontSize: 18 }} />
              <span>Trang Chủ</span>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  );
}

export default BreadCrumbEcommerce;
