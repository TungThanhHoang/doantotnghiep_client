import React, { useState, useContext } from "react";
import { Row, Col, message } from "antd";
import "./DetailUser.css";
import country from "../../../db/ward.json";
import SelectCountry from "../SelectCountry";
import { AuthContext } from "../../../contexts/AuthContext";
import { LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
function DetailUser() {
  const {
    authState: { user },
    updateUser,
  } = useContext(AuthContext);
  const [infoUser, setInfoUser] = useState(user);
  const { firstname, lastname, address, phone, id, email, district, ward } =
    infoUser;
  const [selectCountryId, setSelectCountries] = useState(district);
  const [selectStateId, setSelectState] = useState(ward);

  const handleOnChange = (event) => {
    setInfoUser({
      ...infoUser,
      [event.target.name]: event.target.value,
      district: selectCountryId,
      ward: selectStateId,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const sendData = await updateUser(
        { ...infoUser, district: selectCountryId, ward: selectStateId },
        id
      );
      if (sendData) {
        message.success("Cập nhật thành công !");
        // console.log(sendData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCoutry = (value) => {
    setSelectState(null);
    setSelectCountries(value);
  };
  const handleSelectState = (value) => {
    setSelectState(value);
  };

  return (
    <div className="main-user">
      <div className="title-top">
        <h2 className="title-name">Hồ Sơ Của Tôi</h2>
      </div>
      <Row className="main-wrap">
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <form className="detail-user" onSubmit={handleSubmit}>
            <h4 className="sub-title">Quản lý thông tin hồ sơ</h4>
            <div className="wrap-detail">
              <Row className="name-user">
                <Col xs={24} md={12} lg={12} xl={12}>
                  <div className="card-item">
                    <label className="title-input">Tên</label>
                    <input
                      className="input-field"
                      type="text"
                      value={firstname}
                      name="firstname"
                      onChange={handleOnChange}
                    />
                  </div>
                </Col>
                <Col xs={24} md={12} lg={12} xl={12}>
                  <div className="card-item">
                    <label className="title-input">Họ</label>
                    <input
                      className="input-field"
                      type="text"
                      name="lastname"
                      value={lastname}
                      onChange={handleOnChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="name-user">
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div className="card-item">
                    <label className="title-input">Email</label>
                    <input
                      className="input-field"
                      value={email}
                      disabled
                      type="text"
                      name="email"
                    />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div className="card-item">
                    <label className="title-input">Phone</label>
                    <input
                      className="input-field"
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={handleOnChange}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="address-user">
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <div className="card-item">
                    <div className="title-input">Quận/Huyện</div>
                    <SelectCountry
                      name="district"
                      options={country.countries}
                      value={selectCountryId}
                      onChange={handleSelectCoutry}
                      handleSelectChange={handleSelectCoutry}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <div className="card-item">
                    <div className="title-input">Phường/Xã</div>
                    <SelectCountry
                      name="ward"
                      options={country.ward.filter(
                        (state) => state.countryId === selectCountryId
                      )}
                      value={selectStateId}
                      onChange={handleSelectState}
                      handleSelectChange={handleSelectState}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="">
                <Col span={24}>
                  <div className="card-item">
                    <div className="title-input">Số nhà</div>
                    <input
                      className="input-field"
                      type="text"
                      name="address"
                      value={address}
                      onChange={handleOnChange}
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <button className="btn-save">Lưu thay đổi</button>
          </form>
        </Col>
        <Col md={24} lg={8} xl={8}>
          <div className="update-password">
            <div>
              <h4 className="sub-title">Thay đổi mật khẩu</h4>
            </div>
            <Link to={{pathname:`/user/change-password`}} className="password-wrap">
              <LockOutlined className="icon-password" />{" "}
              <span>Cập nhật mật khẩu</span>
              <button>Cập nhật</button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DetailUser;
