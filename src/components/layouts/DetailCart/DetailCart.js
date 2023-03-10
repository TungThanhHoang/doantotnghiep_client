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
      title: "B???n c?? ch???c ch???n mu???n x??a s???n ph???m n??y",
      icon: <ExclamationCircleOutlined />,
      okText: "C??",
      okType: "danger",
      cancelText: "Kh??ng",
      onOk() {
        deleteItemCart(id);
        message.success("X??a s???n ph???m th??nh c??ng !");
        setCheckedState([...cartItem].fill(false));
      },
      onCancel() {
      },
    });
  };

  const handleIncrease = async (id, quanlity) => {
    const increase = await increaseQuanlity(id, quanlity);
    if (increase) {
      message.success("T??ng s??? l?????ng th??nh c??ng !", 1);
    }
    return increase;
  };
  const handleDecrease = async (id, quanlity) => {
    const decrease = await decreaseQuanlity(id, quanlity);
    if (decrease) {
      message.success("Gi???m s??? l?????ng th??nh c??ng !", 1);
    }
    return decrease;
  };
  const handleCheckProduct = () => {
    if (newarray.length === 0) {
      message.warning("Vui l??ng ch???n ??t nh???t 1 s???n ph???m !", 2);
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
                  Ch???n s???n ph???m ????? ti???n h??nh thanh to??n
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
                    <div>S???n Ph???m</div>
                    <div>????n Gi??</div>
                    <div>S??? L?????ng</div>
                    <div>S??? Ti???n</div>
                    <div>Thao T??c</div>
                  </div>
                  <div className="list-product">
                    {/* <Row className="product-cart__item">
                      <Col xs={11} sm={8} md={5} lg={5} xl={5} className="info-product">
                        <input
                          type="checkbox"
                          checked={true}
                        />
                        <span className="text-md font-semibold">T???t c???</span>
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
            <div className="title-cart">Chi Ti???t Gi??? H??ng</div>
            <div className="wrap-checkout">
              <div className="checkout__item">
                <div>T???ng s??? ti???n</div>
                <div className="total-price__product">
                  {formatPrice.format(totalPrice)}
                </div>
              </div>
              <button className="bg-yellow-400 text-white hover:bg-yellow-500" onClick={() => handleCheckProduct()}>Mua h??ng</button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DetailCart;
