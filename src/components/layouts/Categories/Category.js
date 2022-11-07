import { Row, Col } from "antd";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../../contexts/CategoryContext";
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
      <div className="block text-center p-8">
        <h2 className="text-2xl font-bold capitalize">Danh sách các ngành hàng</h2>
        <p className="font-base text-md ">
          Here order your favorite foods from different categories
        </p>
      </div>
      <Row justify="center" align="middle">
        {categories?.map((item, index) => {
          return (
            <Col xl={3} md={3} sm={6} xs={6} key={index} className="shadow-sm p-4">
              <Link
                to={{
                  pathname: `categories/${item.slug}/${item.id}`,
                }}
              >
                <div className="category-card">
                  <div
                    className=" bg-img "
                    style={{
                      backgroundImage: `url(${item.image.url})`,
                      width: "50px",
                      height: "50px",
                    }}
                  ></div>
                  <div className="category-card__title truncate">{item.title}</div>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
