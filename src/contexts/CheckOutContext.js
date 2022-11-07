import React, { createContext, useState } from "react";
import axios from "axios";
import { API_URL, LOCAL_TOKEN_USER } from "./constants";
export const CheckOutContext = createContext();
const CheckOutContextProvider = ({ children }) => {
  const [payment, setPayment] = useState([]);
  const [bill, setBill] = useState([]);
  const [billItem, setBillItem] = useState([]);
  const [stateBill, setStateBill] = useState("");
  const [summaryBill, setSummaryBill] = useState([]);
  const getToken = localStorage.getItem(LOCAL_TOKEN_USER);
  const [isLoadingBill, setLoadingBill] = useState(false);

  const orderProducts = async (formProduct, ...attributes) => {
    setLoadingBill(true)
    try {
      const response = await axios.post(`${API_URL}/bills`, { data: formProduct, attributes }, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      if (response.data) {
        setPayment(response.data);
        setLoadingBill(false);
      }
      return response.data;
    } catch (error) {
      setLoadingBill(false);
      console.log(error);
    }
  };

  const checkoutByStripe = async (formProduct) => {
    setLoadingBill(true)
    try {
      const response = await axios.post(`${API_URL}/bills/stripe-payment`, formProduct, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      // if (response.data) {
      //   console.log(response.data)
      //   // window.location.href=response.data
      //   setLoadingBill(false);
      // }
      setLoadingBill(false);
      return response.data;
    } catch (error) {
      setLoadingBill(false);
      console.log(error);
    }
  };

  const confirmCheckOut = async (session_id) => {
    try {
      const response = await axios.post(`${API_URL}/bills/confirm`, session_id, {
        headers: {
          Authorization: `Bearer ${getToken}`
        }
      })
      return response.data
    } catch (error) {
      console.log(error);
    }
  }


  const loadBill = async () => {
    try {
      await axios
        .get(`${API_URL}/bills`, {
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
        .get(`${API_URL}/bills/${idBill}?populate[items][populate][product][populate][0]=picture&populate[payment_method]=payment_method`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => {
          setLoadingBill(false);
          setBillItem(res.data?.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadBillDeivery = async () => {
    try {
      await axios
        .get(`${API_URL}/bills?status=${stateBill}`, {
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
        `${API_URL}/bills/${idBillOrder}`,
        { "data": { status: "Đã hủy" } },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      if (response.data) {
        window.location.reload();
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
    checkoutByStripe,
    confirmCheckOut
  };
  return (
    <CheckOutContext.Provider value={contextData}>
      {children}
    </CheckOutContext.Provider>
  );
};

export default CheckOutContextProvider;
