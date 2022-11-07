import React, { useState, useEffect, useContext, useCallback } from "react";
import { Row, Col, Slider, Select, Spin } from "antd";
import "./Category.css";
import { Filter, X } from "react-feather";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../contexts/CategoryContext";
import CategoryProductItem from "../components/layouts/CategoryProductItem";
import { ProductContext } from "../contexts/ProductContext";
import LoadingPage from "../components/layouts/LoadingPage";
import Lottie from "react-lottie";
import empty from "../assets/empty1.json";
import { AuthContext } from "../contexts/AuthContext";
import slug from "slug";
const { Option } = Select;
function Category() {
  const { id } = useParams();

  const {
    authState: {
      user: { ward },
    },
  } = useContext(AuthContext);
  const {
    categoryState: { productFilter },
    setMaxPrice,
    setMinPrice,
    loadOneCategory,
    loadProductFilter,
    isLoadingItem,
    isLoading,
  } = useContext(CategoryContext);
  const { formatPrice } = useContext(ProductContext);
  const [CountPrice, setCountPrice] = useState([0, 100000]);
  const [modalFilter, setModalFilter] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: empty,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const getWard = slug(ward);
    loadOneCategory(id);
    loadProductFilter(id, getWard);
  }, []);

  const handleFilter = useCallback(() => {
    const getWard = slug(ward);
    loadProductFilter(id, getWard);
  }, [CountPrice]);

  const handleOnChange = (input) => {
    setCountPrice(input);
    setMinPrice(input[0]);
    setMaxPrice(input[1]);
  };
  console.log(productFilter);
  return (
    <>
      {isLoading ? (
        <div className="spin-load">
          <Spin size="large" />
        </div>
      ) : (
        ""
      )}

      <div className="container category-wrap">
        {modalFilter ? (
          <div className="modal-filter ">
            <div className="filter-mobile__top">
              <span className="title-filter-mobile">Lọc sản phẩm</span>
              <X
                size={30}
                style={{ color: "var(--color-gray)" }}
                onClick={() => setModalFilter(!modalFilter)}
              />
            </div>
            <div className="pd-2">
              <h3 className="title-filter">Lọc theo giá</h3>
              <Slider
                min={0}
                max={500000}
                range={{ draggableTrack: false }}
                defaultValue={[0, 100000]}
                onChange={handleOnChange}
              />
              <div className="result-filter">
                Giá từ: {formatPrice.format(CountPrice[0])} -
                {formatPrice.format(CountPrice[1])}
              </div>
              <h3 className="title-filter">Lọc theo thương hiệu</h3>
              <div className="checkbox-filter">
                <input type="checkbox" />
                <div>Màu đỏ</div>
              </div>
              <div className="checkbox-filter">
                <input type="checkbox" />
                <div>Màu vàng</div>
              </div>
              <div className="checkbox-filter">
                <input type="checkbox" />
                <div>Màu xanh</div>
              </div>
              <div className="checkbox-filter">
                <input type="checkbox" />
                <div>Màu cam</div>
              </div>
            </div>
            <button
              onClick={() => handleFilter()}
              className="btn-filter btn-filter__mobile"
            >
              Lọc sản phẩm
            </button>
          </div>
        ) : (
          ""
        )}
        <Row className="category">
          <Col lg={6} xl={6}>
            <div className="main-left">
              <div className="pd-2">
                <h3 className="title-filter">Lọc theo giá</h3>
                <Slider
                  min={0}
                  max={500000}
                  range={{ draggableTrack: false }}
                  defaultValue={[0, 100000]}
                  onChange={handleOnChange}
                />
                <div className="result-filter">
                  Giá từ: {formatPrice.format(CountPrice[0])} - {""}
                  {formatPrice.format(CountPrice[1])}
                </div>
                <h3 className="title-filter">Lọc theo thương hiệu</h3>
                <div className="checkbox-filter">
                  <input type="checkbox" />
                  <div>Màu đỏ</div>
                </div>
                <div className="checkbox-filter">
                  <input type="checkbox" />
                  <div>Màu vàng</div>
                </div>
                <div className="checkbox-filter">
                  <input type="checkbox" />
                  <div>Màu xanh</div>
                </div>
                <div className="checkbox-filter">
                  <input type="checkbox" />
                  <div>Màu cam</div>
                </div>
              </div>
              <button onClick={() => handleFilter()} className=" btn-filter">
                Lọc sản phẩm
              </button>
              <div className="main-left_poster">
                <img
                  src="../../milk.jpg"
                  alt=""
                  width="100%"
                  height="300px"
                  className="bg-img"
                />
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={18} xl={18}>
            <div className="main-right">
              <div
                className="bg-img"
                style={{
                  backgroundImage: `url(../../banner-detail.jpg)`,
                  width: "100%",
                  height: "180px",
                  borderRadius: 8,
                }}
              ></div>
              <div className="card-select">
                <Row justify="end" align="middle">
                  <Col sm={14} xs={12} md={12} lg={12} xl={12}>
                    <div
                      className="filter-mobile"
                      onClick={() => setModalFilter(!modalFilter)}
                    >
                      <Filter
                        size={18}
                        style={{
                          color: "var(--color-font-two)",
                          marginRight: ".3rem",
                        }}
                      />{" "}
                      <span>Lọc sản phẩm</span>
                    </div>
                  </Col>
                  <Col sm={10} xs={12} md={12} lg={12} xl={12}>
                    <div className="card-select__view">
                      <Select defaultValue="Sắp xếp theo thứ tự mới nhất">
                        <Option value="Sắp xếp theo thứ tự mới nhất">
                          Sắp xếp theo thứ tự mới nhất
                        </Option>
                        <Option value="Sắp xếp theo thứ tự cũ nhất">
                          Sắp xếp theo thứ tự cũ nhất
                        </Option>
                      </Select>
                    </div>
                  </Col>
                </Row>
              </div>
              <h2 className="title-view text-xl font-medium">Sản phẩm</h2>
              {isLoadingItem ? <LoadingPage /> : ""}
              <Row className="box-product">
                {productFilter?.length === 0 && (
                  <Lottie options={defaultOptions} height={200} width={200} />
                )}
                {productFilter?.map((item) => {
                  return <CategoryProductItem key={item.id} product={item} />;
                })}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Category;
