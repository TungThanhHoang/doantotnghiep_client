import React, { useContext } from "react";
import "./InfoUser.css";
import { NavLink, useLocation } from "react-router-dom";
import { Edit3 } from "react-feather";
import { Row, Col } from "antd";
import DetailUser from "../components/layouts/InfoUser/DetailUser";
import BillOrder from "../components/layouts/InfoUser/BillOrder";
import ChangePassword from "../components/layouts/InfoUser/ChangePassword";
import { AuthContext } from "../contexts/AuthContext";
import Notify from "../components/layouts/InfoUser/Notify";
import DetailBill from "../components/layouts/InfoUser/DetailBill/DetailBill";
import Voucher from "../components/layouts/InfoUser/Voucher";
function InfoUser({ userRouter }) {
  const { pathname } = useLocation()
  const {
    authState: {
      user: { firstName, lastName },
    },
  } = useContext(AuthContext);

  let renderComponent;
  renderComponent = (
    <>
      {userRouter === "infoRouter" && <DetailUser />}
      {userRouter === "billRouter" && <BillOrder />}
      {userRouter === "notifyRouter" && <Notify />}
      {userRouter === "voucherRouter" && <Voucher />}
      {userRouter === "changePasswordRouter" && <ChangePassword />}
      {userRouter === "detailBill" && <DetailBill />}
    </>
  );
  return (
    <div className="container">
      <Row className="">
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <div className="user-info__left">
            <div className="info-detail">
              <img
                src="https://assets.glxplay.io/static/avatars/Avatar%20Profile-12.png"
                alt=""
              />
              <div className="info-user">
                <div>
                  {lastName} {firstName}
                </div>
                <div>
                  <Edit3 size={18} />
                  <span>Sửa Hồ Sơ</span>
                </div>
              </div>
            </div>
            <div className="menu-user">
              <NavLink
                to="/user/info"
                className="user-info__item card-menu__item "
                activeClassName="active"
              >
                <box-icon color="#555" name='id-card'></box-icon>
                <span className="font-medium text-sm text-slate-700">Tài Khoản Của Tôi</span>
              </NavLink>
              <NavLink
                to="/user/bill"
                className={`card-menu__item user-info__item ${pathname.includes("detail-bill") && "active"}`}
                activeClassName="active"
              >
                <box-icon color="#555" name='shopping-bag'></box-icon>
                <span className="font-medium text-sm text-slate-700">Đơn Mua</span>
              </NavLink>
              <NavLink
                to="/user/notify"
                className="card-menu__item user-info__item"
                activeClassName="active active-text"
              >
                <box-icon color="#555" name='bell'></box-icon>
                <span className="font-medium text-sm text-slate-700"> Thông Báo</span>
              </NavLink>
              <NavLink
                to="/user/voucher"
                className="card-menu__item user-info__item"
                activeClassName="active active-text"
              >
                <box-icon color="#555" name='gift'></box-icon>
                <span className="font-medium text-sm text-slate-700"> Kho Voucher</span>
              </NavLink>
            </div>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={18}
          xl={18}
          style={{ marginBottom: "5rem" }}
        >
          <div className="user-info__right">{renderComponent}</div>
        </Col>
      </Row>
    </div>
  );
}

export default InfoUser;
