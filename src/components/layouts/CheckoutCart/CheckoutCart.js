import React, { useContext, useState, useEffect } from "react";
import { Row, Col, message } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import "./CheckoutCart.css";
import { AuthContext } from "../../../contexts/AuthContext";
import CheckOutItem from "./CheckOutItem";
import { ProductContext } from "../../../contexts/ProductContext";
import { CheckOutContext } from "../../../contexts/CheckOutContext";
import { Bell } from "react-feather";
import { CartContext } from "../../../contexts/CartContext";
import QRCode from "qrcode";
const payments = [
  {
    id: 1,
    img: "../../../../icon-payment-method-cod.png",
    title: "Thanh toán tiền mặt khi nhận hàng",
  },
  {
    id: 2,
    img: "../../../../icon-payment-method-mo-mo.png",
    title: "Thanh toán bằng ví MoMo",
  },
  {
    id: "3",
    img: "../.../../../../../icon-payment-method-atm.png",
    title: "Thanh toán bằng ATM/Internet Banking",
  },
];
const codeOrder = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const code = codeOrder(10000000, 100000000);

function CheckoutCart() {
  const {
    authState: {
      user: { address, ward, district, firstname, lastname, phone },
    },
  } = useContext(AuthContext);
  const { formatPrice } = useContext(ProductContext);
  const [checked, setChecked] = useState(payments[0].title);
  const location = useLocation();
  const history = useHistory();
  const stateItem = location.state.newarray;
  const totalPrice = location.state.totalPrice;
  const [order] = useState({
    id_code: JSON.stringify(code),
    phone: `${phone}`,
    name: `${lastname}${firstname} `,
    cart: stateItem.map((item) => item.id),
    price: JSON.stringify(totalPrice),
    address: `${address}, ${ward}, ${district}`,
    payment: checked,
  });
  const { payment } = order;

  const { loadItemCart } = useContext(CartContext);
  const { orderProducts } = useContext(CheckOutContext);
  let opts = {
    errorCorrectionLevel: "Q",
    width: 256,
    height: 256,
  };
  const [imgQR, setImgQR] = useState("hello word");
  const [convertProduct, setConvertProduct] = useState([]);
  const [sendCode] = useState({
    id_code: JSON.stringify(code),
    phone: `${phone}`,
    name: `${lastname} ${firstname}`,
    price: JSON.stringify(totalPrice),
    address: `${address}, ${ward}, ${district}`,
  });
  useEffect(() => {
    const arrayProduct = [];
    stateItem?.forEach((item) => {
      arrayProduct.push([
        ...convertProduct,
        item.products.title,
        item.products.Price,
        item.products.picture[0].url,
        item.quanlity,
      ]);
    });
    setConvertProduct(arrayProduct);
  }, []);

  QRCode.toString(
    JSON.stringify({
      ...sendCode,
      product: `${convertProduct}`,
    }),
    opts
  )
    .then((res) => {
      setImgQR(res);
    })
    .catch((err) => {
      console.error(err);
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("đang tạo mã");
    try {
      const submit = await orderProducts({
        ...order,
        imgcode: imgQR,
        payment: checked,
      });
      if (submit) {
        message.success("Đơn hàng đã được đặt hàng thành công !", 3);
        loadItemCart();
        const local = {
          pathname: "/order-success",
          state: { code },
        };
        history.push(local);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className="wrap-checkout">
      <Col xs={24} sm={24} md={24} lg={16} xl={16}>
        <div className="notify-delivery">
          <Bell size={20} />
          Với đơn hàng được đặt trước 18h sẽ được giao hàng trong ngày. Với đơn
          hàng sau 18h sẽ được giao hàng vào ngày tiếp theo !
        </div>
        <div className="main-left">
          <div className="title-order">Thông Tin Đơn Hàng</div>
          {stateItem.map((item, index) => (
            <CheckOutItem data={item} key={item.id} formatPrice={formatPrice} />
          ))}
        </div>
        <div className="card-payment">
          <div className="title-payment">
            <div className="format-payment">Hình Thức Thanh Toán</div>
            <div className="notify-payment">
              (Khuyến khích thanh toán trả trước và hạn chế tiếp xúc gần để đề
              phòng COVID19)
            </div>
          </div>
          <div>
            {payments.map((item) => {
              return (
                <div className="payment-item" key={item.id} value={item.title}>
                  <input
                    type="checkbox"
                    name="payment"
                    checked={checked === item.title}
                    value={payment}
                    onChange={() => {
                      setChecked(item.title);
                    }}
                  />
                  <img src={item.img} alt="" width={30} height={30} />
                  <div>{item.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
        <div className="main-right">
          <div className="card-info__user">
            <div className="title-info">Địa Chỉ Giao Hàng</div>
            <div className="detail-info">
              <div className="name-user">
                {lastname} {firstname}
              </div>
              <div className="address-delivery">
                {address}, {ward}, {district}, Thành Phố Đà Nẵng
              </div>
              <div className="phone-user">
                Điện thoại: <span>{phone}</span>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="card-info__order">
            <div className="title-info">Đơn hàng</div>
            <div>
              <div className="delivery-fee">
                <span>Tạm tính:</span>{" "}
                <span>{formatPrice.format(totalPrice)}</span>
              </div>
              <div className="delivery-fee">
                <span>Phí vận chuyển:</span>{" "}
                <span>{formatPrice.format(10000)}</span>
              </div>
              <div className="total-price__order">
                <span>Tổng tiền:</span>{" "}
                <span style={{ color: "var(--color-price)" }}>
                  {formatPrice.format(totalPrice + 10000)}
                </span>
              </div>
            </div>
            <button>Đặt Mua</button>
          </form>
        </div>
      </Col>
    </Row>
  );
}

export default CheckoutCart;
