import React, { useContext, useEffect, useState, useRef } from "react";
import "./CardSearch.css";
import { Row, Col } from "antd";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import { ProductContext } from "../../../contexts/ProductContext";
import { apiUrl } from "../../../contexts/constants";
import { SearchContext } from "../../../contexts/SearchContext";
import Lottie from "react-lottie";
import empty from "../../../assets/empty1.json";
import useOnClickOutside from "../../../Hook/UseOnClickOutSide";
function CardSearch() {
  const ref = useRef();
  const [searchModal, setSearchModal] = useState(false);
  const {
    productState: { newProducts },
  } = useContext(ProductContext);
  // const [searchString, setSearchItem] = useState("");
  const { searchProduct, searchItem, stringSearch, setStringSearch } =
    useContext(SearchContext);
  const { formatPrice } = useContext(ProductContext)  
  useEffect(() => {
    if (stringSearch !== null) {
      searchProduct();
    }
  }, [stringSearch]);

  useOnClickOutside(ref, () => setSearchModal(false));

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: empty,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
    <Col xs={24} sm={24} md={24} lg={24} xl={12}>
      <Link
        to={{ pathname: `/product/${id}` }}
        onClick={() => setSearchModal(!searchModal)}
        className="search-new__product"
      >
        <img src={url} alt="" className="bg-img" width={50} height={50} />
        <div className="product-item">
          <div className="title-product__search">{title}</div>
          <span className="price-product">{formatPrice.format(Price)}</span>
        </div>
      </Link>
    </Col>
  );
  return (
    <div className="navbar-search">
      <div>
        <input
          type="text"
          placeholder="Bạn muốn tìm kiếm gì"
          className="field-input"
          onChange={(e) => setStringSearch(e.target.value)}
          onClick={() => setSearchModal(!searchModal)}
        />
        <span className="btn-search">
          <Search size={24} className="nav-search-icon" />
        </span>
        {searchModal ? (
          <div className="content-search__wrap" ref={ref}>
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
                  <div className=" search-empty">
                    <Lottie options={defaultOptions} height={150} width={150} />
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div></div>
    </div>
  );
}

export default CardSearch;
