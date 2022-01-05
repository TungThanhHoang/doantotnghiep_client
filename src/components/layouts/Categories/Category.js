import { Row, Col } from "antd";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../../contexts/CategoryContext";
import { apiUrl } from "../../../contexts/constants";
import "./Category.css";
export default function Category() {
  const {
    categoryState: { categories },
    loadCategory,
  } = useContext(CategoryContext);
  useEffect(() => {
    loadCategory();
  }, []);
  return (
    <div className="category">
      <Row justify="center" align="middle">
        {categories.map((item, index) => {
          return (
            <Col xl={3} md={3} sm={6} xs={6} key={index}>
              <Link
                to={{
                  pathname: `categories/${item.slug}/${item.id}`,
                }}
              >
                <div className="category-card">
                  <div
                    className=" bg-img "
                    style={{
                      backgroundImage: `url(${apiUrl}${item.image.url})`,
                      width: "50px",
                      height: "50px",
                    }}
                  ></div>
                  <div className="category-card__title">{item.title}</div>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
