import "antd/dist/antd.css";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import ProtectRouter from "./components/routing/ProtectRouter";
import OrderSuccess from "./pages/OrderSuccess";
import InfoUser from "./pages/InfoUser";
import Product from "./pages/Product";
import Category from "./pages/Category";
import ScrollOnTop from "./components/layouts/ScrollOnTop";
import { ToastContainer } from 'react-toastify';
import OrderFaill from "./pages/OrderFaill";
function App() {
  const history = useHistory();
  return (
    <div className="App">
      <ToastContainer />
      <Router history={history}>
        <ScrollOnTop />
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => <Auth {...props} authRouter="loginRouter" />}
          />
          <Route
            exact
            path="/register"
            render={(props) => (
              <Auth {...props} authRouter="registerRouter" />
            )}
          />
          <ProtectRouter exact path="/" component={Home} />
          <ProtectRouter exact path="/product/:id" component={Product} />
          <ProtectRouter
            exact
            path="/categories/:slug/:id"
            component={Category}
          />
          <ProtectRouter exact path="/cart" component={Cart} />
          <ProtectRouter exact path="/checkout" component={Checkout} />
          <ProtectRouter
            exact
            path="/order-success"
            component={OrderSuccess}
          />
          <ProtectRouter
            exact
            path="/order-cancel"
            component={OrderFaill}
          />
          <ProtectRouter
            exact
            path="/user/info"
            component={InfoUser}
            userRouter="infoRouter"
          />
          <ProtectRouter
            exact
            path="/user/bill"
            component={InfoUser}
            userRouter="billRouter"
          />
          <ProtectRouter
            exact
            path="/user/notify"
            component={InfoUser}
            userRouter="notifyRouter"
          />
          <ProtectRouter
            exact
            path="/user/voucher"
            component={InfoUser}
            userRouter="voucherRouter"
          />
          <ProtectRouter
            exact
            path="/user/change-password"
            component={InfoUser}
            userRouter="changePasswordRouter"
          />
          <ProtectRouter
            exact
            path="/user/detail-bill/:id"
            component={InfoUser}
            userRouter="detailBill"
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
