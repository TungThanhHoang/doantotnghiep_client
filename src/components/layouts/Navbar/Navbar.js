import "./Navbar.css";
import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ShoppingCartOutlined, MenuOutlined } from "@ant-design/icons";
import {
  LogOut,
  Search,
  User,
  MapPin,
  Home,
  X,
  Lock,
  Layout,
  ShoppingCart,
  Gift,
} from "react-feather";
import { Badge, Dropdown, Menu } from "antd";
import Lottie from "react-lottie";
import loadingSvg from '../../../assets/loadingMarket.json'
import CartItem from "../CartItem";
import { AuthContext } from "../../../contexts/AuthContext";
import { ProductContext } from "../../../contexts/ProductContext";
import { CartContext } from "../../../contexts/CartContext";
import CardSearch from "../CardSearch/CardSearch";
import CardSearchMobile from "../CardSearch/CardSearchMobile";
import { LATITUDE, LOCAL_TOKEN_NAV, LONGITUDE, MARKET } from "../../../contexts/constants";

import navSlice, { getMarketLocation, getDistance } from "./navSlice";
import { useDispatch, useSelector } from "react-redux";
import { getMarketSelector, getMarkerSelector, selectMarketSelector } from '../../../redux/selector';

const DEFAULT_OPTIONS = {
  loop: true,
  autoplay: true,
  animationData: loadingSvg,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const {
    authState: {
      user: { firstName, ward, district },
    },
    logoutUser,
  } = useContext(AuthContext);

  const market = useSelector(getMarketSelector);
  const marker = useSelector(getMarkerSelector);
  const valueMarket = useSelector(selectMarketSelector);

  const { cartItem, deleteItemCart, loadItemCart } = useContext(CartContext);
  const { formatPrice } = useContext(ProductContext);
  const [SearchState, setSearchState] = useState(false);
  const [MenuState, setMenuState] = useState(false);
  const [navbarMobile, setNavbarMobile] = useState("home");
  const [isLoadingDistance, setIsLoadingDistance] = useState(false);

  const handleOnChangeMarket = (e) => {
    dispatch(navSlice.actions.onChangeMarket(e.target.value));
    // const findItem = market?.find(item => item.id === JSON.parse(localStorage.getItem(MARKET)).id);
    // setCoordinates({ lng: findItem?.attributes?.longitude, lat: findItem?.attributes?.latitude })
  }

  useEffect(() => {
    dispatch(getMarketLocation());
    loadItemCart();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setIsLoadingDistance(true)
    const market = async () => {
      await dispatch(getDistance(`${localStorage.getItem(LONGITUDE)},${localStorage.getItem(LATITUDE)};${JSON.parse(localStorage.getItem(MARKET))?.attributes.longitude},${JSON.parse(localStorage.getItem(MARKET))?.attributes.latitude}`));
    }
    market();
    setIsLoadingDistance(false);
    // eslint-disable-next-line
  }, [valueMarket])

  useEffect(() => {
    setNavbarMobile(localStorage.getItem(LOCAL_TOKEN_NAV));
  });

  const handleLogout = () => {
    logoutUser();
    window.location.reload();
  };

  const handleNavigation = (a) => {
    localStorage.setItem(LOCAL_TOKEN_NAV, a);
    setNavbarMobile(navbarMobile);
    if (a === "home") {
      const local = {
        pathname: "/",
      };
      history.push(local);
    } else {
      history.push({ pathname: "/user/info" });
    }
  };

  const renderCartItems = (
    <div className="cart">
      <h4 className="title">Sản phẩm vừa thêm</h4>
      <div className="padding-1">
        {cartItem.length ? (
          cartItem?.slice(0, 3).map((item) => {
            return (
              <CartItem
                itemcart={item}
                key={item.id}
                formatPrice={formatPrice}
                deleteItemCart={deleteItemCart}
              />
            );
          })
        ) : (
          <div className="cart-empty">
            <img alt="" src="../../../empty-cart.png" />
            <span>Giỏ hàng trống</span>
          </div>
        )}
      </div>
      {cartItem.length ? (
        <div className="cart-item__hidden">Tổng {cartItem.length} Sản phẩm</div>
      ) : (
        ""
      )}
      <Link to="/cart" className="cart-view bg-yellow-400 text-white hover:bg-yellow-500 hover:text-white">
        Xem Giỏ Hàng
      </Link>
    </div>
  );
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>
          <Link to="/user/info">Thông tin cá nhân</Link>
        </span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>
          <Link to="/user/notify">Thông báo</Link>
        </span>
      </Menu.Item>
      <Menu.Item key="3">
        <span>
          <Link to="/user/bill">Đơn hàng</Link>
        </span>
      </Menu.Item>
      <Menu.Item key="4">
        <span>
          <button className="btn-logout" onClick={() => handleLogout()}>
            <LogOut size={20} className="icon-logout" /> Thoát
          </button>
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <nav>
        {!localStorage.getItem(MARKET) && <div className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-75 mb-14 sm:mb-0  sm:items-start sm:justify-center appear-done enter-done">
          <div className="w-full  px-6 py-4 overflow-hidden bg-white rounded-t-lg sm:rounded-lg sm:m-4 sm:max-w-3xl appear-done enter-done">
            <div>
              <div>
                <div className="flex justify-between mb-5 mt-2">
                  <div className="capitalize font-bold text-slate-700 text-lg">
                    Chọn siêu thị
                  </div>
                </div>
                <div className="flex justify-center flex-col mx-auto items-center pb-4">
                  <select onChange={handleOnChangeMarket} id="countries" className=" cursor-pointer block py-4 px-4 w-full text-md font-bold text-slate-800 bg-gray-50 rounded-md  focus:outline-none focus:ring-0 focus:border-gray-200 peer ">
                    <option value="">Chọn siêu thị</option>
                    {market?.map((item) => <option key={item.id} value={item.id}>{item.attributes.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>}
        <div className="container">
          <div className="navbar">
            <div onClick={() => setMenuState(!MenuState)} className="icon-menu">
              <MenuOutlined
                style={{ color: "var(--color-footer)", fontSize: 20 }}
              />
            </div>
            <div className="logo-brand">
              <Link to="/">
                <img src="../../../logo.png" alt="" />
              </Link>
            </div>
            <div className="location">
              <div className="ward-location">
                <span className="font-medium text-xs ml-1 text-gray-500">Siêu thị</span>
                <select disabled={location.pathname === "/checkout"} value={JSON.parse(localStorage.getItem(MARKET))?.id} onChange={handleOnChangeMarket} id="countries" className=" mt-1 cursor-pointer block pr-6 w-full text-md font-bold text-slate-800 focus:outline-none focus:ring-0 focus:border-gray-200 peer ">
                  {market?.map((item) => <option key={item.id} value={item.id}>{item.attributes.name}</option>)}
                </select>
              </div>
              {isLoadingDistance ? <Lottie options={DEFAULT_OPTIONS} height={80} width={80} /> :
                (<div className="ml-2">
                  <span className="text-xs font-medium ml-4 text-gray-500">Vị trí của bạn</span>
                  <div className="ml-4 mt-1 text-slate-800 font-medium text-sm transition ease-in-out duration-300">{(marker[0]?.distance / 1000).toFixed(1)}km</div>
                </div>
                )
              }
            </div>

            <CardSearch />
            <div className="navbar-user">
              <div className="nav-name__user">Xin chào, {firstName}</div>
              <Dropdown overlay={menu} placement="bottomRight" arrow>
                <div>
                  <div className="nav-background__user">
                    <User className="nav-icon__user" />
                  </div>
                  <div></div>
                </div>
              </Dropdown>
            </div>
            <div className="navbar-cart">
              <Dropdown overlay={renderCartItems} placement="bottomRight" arrow>
                <Badge status="warning" count={cartItem?.length}>
                  {/* <box-icon size="sm" name='shopping-bag'></box-icon> */}
                  <ShoppingCartOutlined className="text-3xl" />
                </Badge>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>

      {MenuState ? (
        <div className="menubar">
          <div className="menubar-top">
            <div className="logo-brand">
              <Link to="/">
                <img src="../../../logo.png" alt="" />
              </Link>
            </div>
            <div onClick={() => setMenuState(!MenuState)}>
              <X size={30} style={{ color: "var(--color-gray)" }} />
            </div>
          </div>
          <div className="location-user">
            <div className="title-location">
              <MapPin
                style={{ color: "orange ", marginRight: 10 }}
                size={18}
              />
              <div style={{ fontWeight: "500", fontSize: 10 }}>
                Địa điểm
              </div>
            </div>
            <div className="ward-location">
              <div>
                {ward}, {district}, TP Đà Nẵng
              </div>
            </div>
          </div>
          <div className="name-user">
            <div>Xin chào</div>
            <div style={{ fontWeight: "500" }}>, Hoàng Mai</div>
          </div>
          <button onClick={() => handleLogout()}>
            <LogOut style={{ margin: "0 1rem" }} />
            <div className="title-exit">Thoát</div>
          </button>
        </div>
      ) : (
        ""
      )}
      {SearchState ? <CardSearchMobile setSearchState={setSearchState} /> : ""}
      {/* Menu bottom home */}
      {/* menu bottom account */}

      {navbarMobile === "account" ? (
        <div className="navbar-mobile__account">
          <div onClick={() => handleNavigation("home")} className="navbar-item">
            <Home size={19} className="color-menu" />
            <div className="color-menu">Home</div>
          </div>
          <Link to="/user/info" className="navbar-item">
            <User size={19} className="color-menu" />
            <div className="color-menu">Tài khoản</div>
          </Link>
          <Link to="/user/bill" className="navbar-item">
            <Layout size={19} className="color-menu" />
            <div className="color-menu">Đơn hàng</div>
          </Link>
          <Link to="/user/change-password" className="navbar-item">
            <Lock size={19} className="color-menu" />
            <div className="color-menu">Mật khẩu</div>
          </Link>
          <Link to="/user/voucher" className="navbar-item">
            <Gift size={19} className="color-menu" />
            <div className="color-menu">Voucher</div>
          </Link>
        </div>
      ) : (
        <div className="navbar-mobile">
          <Link to="/" className="navbar-item">
            <Home size={19} className="color-menu" />
            <div className="color-menu">Home</div>
          </Link>
          <div
            className="navbar-item"
            onClick={() => setSearchState(!SearchState)}
          >
            <Search size={19} className="color-menu" />{" "}
            <div className="color-menu">Tìm kiếm</div>
          </div>
          <Link to="/cart" className="navbar-item">
            <ShoppingCart size={19} className="color-menu" />
            <div className="color-menu">Giỏ hàng</div>
          </Link>
          <div
            onClick={() => handleNavigation("account")}
            className="navbar-item"
          >
            <User size={19} className="color-menu" />
            <div className="color-menu">Tài khoản</div>
          </div>
        </div>
      )}
    </>
  );
}
