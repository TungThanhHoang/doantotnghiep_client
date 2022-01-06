import React from "react";
import { apiUrl } from "../../../contexts/constants";

function CheckOutItem({data:{ quanlity , products:{ title , Price ,picture:{ 0:{url}} }} , formatPrice}) {
    // console.log(data);
  return (
    <>
      <div className="card-product">
        <img className="bg-img" src={url} alt="" />
        <div className="info-product">
          <div className="title-product">{title}</div>
          <div>{`Sl: x${quanlity}`}</div>
        </div>
        <div className="price-product">{formatPrice.format(Price)}</div>
      </div>
    </>
  );
}

export default CheckOutItem;
