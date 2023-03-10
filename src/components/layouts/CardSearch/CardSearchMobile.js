import React, { useContext, useEffect } from "react";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { ProductContext } from "../../../contexts/ProductContext";
import { SearchContext } from "../../../contexts/SearchContext";
import Lottie from "react-lottie";
import empty from "../../../assets/empty1.json";
import useDebounce from "../../../libs/useDebounce";
function CardSearchMobile({ setSearchState }) {
  const {
    productState: { newProducts },
    formatPrice
  } = useContext(ProductContext);
  const { searchProduct, searchItem, stringSearch, setStringSearch } =
    useContext(SearchContext);

  const filterDebounce = useDebounce(stringSearch, 300)

  useEffect(() => {
    const filterItem = async () => {
      if (stringSearch !== null) {
        await searchProduct(filterDebounce);
      }
    }
    filterItem()
  }, [filterDebounce]);

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
          <span className="price-product">{formatPrice.format(price)}</span>
        </div>
      </Link>
    </Col>
  );
  return (
    <div className="navbar-search__mobile">
      <div className="navbar-search">
        <input
          type="text"
          placeholder="T??m ki???m"
          className="field-input"
          onChange={(e) => setStringSearch(e.target.value)}
        />
        <span className="btn-search">
          <Search size={24} className="nav-search-icon" />
        </span>
        <button onClick={() => setSearchState(false)}>H???y</button>
      </div>
      <div className="card-content__wrap ">
        {stringSearch === "" ? (
          <div>
            <h4 className="title-search">S???n ph???m m???i</h4>
            <Row className="container__wrap">
              {newProducts?.map((item, index) => (
                <SearchProductItem key={index} item={item} />
              ))}
            </Row>
          </div>
        ) : (
          <div>
            <h4 className="title-search">S???n ph???m t??m ki???m</h4>
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
