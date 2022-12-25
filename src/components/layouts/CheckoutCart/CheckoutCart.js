import "./CheckoutCart.css";
import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, message } from "antd";
import QRCode from "qrcode";
import { DISTANCE, MARKET } from "../../../contexts/constants";
import { AuthContext } from "../../../contexts/AuthContext";
import CheckOutItem from "./CheckOutItem";
import { ProductContext } from "../../../contexts/ProductContext";
import { CheckOutContext } from "../../../contexts/CheckOutContext";
import { CartContext } from "../../../contexts/CartContext";
import { getPaymentMethod } from "../../../redux/paymentSlice";
import { getPaymentSelector, selectMarketSelector } from "../../../redux/selector";
import CalculatorDuration from "../../../utils/CalculatorDuration";
import DeliveryFee from "../../../utils/DeliveryFee";
import { loadStripe } from "@stripe/stripe-js";
import RandomCodeDelivery from "../../../utils/RandomCodeDelivery";
import MetaMaskModal from "../MetaMaskModal";
import { PlusOutlined } from '@ant-design/icons'
import AddressDeliveryModal from "../AddressDeliveryModal";

let opts = {
  errorCorrectionLevel: "Q",
  width: 256,
  height: 256,
};

const code = RandomCodeDelivery(10000000, 100000000);

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY || "")

function CheckoutCart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  let product_stripe = []

  const {
    authState: {
      user: { street, ward, distinct, firstName, lastName, phone },
    },
  } = useContext(AuthContext);
  const { formatPrice } = useContext(ProductContext);
  const { loadItemCart } = useContext(CartContext)

  const paymentMethod = useSelector(getPaymentSelector)
  const valueMarket = useSelector(selectMarketSelector)

  const [checked, setChecked] = useState(1);

  const stateItem = location.state.newarray;
  const totalPrice = location.state.totalPrice;

  const [order] = useState({
    items: stateItem.map((item) => item.id),
    payment_method: checked,
    note: ""
  });
  const { payment } = order;

  const { orderProducts, isLoadingBill, checkoutByStripe, checkoutMetaMask } = useContext(CheckOutContext);

  const [convertProduct, setConvertProduct] = useState("");
  const [sendCode] = useState({
    phone: `${phone}`,
    userName: `${lastName} ${firstName}`,
    address: `${street}, ${ward}, ${distinct}`,
  });
  const [note, setNote] = useState("")

  const [routes, setRoutes] = useState(JSON.parse(localStorage.getItem(DISTANCE)))
  const [metaMaskModal, setMetaMaskModal] = useState(false);
  const [addressDelivery, setaddressDelivery] = useState(false);
  const [addressForm, setAddressForm] = useState({ ward: ward, distinct: distinct, street: street, phone: phone })

  stateItem.forEach(item => product_stripe.push({ title: item.product.title, price: item?.product.price, quantity: item?.quantity, image: item?.product?.picture[0]?.url }));

  // payment stripe
  const paymentStripe = async () => {
    let qrCode = '';
    await QRCode.toString(
      JSON.stringify({
        ...sendCode,
        userName: `${addressForm.name}`,
        phone: `${addressForm.phone}`,
        address: `${addressForm.street}, ${addressForm.ward}, ${addressForm.distinct}`,
        id_code: JSON.stringify(code),
        product: convertProduct,
        payment_method: checked,
        discount: calculatorPromotion(),
        sub_total: (totalPrice + calculatorPromotion()),
        total: (totalPrice + DeliveryFee(Number(routes?.distance / 1000).toFixed(1), totalPrice))
      }),
      opts
    )
      .then((res) => {
        qrCode = res;
      })
      .catch((err) => {
        console.error(err);
      });
    const stripe = await stripePromise
    const response = await checkoutByStripe({
      "products": product_stripe, shipping_fee: DeliveryFee(Number(routes?.distance / 1000).toFixed(1), totalPrice),
      "data": {
        ...order,
        userName: `${addressForm.name}`,
        phone: `${addressForm.phone}`,
        address: `${addressForm.street}, ${addressForm.ward}, ${addressForm.distinct}`,
        id_code: JSON.stringify(code),
        qrCode: qrCode,
        payment_method: checked,
        delivery_fee: DeliveryFee(Number(routes?.distance / 1000).toFixed(1), totalPrice),
        note: note,
        discount: calculatorPromotion(),
        sub_total: (totalPrice + calculatorPromotion()),
        total: (totalPrice + DeliveryFee(Number(routes?.distance / 1000).toFixed(1), totalPrice))
      }
    })

    await stripe.redirectToCheckout({
      sessionId: response?.id,
    })
  }

  // payment cash
  const paymentCash = async () => {
    let qrCode = ''
    await QRCode.toString(
      JSON.stringify({
        ...sendCode,
        userName: `${addressForm.name}`,
        phone: `${addressForm.phone}`,
        address: `${addressForm.street}, ${addressForm.ward}, ${addressForm.distinct}`,
        id_code: JSON.stringify(code),
        product: convertProduct,
        payment_method: checked,
        discount: calculatorPromotion(),
        sub_total: (totalPrice + calculatorPromotion()),
        total: (totalPrice + DeliveryFee(Number(routes?.distance / 1000).toFixed(1), totalPrice))
      }),
      opts
    )
      .then((res) => {
        qrCode = res
      })
      .catch((err) => {
        console.error(err);
      });
    const submit = await orderProducts({
      ...order,
      userName: `${addressForm.name}`,
      phone: `${addressForm.phone}`,
      address: `${addressForm.street}, ${addressForm.ward}, ${addressForm.distinct}`,
      id_code: JSON.stringify(code),
      qrCode: qrCode,
      payment_method: checked,
      delivery_fee: DeliveryFee(Number(routes?.distance / 1000).toFixed(1), totalPrice),
      note: note,
      discount: calculatorPromotion(),
      sub_total: (totalPrice + calculatorPromotion()),
      total: (totalPrice + DeliveryFee(Number(routes?.distance / 1000).toFixed(1), totalPrice))

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
  }

  // payment MetaMask
  const paymentBlock = async () => {
    let qrCode = ''
    await QRCode.toString(
      JSON.stringify({
        ...sendCode,
        userName: `${addressForm.name}`,
        phone: `${addressForm.phone}`,
        address: `${addressForm.street}, ${addressForm.ward}, ${addressForm.distinct}`,
        id_code: JSON.stringify(code),
        product: convertProduct,
        payment_method: checked,
        discount: calculatorPromotion(),
        sub_total: (totalPrice + calculatorPromotion()),
        total: (totalPrice + DeliveryFee(Number(routes?.distance / 1000).toFixed(1), totalPrice))
      }),
      opts
    )
      .then((res) => {
        qrCode = res
      })
      .catch((err) => {
        console.error(err);
      });
    const submit = await checkoutMetaMask({
      ...order,
      userName: `${addressForm.name}`,
      phone: `${addressForm.phone}`,
      address: `${addressForm.street}, ${addressForm.ward}, ${addressForm.distinct}`,
      id_code: JSON.stringify(code),
      qrCode: qrCode,
      payment_method: checked,
      delivery_fee: DeliveryFee(Number(routes?.distance / 1000).toFixed(1), totalPrice),
      note: note,
      discount: calculatorPromotion(),
      sub_total: (totalPrice + calculatorPromotion()),
      total: (totalPrice + DeliveryFee(Number(routes?.distance / 1000).toFixed(1), totalPrice))

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
  }

  //payment MetaMask Modal
  const paymentMetaMask = () => {
    setMetaMaskModal(true);
  }

  const handleOnChangeNote = (e) => {
    setNote(e.target.value)
  }

  // Calculator Promotion
  const calculatorPromotion = () => {
    let price_promotion = 0
    stateItem.forEach(item => {
      price_promotion += item.product.promotion ? (parseInt(item?.product?.promotion?.split(" ").pop()) / 100) * item.product.price * item.quantity : 0;
    })
    return price_promotion;
  }

  useEffect(() => {
     setAddressForm({...addressForm, name: `${lastName} ${firstName}`})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName])


  useEffect(() => {
    setRoutes(JSON.parse(localStorage.getItem(DISTANCE)));
  }, [valueMarket])

  useEffect(() => {
    const arrayProduct = [];
    stateItem?.forEach((item) => {
      arrayProduct.push(...convertProduct, {
        title: item.product.title,
        price: item.product.price,
        promotion: item.product.promotion,
        picture: item.product.picture[0].url,
        quantity: item.quantity,
      });
    });
    setConvertProduct(arrayProduct);
    dispatch(getPaymentMethod())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (checked) {
        case 1: paymentCash()
          break;
        case 2: paymentStripe()
          break;
        case 3: paymentMetaMask();
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {metaMaskModal && <MetaMaskModal totalPrice={(totalPrice + DeliveryFee(Number(routes?.distance / 1000).toFixed(1), totalPrice))} paymentCash={paymentBlock} onHide={setMetaMaskModal} />}
      {addressDelivery && <AddressDeliveryModal addressForm={addressForm} setAddressForm={setAddressForm} onHide={setaddressDelivery} setRoutes={setRoutes} />}
      <div className="mb-10">
        {/* <h3 className="text-lg text-gray-600">Vui lòng thanh toán trong {CountdownTimer(FITTEEN_MINUTES)} </h3> */}
      </div>
      <Row className="wrap-checkout">
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
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
              {paymentMethod?.map((item) => {
                return (
                  <div className="payment-item" key={item.id} value={item.id}>
                    <input
                      type="checkbox"
                      name="payment"
                      checked={checked === item.id}
                      value={payment}
                      onChange={() => {
                        setChecked(item.id);
                      }}
                    />
                    <img src={item.attributes.image.data.attributes.url} alt="" width={25} height={25} />
                    <div>{item.attributes.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mb-5 md:mr-8">
            <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 ">Lưu ý</label>
            <textarea id="note" rows="3" name="note" className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-200 ring-0" placeholder="Lưu ý" onChange={handleOnChangeNote}></textarea>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <div className="main-right">
            <div className="card-info__user">
              <div className="title-info">Địa Chỉ Giao Hàng</div>
              <div className="detail-info">
                <div className="mt-4">
                  <span className="text-slate-600">Người nhận:</span>
                  <span className="name-user">{` ${addressForm.name}`}</span>
                </div>
                <div className="my-2">
                  <span className="text-slate-600">Địa chỉ nhận hàng:</span>{" "}
                  <span className="address-delivery font-medium text-slate-800">{addressForm?.street}, {addressForm?.ward}, {addressForm?.distinct}, Thành Phố Đà Nẵng</span>
                </div>
                <div className="text-slate-600">
                  <span className="text-slate-800">Điện thoại:</span>{" "}
                  <span className="font-medium text-black">{addressForm?.phone}</span>
                </div>
              </div>
              <div className="mt-4">
                <button type="button" onClick={() => setaddressDelivery(true)} class="flex items-center py-2.5 px-5 text-sm font-normal text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-50 focus:z-10 focus:ring-4 focus:ring-gray-200"
                >
                  <PlusOutlined className="mr-2" />
                  Thay đổi địa chỉ nhận hàng
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="card-info__order">
              <div className="title-info">Đơn hàng</div>
              <div>
                <div className="delivery-fee">
                  <span>Tạm tính:</span>{" "}
                  <span className="font-medium text-base">{formatPrice.format(totalPrice + calculatorPromotion())}</span>
                </div>
                <div className="delivery-fee">
                  <span className="font-medium">
                    {JSON.parse(localStorage.getItem(MARKET))?.attributes?.name}
                  </span>
                  <span className="font-medium">
                    Địa chỉ của bạn
                  </span>
                </div>
                <div>
                  <ol className="items-center flex mb-2">
                    <li className="relative mb-0">
                      <div className="flex items-center">
                        <div className="flex z-10 justify-center items-center shrink-0">
                          {/* <svg aria-hidden="true" class="w-5 h-5 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg> */}
                          <img src="../../../../icons8-delivery-48.png" alt="" className="w-8 h-8" />
                        </div>
                      </div>
                    </li>
                    <div className="flex w-full bg-gray-100 h-0.5 "></div>
                    <li className="relative mb-0">
                      <div className="flex items-center">
                        <div className="flex z-10 justify-center items-center  shrink-0">
                          {/* <svg aria-hidden="true" class="w-5 h-5 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg> */}
                          <img src="../../../../icons8-house-48.png" alt="" className="w-10 h-10" />
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
                <div className="delivery-fee">
                  <span>
                    Khoảng cách:<span className="font-medium"> {Number(routes?.distance / 1000).toFixed(1)} km</span>
                  </span>
                  <span>
                    Thời gian: <span className="font-medium">{CalculatorDuration(Number(routes?.duration))}</span>
                  </span>
                </div>
                <div className="delivery-fee">
                  <span >Phí vận chuyển:</span>{" "}
                  <span className="text-red-600">{formatPrice.format(DeliveryFee(Number(routes?.distance / 1000).toFixed(1), totalPrice))}</span>
                </div>
                <div className="delivery-fee">
                  <span>Khuyến mãi:</span>{" "}
                  <span className="text-red-600">- {formatPrice.format(calculatorPromotion())}</span>
                </div>
                <div className="total-price__order">
                  <span>Tổng tiền:</span>{" "}
                  <span style={{ color: "var(--color-price)" }}>
                    {formatPrice.format(totalPrice + DeliveryFee(Number(routes?.distance / 1000).toFixed(1), totalPrice))}
                  </span>
                </div>
              </div>
              {isLoadingBill ? (<button type="button" class="cursor-default inline-flex items-center justify-center h-12 w-full rounded-md p-2 px-10 font-medium mt-4 text-white text-md bg-yellow-400 " disabled>
                <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
                loading...
              </button>) : (<button className="bg-yellow-400 h-12 hover:bg-yellow-500">Đặt Mua</button>)}
            </form>
            <p className="text-xs mt-2 font-medium">* Đơn hàng từ 300k và khoảng cách dưới 10km miễn phí vận chuyển.</p>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default CheckoutCart;
