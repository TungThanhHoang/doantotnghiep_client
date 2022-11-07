import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewProducts.css";
import React, { useContext, useEffect } from "react";
import { ArrowRight } from "react-feather";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { ProductContext } from "../../../contexts/ProductContext";
import ProductItem from "./ProductItem";

function NewProducts() {
  const {
    productState: { newProducts },
    formatPrice,
    loadNewProduct,
  } = useContext(ProductContext);
  useEffect(() => {
    loadNewProduct();
  }, []);


  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
  return (
    <div className="card-new__main relative">
      <div className="card-header">
        <div className="card-new__title"> Sản Phẩm khuyến mãi</div>
        <Link to="">
          <div className="view-all__product">
            <span> Xem Tất Cả</span> <ArrowRight size={20} />
          </div>
        </Link>
      </div>
      <Slider {...settings}>
        {newProducts?.map((item) => {
          return (
            <ProductItem
              key={item.id}
              product={item}
              formatPrice={formatPrice}
            />
          );
        })}
      </Slider>
    </div>
  );
}

export default NewProducts;
