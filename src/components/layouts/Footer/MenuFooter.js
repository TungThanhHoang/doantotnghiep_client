import React from "react";
import { Row, Col } from "antd";
import { useContext } from "react";
import { CategoryContext } from "../../../contexts/CategoryContext";
function MenuFooter() {

  const { categoryState: { categories } } = useContext(CategoryContext)

  return (
    <div className="menu-footer__wrap">
      <Row className="container" justify="space-around" align="middle">
        {categories?.map(item => (
          <Col xs={12} sm={6} md={6} xl={3} lg={3}>
            <div className="text-slate-900 p-2 cursor-pointer mt-2">{item.title}</div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MenuFooter;
