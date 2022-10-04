import React, { useContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { Spin } from "antd";
import Navbar from "../layouts/Navbar/Navbar";
import { AuthContext } from "../../contexts/AuthContext";
import Notice from "../layouts/Notice";
import Header from "../layouts/Header/Header";
import Footer from "../../pages/Footer";

function ProtectRouter({ component: Component, ...rest }) {
  const [navbar] = useState(false);
  const {
    authState: { isLoading, isAuth, isConfirm },
  } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="spin-load">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth && isConfirm ? (
          <>
            <Notice />
            <Header />
            <Navbar />
            <Component {...rest} {...props} />
            <Footer />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
export default ProtectRouter;
