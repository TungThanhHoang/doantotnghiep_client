import React, { useContext, useState, useEffect } from "react";
import "./BillUser.css";
import BillItem from "../../layouts/InfoUser/BillItem/BillItem";
import { Tabs } from "antd";
import { CheckOutContext } from "../../../contexts/CheckOutContext";
import { ProductContext } from "../../../contexts/ProductContext";
const { TabPane } = Tabs;
export default function BillOrder() {
  const {
    bill,
    summaryBill,
    setStateBill,
    stateBill,
    loadBill,
    handleLoadBillDeivery,
  } = useContext(CheckOutContext);
  const { formatPrice } = useContext(ProductContext);
  const [activeTabKey, setActiveTabKey] = useState("1");
  let emptyBill = (
    <div
      className="bg-img empty-bill"
      style={{ backgroundImage: 'url("../../../no-bill.png")' }}
    ></div>
  );
  const changeTab = (activeKey) => {
    setActiveTabKey(activeKey);
  };
  useEffect(() => {
    loadBill();
  }, []);

  useEffect(() => {
    handleLoadBillDeivery();
  }, [stateBill]);
  
  useEffect(() => {
    if (activeTabKey === "1") {
    }

    if (activeTabKey === "2") {
      setStateBill("Chờ xác nhận");
    }

    if (activeTabKey === "3") {
      setStateBill("Chờ lấy hàng");
    }

    if (activeTabKey === "4") {
      setStateBill("Đang giao hàng");
    }

    if (activeTabKey === "5") {
      setStateBill("Đã giao hàng");
    }
    if (activeTabKey === "6") {
      setStateBill("Đã hủy");
    }
  }, [activeTabKey]);

  return (
    <div className="bill-order">
      <Tabs
        defaultActiveKey="1"
        size="large"
        type="line"
        activeKey={activeTabKey}
        onChange={changeTab}
      >
        <TabPane tab="Tất Cả" key="1">
          {bill.length
            ? bill.map((item) => (
                <BillItem key={item.id} bill={item} formatPrice={formatPrice} />
              ))
            : emptyBill}
        </TabPane>
        <TabPane tab="Chờ Xác Nhận" key="2">
          {summaryBill.length
            ? summaryBill.map((item) => (
                <BillItem key={item.id} bill={item} formatPrice={formatPrice} />
              ))
            : emptyBill}
        </TabPane>
        <TabPane tab="Chờ lấy hàng" key="3">
          {summaryBill.length
            ? summaryBill.map((item) => (
                <BillItem key={item.id} bill={item} formatPrice={formatPrice} />
              ))
            : emptyBill}
        </TabPane>
        <TabPane tab="Đang giao hàng" key="4">
          {summaryBill.length
            ? summaryBill.map((item) => (
                <BillItem key={item.id} bill={item} formatPrice={formatPrice} />
              ))
            : emptyBill}
        </TabPane>
        <TabPane tab="Đã giao hàng" key="5">
          {summaryBill.length
            ? summaryBill.map((item) => (
                <BillItem key={item.id} bill={item} formatPrice={formatPrice} />
              ))
            : emptyBill}
        </TabPane>
        <TabPane tab="Đã Hủy" key="6">
          {summaryBill.length
            ? summaryBill.map((item) => (
                <BillItem key={item.id} bill={item} formatPrice={formatPrice} />
              ))
            : emptyBill}
        </TabPane>
      </Tabs>
    </div>
  );
}
