import React, { useContext } from "react";
import { Col, message } from "antd";
import { CartContext } from "../../../contexts/CartContext";
import { ProductContext } from "../../../contexts/ProductContext";
import { Link } from "react-router-dom";
import Promotion from "../../../utils/Promotion";
import { PlusOutlined } from '@ant-design/icons'

function CardProduct({
  product: {
    id,
    attributes: {
      title,
      price,
      slug,
      size,
      promotion,
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
}) {

  const { formatPrice } = useContext(ProductContext);
  const { addProductToCart } = useContext(CartContext);

  const handleAddProduct = (productId, quanlity) => {
    const addCart = addProductToCart(productId, quanlity);
    if (addCart) {
      message.success("Thêm sản phẩm thành công", 1);
    }
    return addCart;
  };

  return (
    <Col className="card-product col-five relative ">
      <div className="card-product__wrap ">
        <Link to={{ pathname: `product/${id}` }}>
          {promotion !== null && <span className="absolute left-4 top-4 z-10 text-xs bg-yellow-300 px-3 py-1 rounded-full text-yellow-600 font-medium">-{promotion?.split(" ").pop()}</span>}
          <div className="box-image">
            <img src={url} alt="" className="bg-img" />
          </div>
          <div className="p-3">
            <div className="title-product font-medium text-lg mt-3 ">{title}</div>
            <div className="main-product flex items-center py-2 ">
              <div className="text-red-600">{formatPrice.format(promotion ? Promotion(promotion) * price : price)}</div>
              {promotion !== null && <div className="font-normal ml-2 line-through text-slate-500 text-xs ">{formatPrice.format(price)}</div>}
            </div>
            <div className="main-product">
              {size}
            </div>
          </div>
        </Link>
        <button className="bg-yellow-200" onClick={() => handleAddProduct(id, 1)}>
          <PlusOutlined className="text-xl text-white" style={{ color: 'white' }} />
        </button>
      </div>
    </Col>
  );
}

export default CardProduct;
