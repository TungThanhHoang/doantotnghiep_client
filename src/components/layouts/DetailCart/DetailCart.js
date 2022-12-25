import React, { useContext, useState, useMemo, useEffect } from "react";
import "./DetailCart.css";
import { useHistory } from "react-router-dom";
import { Row, Col, message, Modal } from "antd";
import ListProductCart from "./ListProductCart";
import { ProductContext } from "../../../contexts/ProductContext";
import { CartContext } from "../../../contexts/CartContext";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Lottie from "react-lottie";
import loading from "../../../assets/cart-empty.json";
import Promotion from "../../../utils/Promotion";
const { confirm } = Modal;

function DetailCart() {
  const { cartItem, deleteItemCart, increaseQuanlity, decreaseQuanlity } =
    useContext(CartContext);

  const { formatPrice } = useContext(ProductContext);
  const [checkedState, setCheckedState] = useState([...cartItem].fill(false));
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCheck = (idItem) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === idItem ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const total = updatedCheckedState.reduce((sum, currentState, index) => {
      if (currentState === true) {
        return sum + (cartItem[index].product?.promotion ? Promotion(cartItem[index].product?.promotion) * cartItem[index].product.price : cartItem[index].product.price) * cartItem[index].quantity;
      }
      return sum;
    }, 0);

    setTotalPrice(total);
  };
  const getData = useMemo(() => handleCheck(cartItem), [cartItem]);
  let newarray = [];
  const handleSubmitOrder = () => {
    [...checkedState]?.map((item, index) => {
      if (item === true) {
        newarray.push(cartItem[index]);
      }
      return newarray;
    });
    // history.push("/checkout");
  };
  handleSubmitOrder();
  const handleDeleteItem = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này",
      icon: <ExclamationCircleOutlined />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteItemCart(id);
        message.success("Xóa sản phẩm thành công !");
        setCheckedState([...cartItem].fill(false));
      },
      onCancel() {
      },
    });
  };

  const handleIncrease = async (id, quanlity) => {
    const increase = await increaseQuanlity(id, quanlity);
    if (increase) {
      message.success("Tăng số lượng thành công !", 1);
    }
    return increase;
  };
  const handleDecrease = async (id, quanlity) => {
    const decrease = await decreaseQuanlity(id, quanlity);
    if (decrease) {
      message.success("Giảm số lượng thành công !", 1);
    }
    return decrease;
  };
  const handleCheckProduct = () => {
    if (newarray.length === 0) {
      message.warning("Vui lòng chọn ít nhất 1 sản phẩm !", 2);
    } else {
      const local = {
        pathname: "/checkout",
        state: { newarray, totalPrice },
      };
      history.push(local);
    }
  };

  useEffect(() => {
    setCheckedState([...cartItem].fill(false))
  }, [cartItem])
  

  return (
    <div className="detail-cart">
      <Row>
        <Col xs={24} sm={24} md={24} lg={18} xl={18}>
          <div className="main-left">
            {cartItem.length !== 0 && (
              <Col>
                <div className="notify-cart bg-yellow-400 text-yellow-50">
                  Chọn sản phẩm để tiến hành thanh toán
                </div>
              </Col>
            )}
            {cartItem.length === 0 ? (
              <div
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  height: "100vh",
                  zIndex: 999,
                  alignSelf: "center",
                }}
              >
                <Lottie options={defaultOptions} height={250} width={250} />
              </div>
            ) : (
              <Col>
                <div className="content-cart">
                  <div className="title-detail">
                    <div>Sản Phẩm</div>
                    <div>Đơn Giá</div>
                    <div>Số Lượng</div>
                    <div>Số Tiền</div>
                    <div>Thao Tác</div>
                  </div>
                  <div className="list-product">
                    {/* <Row className="product-cart__item">
                      <Col xs={11} sm={8} md={5} lg={5} xl={5} className="info-product">
                        <input
                          type="checkbox"
                          checked={true}
                        />
                        <span className="text-md font-semibold">Tất cả</span>
                      </Col>
                    </Row> */}
                    {cartItem.map((item, index) => {
                      return (
                        <ListProductCart
                          key={item.id}
                          cartItem={item}
                          index={index}
                          formatPrice={formatPrice}
                          deleteItemCart={handleDeleteItem}
                          increaseQuanlity={handleIncrease}
                          decreaseQuanlity={handleDecrease}
                          checkedState={checkedState}
                          handleCheck={handleCheck}
                        />
                      );
                    })}
                  </div>
                </div>
              </Col>
            )}
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <div className="main-right">
            <div className="title-cart">Chi Tiết Giỏ Hàng</div>
            <div className="wrap-checkout">
              <div className="checkout__item">
                <div>Tổng số tiền</div>
                <div className="total-price__product">
                  {formatPrice.format(totalPrice)}
                </div>
              </div>
              <button className="bg-yellow-400 text-white hover:bg-yellow-500" onClick={() => handleCheckProduct()}>Mua hàng</button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DetailCart;
