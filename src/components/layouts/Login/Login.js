import React, { useContext, useState } from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../../../contexts/AuthContext";
import AlertAuth from "../AlertAuth";

export default function Login() {
  const { loginUser, loading } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({
    identifier: "",
    password: "",
  });
  const [Alert, setAlert] = useState(null);
  const { identifier, password } = loginForm;
  const handleOnChange = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };
  const handleLoginForm = async (event) => {
    event.preventDefault();
    if (identifier === "" || password === "") {
      setAlert({
        type: "warning",
        message: "Hãy nhập Email hoặc Mật khẩu!",
      });
      return setTimeout(() => {
        setAlert(null);
      }, 4000);
    }
    try {
      const sendData = await loginUser(loginForm);
      // console.log(sendData);
      if (sendData.error === "Bad Request") {
        setAlert({
          type: "error",
          message: "Email hoặc Mật khẩu không đúng!",
        });
        setTimeout(() => {
          setAlert(null);
        }, 4000);
      }
      if (sendData.error === "Forbidden") {
        setAlert({ type: "error", message: "Không thể truy cập !" });
        setTimeout(() => {
          setAlert(null);
        }, 4000);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container-login">
      <div className="svg-login">
        <Row justify="center" align="middle">
          <Col lg={6} md={8} sm={12} xs={24}>
            <form className="form-login" onSubmit={handleLoginForm}>
              <h1>Đăng Nhập</h1>
              <AlertAuth info={Alert} />
              <div className="form-field">
                <input
                  type="text"
                  className="form-input"
                  placeholder=" "
                  name="identifier"
                  onChange={handleOnChange}
                  value={identifier}
                />
                <label className="form-label">Email</label>
              </div>
              <div className="form-field">
                <input
                  type="password"
                  className="form-input"
                  placeholder=" "
                  name="password"
                  onChange={handleOnChange}
                  value={password}
                />
                <label className="form-label">Mật Khẩu</label>
              </div>
              {!loading ? (
                <button className="btn-login">Đăng Nhập</button>
              ) : (
                <Button loading className="btn-login">
                  Đăng Nhập
                </Button>
              )}
              <div className="navigation-register">
                Bạn chưa có tài khoản ?
                <span>
                  <Link to="/register">Đăng Ký</Link>
                </span>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
}
