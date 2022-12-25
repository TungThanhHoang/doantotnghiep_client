import React, { useContext, useEffect, useState } from "react";
import "./NotifyOrder.css";
import Lottie from "react-lottie";
import { Link, useLocation } from "react-router-dom";
import loading from '../../../assets/order-cancel.json'
import { CheckOutContext } from "../../../contexts/CheckOutContext";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: loading,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function NotifyOrderFaill() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location?.search);

  const { confirmCheckOut } = useContext(CheckOutContext);

  const [order, setOrder] = useState(location?.state?.code);


  // useEffect(() => {
  //   if (!searchParams.get('session_id')) {
  //     return null;
  //   }
  //   const confirmByCheckOut = async () => {
  //     const result = await confirmCheckOut({ "checkout_session": searchParams.get('session_id') })
  //     setOrder(result.id_code)
  //   }
  //   confirmByCheckOut()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <div className="notify-success">
      <div className="my-16">
        <Lottie options={defaultOptions} height={150} width={150} />
      </div>
      <div className="title-success mt-10">Đơn hàng chưa được thanh toán</div>
      {/* <div>
        <span className="text-slate-500">Mã đơn hàng:</span><span className="ml-2 text-red-600">#{order}</span>
      </div> */}
      <div className="flex items-center mt-6 space-x-4">
        <button className="border hover:bg-yellow-400 border-yellow-300 bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-8 py-3 text-center inline-flex items-center mr-2 mb-2">
          <Link className="text-slate-800" to="/user/bill"> Chi tiết đơn hàng</Link>
        </button>
        <button className="hover:text-white border border-gray-400 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-8 py-3 text-center mr-2 mb-2 ">
          <Link className="text-slate-800 hover:text-slate-800" to="/"> Trở về trang chủ</Link>
        </button>
      </div>
    </div>
  );
}

export default NotifyOrderFaill;
