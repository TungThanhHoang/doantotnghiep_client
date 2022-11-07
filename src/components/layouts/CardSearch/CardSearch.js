import React, { useContext, useEffect, useState, useRef } from "react";
import "./CardSearch.css";
import { Row, Col } from "antd";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import { ProductContext } from "../../../contexts/ProductContext";
import { SearchContext } from "../../../contexts/SearchContext";
import Lottie from "react-lottie";
import empty from "../../../assets/empty1.json";
import useOnClickOutside from "../../../Hook/UseOnClickOutSide";
import useDebounce from "../../../libs/useDebounce";
function CardSearch() {
  const ref = useRef();
  const [searchModal, setSearchModal] = useState(false);
  const {
    productState: { newProducts },
  } = useContext(ProductContext);
  const { searchProduct, searchItem, stringSearch, setStringSearch } =
    useContext(SearchContext);

  const { formatPrice } = useContext(ProductContext)

  const filterDebounce = useDebounce(stringSearch, 300)

  useEffect(() => {
    const filterItem = async () => {
      if (stringSearch !== null) {
        await searchProduct(filterDebounce);
      }
    }
    filterItem()
  }, [filterDebounce]);

  useOnClickOutside(ref, () => setSearchModal(false));

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: empty,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // dfdfdf
  const SearchProductItem = ({
    item: {
      id,
      attributes: {
        title,
        price,
        picture: {
          data: {
            0: {
              attributes: {
                url
              }
            }
          }
        },
      }
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
          <span className="price-product">{formatPrice.format(price)}</span>
        </div>
      </Link>
    </Col>
  );
  return (
    <div className="navbar-search transition ease-in-out duration-800">
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
                {searchItem?.length === 0 && (
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
