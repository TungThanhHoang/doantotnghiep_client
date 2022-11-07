import React from 'react'
import FormatDate from './FormatDate'

export default function CheckStatusOrder(status) {
    return (
        <>
            {status === "Đã hủy" || status === "Chờ xác nhận" ? <div
                style={{
                    color: "var(--color-font-two)",
                    fontWeight: "500",
                }}
            >
                Đơn hàng chưa vận chuyển
            </div> : status === "Chờ lấy hàng" ? <div
                style={{
                    color: "var(--color-font-two)",
                    fontWeight: "500",
                }}
            >
                Đơn hàng đã được xác nhận
            </div> : <div>
                <div>
                    Giao hàng bởi nhân viên{" "}
                    <span style={{ color: "var(--color-font-two)", fontWeight: 500 }}>
                        Shopping market
                    </span>
                </div>
                {status === "deliveried" ? (
                    <div>
                        <span style={{ marginRight: "5px" }}>
                            Đã giao hàng:
                        </span>
                        <span className="date-delivery">
                            {/* {FormatDate(updatedAt)} */}
                        </span>
                    </div>
                ) : (
                    ""
                )}
                <div>
                    <span>Phí vận chuyển:</span>
                    <span className="address-delivery">15.000đ</span>
                </div>
            </div>

            }
        </>
    )
}
