import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import Login from "../components/layouts/Login/Login";
import Register from "../components/layouts/Register/Register";
import { AuthContext } from "../contexts/AuthContext";
import "./Auth.css";
import 'boxicons'
export default function Auth({ authRouter }) {
  const {
    authState: { isAuth, isConfirm },
  } = useContext(AuthContext);

  const [modalConfirm, setModalConfirm] = useState(false);

  let renderComponent;
  if (isAuth && isConfirm) return <Redirect to="/" />;
  else
    renderComponent = (
      <>
        {authRouter === "loginRouter" && <Login changeStateModal={setModalConfirm} />}
        {authRouter === "registerRouter" && <Register changeStateModal={setModalConfirm} />}
      </>
    );

  return (
    <div div className="container-auth">
      {modalConfirm && (
        <div className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-10 sm:items-center sm:justify-center appear-done enter-done">
          <div className="w-full h-3/5 px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-2xl appear-done enter-done">
            <div>
              <div>
                <div className="flex justify-between mb-5 mt-2">
                  <div className="capitalize font-bold text-slate-700 text-lg">
                    Xác minh tài khoản
                  </div>
                </div>
                <div className="flex justify-center flex-col mx-auto items-center">
                  <iframe title="confirm Mail" src="https://embed.lottiefiles.com/animation/71647" className="w-56 h-56 "></iframe>
                  <p className="font-medium text-sm text-gray-900">Chúng tôi đã gửi đến hộp thư của bạn. Vui lòng mở hộp thư của bạn và xác minh nó!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="svg-auth">
        <div className="navbar-auth shadow-md">
          <div className="container">
            <div className="navbar-item">
              <div className="logo-brand">
                <img src="../../logo.png" alt="" />
              </div>
              <span className="navbar-title">
                {authRouter === "loginRouter" ? "Đăng Nhập" : "Đăng Ký"}
              </span>
            </div>
          </div>
        </div>
        {renderComponent}
      </div>
    </div>

  );
}
