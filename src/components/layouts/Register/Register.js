import React, { useState, useContext } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import SelectCountry from "../SelectCountry";
import { AuthContext } from "../../../contexts/AuthContext";
import country from "../../../db/ward.json" 
import AlertAuth from "../AlertAuth";
import "./Register.css";


export default function Register() {
  const [selectCountryId, setSelectCountries] = useState(null);
  const [selectStateId, setSelectState] = useState(null);
  const [registerForm, setRegisterForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    address: "",
  });
  const [Alert, setAlert] = useState(null);
  const { registerUser } = useContext(AuthContext);

  const {
    firstname,
    lastname,
    email,
    phone,
    password,
    confirmpassword,
    address,
  } = registerUser;

  const handleOnChange = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value, district:selectCountryId , ward:selectStateId
    });
  };
  const handleSelectCoutry = (value) => {
    setSelectState(null);
    setSelectCountries(value);
  };
  const handleSelectState = (value) => {
    setSelectState(value);
  };
  const handleRegisterForm = async (event) => {
    event.preventDefault();
    if (firstname === "") {
      setAlert({
        type: "warning",
        message: "Hãy nhập Email hoặc Mật khẩu!",
      });
        setTimeout(() => {
        setAlert(null);
      }, 4000);
      return null;
    }
    try {
      const sendData = await registerUser(registerForm);
      console.log(sendData);
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
        <Row justify="center">
          <form className="form-login" onSubmit={handleRegisterForm}>
            <h1>Đăng Ký</h1>
            <AlertAuth info={Alert} />
            <Row>
              <Col>
                <div className="form-field">
                  <input
                    type="text"
                    className="form-input"
                    placeholder=" "
                    name="firstname"
                    value={firstname}
                    onChange={handleOnChange}
                  />
                  <label className="form-label">Tên</label>
                </div>
              </Col>
              <Col>
                <div className="form-field">
                  <input
                    type="text"
                    className="form-input"
                    placeholder=" "
                    name="lastname"
                    value={lastname}
                    onChange={handleOnChange}
                  />
                  <label className="form-label">Họ</label>
                </div>
              </Col>
            </Row>
            <div className="form-field">
              <input
                type="text"
                className="form-input"
                placeholder=" "
                name="email"
                value={email}
                onChange={handleOnChange}
              />
              <label className="form-label">Email</label>
            </div>
            <div className="form-field">
              <input
                type="text"
                className="form-input"
                placeholder=" "
                name="phone"
                value={phone}
                onChange={handleOnChange}
              />
              <label className="form-label">Số điện thoại</label>
            </div>
            <div className="form-field">
              <input
                type="password"
                className="form-input"
                placeholder=" "
                name="password"
                value={password}
                onChange={handleOnChange}
              />
              <label className="form-label">Mật khẩu</label>
            </div>
            <div className="form-field">
              <input
                type="password"
                className="form-input"
                placeholder=" "
                name="confirmpassword"
                value={confirmpassword}
                onChange={handleOnChange}
              />
              <label className="form-label">Xác nhận mật khẩu</label>
            </div>
            <Row>
              <SelectCountry
                name="district"
                options={country.countries}
                value={selectCountryId}
                onChange={handleSelectCoutry}
                title="Chọn Quận/Huyện"
                handleSelectChange={handleSelectCoutry}
              />
              <SelectCountry
                name="ward"
                options={country.ward.filter(
                  (state) => state.countryId === selectCountryId
                )}
                value={selectStateId}
                onChange={handleSelectState}
                title="Chọn Phường/Xã"
                handleSelectChange={handleSelectState}
              />
            </Row>
            <div className="form-field">
              <input
                type="text"
                className="form-input"
                placeholder=" "
                name="address"
                value={address}
                onChange={handleOnChange}
              />
              <label className="form-label">Địa chỉ</label>
            </div>
            <button className="btn-login">Đăng Ký</button>
            <div className="navigation-register">
              Bạn đã có tài khoản ?
              <span>
                <Link to="/login">Đăng Nhập</Link>
              </span>
            </div>
          </form>
        </Row>
      </div>
    </div>
  );
}
