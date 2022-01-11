import React, { useState, useContext, useEffect } from "react";
import { Search } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { ProductContext } from "../../../contexts/ProductContext";
import { SearchContext } from "../../../contexts/SearchContext";
import Lottie from "react-lottie";
import empty from "../../../assets/empty1.json";
function CardSearchMobile({ setSearchState }) {
  const {
    productState: { newProducts },
    formatPrice
  } = useContext(ProductContext);
  // const [searchString, setSearchItem] = useState("");
  const { searchProduct, searchItem, stringSearch, setStringSearch } =
    useContext(SearchContext);
  useEffect(() => {
    if (stringSearch !== null) {
      searchProduct();
    }
  }, [stringSearch]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: empty,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const navigationLink = () => {
    setSearchState(false);
  };
  const SearchProductItem = ({
    item: {
      id,
      title,
      Price,
      picture: {
        0: { url },
      },
    },
  }) => (
    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
      <Link
        to={{ pathname: `/product/${id}` }}
        onClick={navigationLink}
        className="search-new__product"
      >
        <img
          src={url}
          alt=""
          className="bg-img"
          width={50}
          height={50}
        />
        <div className="product-item product-item__mobile">
          <div className="title-product__search">{title}</div>
          <span className="price-product">{formatPrice.format(Price)}</span>
        </div>
      </Link>
    </Col>
  );
  return (
    <div className="navbar-search__mobile">
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="field-input"
          onChange={(e) => setStringSearch(e.target.value)}
        />
        <span className="btn-search">
          <Search size={24} className="nav-search-icon" />
        </span>
        <button onClick={() => setSearchState(false)}>Hủy</button>
      </div>
      <div className="card-content__wrap ">
        {stringSearch === "" ? (
          <div>
            <h4 className="title-search">Sản phẩm mới</h4>
            <Row className="container__wrap">
              {newProducts?.slice(0, 6).map((item, index) => (
                <SearchProductItem key={index} item={item} />
              ))}
            </Row>
          </div>
        ) : (
          <div>
            <h4 className="title-search">Sản phẩm tìm kiếm</h4>
            <Row className="container__wrap">
              {searchItem?.map((item, index) => (
                <SearchProductItem key={index} item={item} />
              ))}
            </Row>
            {searchItem.length === 0 && (
              <div className="search-empty">
                <Lottie options={defaultOptions} height={150} width={150} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CardSearchMobile;
