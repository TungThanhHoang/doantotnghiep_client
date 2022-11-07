import React, { useContext, useEffect } from "react";
import Banner from "../components/layouts/Banner/Banner";
import Category from "../components/layouts/Categories/Category";
import NewProducts from "../components/layouts/NewProducts/NewProducts";
import Poster from "../components/layouts/Poster/Poster";
import ProductHome from "../components/layouts/Products/ProductHome";
import { ProductContext } from "../contexts/ProductContext";
function Home() {
  const {
    productState: { products, productFruits, productSeaFoods },
    loadProduct,
    getProductByFruitCategory,
    getProductBySeaFoodCategory,
    formatPrice,
  } = useContext(ProductContext);

  useEffect(() => {
    loadProduct();
    getProductByFruitCategory();
    getProductBySeaFoodCategory()
  }, []);

  return (
    <div>
      <div className="container">
        <Poster />
        <Category />
        <Banner />
        <NewProducts />
        <ProductHome title="Trái cây" product={productFruits} formatPrice={formatPrice} />
        <ProductHome title="Hải sản" product={productSeaFoods} formatPrice={formatPrice} />
        <ProductHome title="Các loại sản phẩm" product={products} formatPrice={formatPrice} />
      </div>
    </div>
  );
}

export default Home;
