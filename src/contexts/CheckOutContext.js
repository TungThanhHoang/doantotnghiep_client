import React, { createContext, useState } from "react";
import axios from "axios";
import { apiUrl, LOCAL_TOKEN_USER } from "./constants";
export const CheckOutContext = createContext();
const CheckOutContextProvider = ({ children }) => {
  const [payment, setPayment] = useState([]);
  const [bill, setBill] = useState([]);
  const [billItem, setBillItem] = useState([]);
  const [stateBill, setStateBill] = useState("");
  const [summaryBill, setSummaryBill] = useState([]);
  const getToken = localStorage.getItem(LOCAL_TOKEN_USER);
  const [isLoadingBill, setLoadingBill] = useState(false);
  const orderProducts = async (formProduct) => {
    try {
      const response = await axios.post(`${apiUrl}/bills`, formProduct, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      if (response.data) {
        setPayment(response.data);
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const loadBill = async () => {
    try {
      await axios
        .get(`${apiUrl}/bills?_sort=createdAt:DESC`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => setBill(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const loadItemBill = async (idBill) => {
    setLoadingBill(true);
    try {
      await axios
        .get(`${apiUrl}/bills/${idBill}`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => {
          setLoadingBill(false);
          setBillItem(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadBillDeivery = async () => {
    try {
      await axios
        .get(`${apiUrl}/bills?status=${stateBill}&_sort=createdAt:DESC`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => setSummaryBill(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  const updateBillStateCancel = async (idBillOrder) => {
    try {
      const response = await axios.put(
        `${apiUrl}/bills/${idBillOrder}`,
        { status: "canceled" },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      if (response.data) {
        loadBill();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const contextData = {
    bill,
    payment,
    summaryBill,
    billItem,
    isLoadingBill,
    stateBill,
    loadBill,
    setStateBill,
    orderProducts,
    loadItemBill,
    handleLoadBillDeivery,
    updateBillStateCancel,
  };
  return (
    <CheckOutContext.Provider value={contextData}>
      {children}
    </CheckOutContext.Provider>
  );
};

export default CheckOutContextProvider;
