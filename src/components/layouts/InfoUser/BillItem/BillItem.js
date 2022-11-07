import React from "react";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
export default function BillItem({
  bill: { id, total, createdAt, status, items, id_code, payment_status },
  formatPrice,
}) {
  const date = new Date(createdAt);
  const dateOrder = date.toLocaleString("en-Us");
  return (
    <Link to={{ pathname: `/user/detail-bill/${id}` }}>
      <div className="bill-item">
        <div className="state-bill">
          <div className="code-bill">#{id_code}</div>
          <div className="flex items-center">
            <div className="bg-red-300 px-4 py-1 rounded-full text-sm text-red-700 mr-2">
              {payment_status}
            </div>
            <div className="after:content-['|']"></div>
            <div className="state-delivery pl-2">
              {status}
            </div>
          </div>
        </div>

        {items?.map((item) => (
          <CartItem
            formatPrice={formatPrice}
            key={item.id}
            cart={item}
            status={status}
          />
        ))}
        <div className="bill-price">
          <div className="date-order">Đã đặt hàng vào lúc: {dateOrder}</div>
          <div className="total-price">
            Tổng số tiền: <span>{formatPrice.format(total)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
