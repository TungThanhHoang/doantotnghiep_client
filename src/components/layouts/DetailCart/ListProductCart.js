import React from "react";
import { apiUrl } from "../../../contexts/constants";
import { Trash2 } from "react-feather";
import { Row, Col } from "antd";
function ListProductCart({
  cartItem: {
    id,
    quanlity,
    products: {
      title,
      Price,
      picture: {
        0: { url },
      },
    },
  },
  index,
  formatPrice,
  deleteItemCart,
  increaseQuanlity,
  decreaseQuanlity,
  handleCheck,
  checkedState,
}) {
  const handleTotalPriceProduct = (quanlity, price) => {
    let total = quanlity * price;
    return total;
  };

  return (
    <Row className="product-cart__item">
      <Col xs={11} sm={8} md={5} lg={5} xl={5} className="info-product">
        <input
          type="checkbox"
          name={index}
          value={index}
          checked={checkedState[index]}
          onChange={() => handleCheck(index)}
        />
        <img className="bg-img" src={`${apiUrl}` + url} alt="" />
      </Col>
      <Col xs={13} sm={16} md={19} lg={19} xl={19} className="total-product">
        {/* <Row> */}
          <div className="name-product">{title}</div>
          <div className="price-product">{formatPrice.format(Price)}</div>
          <div className="quanlity-product">
            <button
              onClick={(e) => decreaseQuanlity(id, quanlity)}
              className="btn-increase"
            >
              -
            </button>
            <input disabled type="text" value={quanlity} />
            <button
              onClick={(e) => increaseQuanlity(id, quanlity)}
              className="btn-decrease"
            >
              +
            </button>
          </div>
          <div className="total-price">
            {formatPrice.format(handleTotalPriceProduct(quanlity, Price))}
          </div>
          <div className="btn-remove" onClick={(e) => deleteItemCart(id)}>
            <Trash2 size={16} color="orange" />
          </div>
        {/* </Row> */}
      </Col>
    </Row>
  );
}

export default ListProductCart;
