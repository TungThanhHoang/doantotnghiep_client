import React from "react";
import { Trash2 } from "react-feather";
import { Row, Col } from "antd";
import Promotion from '../../../utils/Promotion'
function ListProductCart({
  cartItem: {
    id,
    quantity,
    product: {
      title,
      price,
      promotion,
      picture: {
        0: {
          url
        }
      }
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
        <img className="bg-img" src={url} alt="" />
      </Col>
      <Col xs={13} sm={16} md={19} lg={19} xl={19} className="total-product">
        {/* <Row> */}
        <div className="name-product font-medium capitalize">{title}</div>
        <div className="flex justify-end mr-4 grow">
          <div className="mr-2 text-gray-500 line-through">{promotion && formatPrice.format(price)}</div>
          <div className="text-red-600 font-medium text-sm">{formatPrice.format(promotion ? Promotion(promotion) * price : price)}</div>
        </div>
        <div className="quanlity-product">
          <button
            onClick={() => decreaseQuanlity(id, quantity)}
            className="btn-increase bg-yellow-400 text-white"
          >
            -
          </button>
          <input disabled type="text" value={quantity} />
          <button
            onClick={() => increaseQuanlity(id, quantity)}
            className="btn-decrease bg-yellow-400 text-white"
          >
            +
          </button>
        </div>
        <div className="total-price text-slate-700 font-medium">
          {formatPrice.format(handleTotalPriceProduct(quantity, promotion ? Promotion(promotion) * price : price))}
        </div>
        <div className="btn-remove" onClick={(e) => deleteItemCart(id)}>
          <Trash2 size={16} color="#666" />
        </div>
        {/* </Row> */}
      </Col>
    </Row>
  );
}

export default ListProductCart;
