import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, message } from "antd";
import { CartContext } from "../../../contexts/CartContext";
import Promotion from "../../../utils/Promotion";
import { PlusOutlined } from '@ant-design/icons'

function ProductItem({
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
  formatPrice,
}) {
  const { addProductToCart } = useContext(CartContext);

  const handleAddProduct = (productId, quanlity) => {
    const addCart = addProductToCart(productId, quanlity);
    if (addCart) {
      message.success("Thêm sản phẩm thành công", 1);
    }
    return addCart;
  };

  return (
    <div className="card-product__item">
      <span className="absolute left-2 top-2 z-10 text-xs bg-yellow-300 px-3 py-1 rounded-full text-yellow-600 font-medium">-{promotion.split(" ").pop()}</span>
      <Link
        to={{
          pathname: `/product/${id}`,
          state: {},
        }}
      >
        <img
          className="bg-img img-product"
          src={url}
          alt=""
          style={{
            width: "145px",
            height: "145px",
            borderRadius: "10px",
          }}
        />

        <div className="title-product mt-3 ">{title}</div>
        <div className="main-product">
          <div className="price-product font-normal text-red-600 ">{formatPrice.format(promotion ? Promotion(promotion) * price : price)}</div>
          {promotion !== null && <div className="font-normal ml-2 line-through text-slate-500 text-xs ">{formatPrice.format(price)}</div>}
        </div>
        <div className="main-product">
          {size}
        </div>
        <span className="ml-3 p-1 rounded-full text-xs px-3 text-yellow-700 bg-yellow-300">Sale</span>
      </Link>
      <Button className="add-cart" onClick={() => handleAddProduct(id, 1)}>
        <PlusOutlined className="text-xl text-white" style={{ color: 'white' }} />
      </Button>
    </div >
  );
}

export default ProductItem;
