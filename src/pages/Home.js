import React from "react";
import Banner from "../components/layouts/Banner/Banner";
import Category from "../components/layouts/Categories/Category";
import NewProducts from "../components/layouts/NewProducts/NewProducts";
import Poster from "../components/layouts/Poster/Poster";
import ProductHome from "../components/layouts/Products/ProductHome";
function Home() {
  return (
    <div>
      <div className="container">
        <Poster />
        <Category />
        <Banner />
        <NewProducts />
        <ProductHome />
      </div>
    </div>
  );
}

export default Home;
