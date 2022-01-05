import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Login from "../components/layouts/Login/Login";
import Register from "../components/layouts/Register/Register";
import { AuthContext } from "../contexts/AuthContext";
import "./Auth.css";
export default function Auth({ authRouter }) {
  const {
    authState: {isAuth },
  } = useContext(AuthContext);
  let renderComponent;
  if (isAuth) return <Redirect to="/" />;
  else
    renderComponent = (
      <>
        {authRouter === "loginRouter" && <Login />}
        {authRouter === "registerRouter" && <Register />}
      </>
    );

  return (
    <div div className="container-auth">
      <div className="svg-auth">
        <div className="navbar-auth">
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
