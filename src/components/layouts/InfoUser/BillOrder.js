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
      setStateBill("unconfirmed");
    }

    if (activeTabKey === "3") {
      setStateBill("confirmed");
    }

    if (activeTabKey === "4") {
      setStateBill("delivery");
    }

    if (activeTabKey === "5") {
      setStateBill("deliveried");
    }
    if (activeTabKey === "6") {
      setStateBill("canceled");
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
        <TabPane tab="Chưa Xác Nhận" key="2">
          {summaryBill.length
            ? summaryBill.map((item) => (
                <BillItem key={item.id} bill={item} formatPrice={formatPrice} />
              ))
            : emptyBill}
        </TabPane>
        <TabPane tab="Đã Xác Nhận" key="3">
          {summaryBill.length
            ? summaryBill.map((item) => (
                <BillItem key={item.id} bill={item} formatPrice={formatPrice} />
              ))
            : emptyBill}
        </TabPane>
        <TabPane tab="Đang Giao" key="4">
          {summaryBill.length
            ? summaryBill.map((item) => (
                <BillItem key={item.id} bill={item} formatPrice={formatPrice} />
              ))
            : emptyBill}
        </TabPane>
        <TabPane tab="Đã Giao" key="5">
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
