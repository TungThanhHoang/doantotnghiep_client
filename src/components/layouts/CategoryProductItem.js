import React, { useContext } from "react";
import { Col, message } from "antd";
import { CartContext } from "../../contexts/CartContext";
import { ProductContext } from "../../contexts/ProductContext";
import { Link } from "react-router-dom";
import Promotion from "../../utils/Promotion";
import { PlusOutlined } from '@ant-design/icons'


function CategoryProductItem({
  product: {
    id,
    attributes: {
      title,
      price,
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
      }
    }
  },
}) {

  const { formatPrice } = useContext(ProductContext);
  const { addProductToCart } = useContext(CartContext);

  const handleAddProduct = (productId) => {
    const addCart = addProductToCart(productId);
    if (addCart) {
      message.success("Thêm sản phẩm thành công", 1);
    }
    return addCart;
  };
  return (
    <Col xs={12} sm={8} lg={6} xl={6} className="card-product">
      <div className="card-product__wrap ">
        {promotion && <span className="absolute left-4 top-4 z-10 text-xs bg-yellow-300 px-3 py-1 rounded-full text-yellow-600 font-medium">-{promotion.split(" ").pop()}</span>
        }
        <Link to={{ pathname: `/product/${id}` }}>
          <div className="box-image">
            <img src={url} alt="" className="bg-img" />
          </div>
          <div className="padding-content">
            <div className="title-product mt-5">{title}</div>
            <div className="main-product flex items-center my-2">
              <div className="font-normal text-slate-900 ">{formatPrice.format(promotion ? Promotion(promotion) * price : price)}</div>
              {promotion !== null && <div className="font-normal ml-2 line-through text-slate-500 text-xs ">{formatPrice.format(price)}</div>}
            </div>
            <div className="main-product">
              {size}
            </div>
          </div>
        </Link>
        <button className="bg-yellow-200" onClick={(e) => handleAddProduct(id)}>
          <PlusOutlined className="text-xl text-white" style={{ color: 'white' }} />
        </button>
      </div>
    </Col>
  );
}

export default CategoryProductItem;
