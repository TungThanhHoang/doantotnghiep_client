import React from "react";
function CheckOutItem({data:{ quantity , product:{ title , price, size ,picture:{ 0:{url}} }} , formatPrice}) {
    // console.log(data);
  return (
    <>
      <div className="card-product">
        <img className="bg-img" src={url} alt="" />
        <div className="info-product">
          <div className="title-product">{title}</div>
          <div>{`Sl: x${quantity}`}</div>
        </div>
        <div className="price-product">{formatPrice.format(price)}</div>
      </div>
    </>
  );
}

export default CheckOutItem;
