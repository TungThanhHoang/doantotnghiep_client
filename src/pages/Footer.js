import React from "react";
import BannerFooter from "../components/layouts/Footer/BannerFooter";
import CopyRight from "../components/layouts/Footer/CopyRight";
import InfoUs from "../components/layouts/Footer/InfoUs";
import MenuFooter from "../components/layouts/Footer/MenuFooter";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer-wrap">
      <BannerFooter />
      {/* <InfoUs /> */}
      <MenuFooter />
      <CopyRight />
    </div>
  );
}

export default Footer;
