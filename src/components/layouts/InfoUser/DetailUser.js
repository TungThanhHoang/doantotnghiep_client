import React, { useState, useContext } from "react";
import { Row, Col, message } from "antd";
import "./DetailUser.css";
import SelectCountry from "../SelectCountry";
import { AuthContext } from "../../../contexts/AuthContext";
import DISTINCT_WARD from "../../../db/city.json"

function DetailUser() {
  const {
    authState: { user },
    updateUser, loading
  } = useContext(AuthContext);
  const [infoUser, setInfoUser] = useState(user);
  const { firstName, lastName, street, phone, id, email, distinct, ward } =
    infoUser;
  const [selectDistinct, setSelectDistinct] = useState(distinct);
  const [selectWard, setSelectWard] = useState(ward);

  const handleOnChange = (event) => {
    setInfoUser({
      ...infoUser,
      [event.target.name]: event.target.value,
      district: selectDistinct,
      ward: selectWard,
    });
  };
  // firstName, lastName, street, phone, id, email, distinct, ward
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (firstName === "" || lastName === "" || street === "" || phone === "" || email === "" || distinct === null || ward === null) {
      message.error("Không được để trống !");
      return;
    }
    try {
      const sendData = await updateUser(
        { ...infoUser, distinct: selectDistinct, ward: selectWard },
        id
      );
      if (sendData) {
        message.success("Cập nhật thành công !");
      } else {
        message.error("Không được để trống !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectDistinct = (e) => {
    setSelectWard(null);
    setSelectDistinct(e.target.value);
  };
  const handleSelectWard = (e) => {
    setSelectWard(e.target.value);
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
                      value={firstName}
                      name="firstName"
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
                      name="lastName"
                      value={lastName}
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
                      name="distinct"
                      options={DISTINCT_WARD.distinct}
                      onChangeSelectValue={handleSelectDistinct}
                      onChangeValue={handleOnChange}
                      value={selectDistinct}
                      title="Chọn Quận/Huyện"
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <div className="card-item">
                    <div className="title-input">Phường/Xã</div>
                    <SelectCountry
                      name="ward"
                      options={DISTINCT_WARD.ward?.filter(item => item.wardId === selectDistinct)}
                      onChangeSelectValue={handleSelectWard}
                      onChangeValue={handleOnChange}
                      value={selectWard}
                      title="Chọn Phường/Xã"
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
                      name="street"
                      value={street}
                      onChange={handleOnChange}
                    />
                  </div>
                </Col>
              </Row>
            </div>
            {loading ? <button type="button" className="inline-flex items-center justify-center rounded-md p-2 px-10 font-medium mt-4 text-white text-md bg-yellow-500 hover:bg-yellow-600 " disabled>
              <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>
              loading...
            </button> : <button className="inline-flex items-center justify-center rounded-md p-2 px-10 font-medium mt-4 text-white text-md bg-yellow-500 hover:bg-yellow-600 ">Lưu thay đổi</button>}
          </form>
        </Col>
        {/* <Col md={24} lg={8} xl={8}>
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
        </Col> */}
      </Row>
    </div>
  );
}

export default DetailUser;
