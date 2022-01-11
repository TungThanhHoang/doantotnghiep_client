import React, { createContext, useState } from "react";
import axios from "axios";
import { API_URL, LOCAL_TOKEN_CART_ITEM, LOCAL_TOKEN_USER } from "./constants";
export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const getToken = localStorage.getItem(LOCAL_TOKEN_USER);

  const loadItemCart = async  () => {
    const token = await localStorage.getItem(LOCAL_TOKEN_USER);
    try {
      const response = await axios.get(`${API_URL}/items?_sort=createdAt:DESC`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        localStorage.setItem(
          LOCAL_TOKEN_CART_ITEM,
          JSON.stringify(response.data.filter((item) => item !== null))
        );
      }
      const item = localStorage.getItem(LOCAL_TOKEN_CART_ITEM);
      if (item) {
        const StoreItem = JSON.parse(item);
        setCartItem(StoreItem);
      }

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItemCart = async (itemId) => {
    try {
      await axios
        .delete(`${API_URL}/items/${itemId}`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => {
          if (res.data) {
            loadItemCart();
            console.log("Xoá Thành Công", res.data);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const addProductToCart = async (productId, quanlityId) => {
    const item = cartItem.find((idItem) => idItem.products.id === productId);
    try {
      setIsLoading(true);
      if (item) {
        const response = await axios.put(
          `${API_URL}/items/${item.id}`,
          {
            quanlity: parseInt(item.quanlity) + parseInt(quanlityId),
          },
          {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          }
        );
        if (response.data) {
          setIsLoading(false);
          loadItemCart();
          console.log(response.data);
        }
      } else {
        const response = await axios.post(
          `${API_URL}/items`,
          {
            products: productId,
            quanlity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          }
        );
        if (response.data) {
          setIsLoading(false);
          loadItemCart();
          console.log(response.data);
        }
      }
    } catch (error) {
      console.log(error.data);
    }
  };

  const increaseQuanlity = async (itemId, quanlity) => {
    try {
      if (quanlity < 10) {
        console.log("test", cartItem);
        setIsLoading(true);
        await axios
          .put(
            `${API_URL}/items/${itemId}`,
            {
              quanlity: parseInt(quanlity) + 1,
            },
            {
              headers: {
                Authorization: `Bearer ${getToken}`,
              },
            }
          )
          .then((res) => {
            if (res.data) {
              setIsLoading(false);
              loadItemCart();
              console.log("Tăng sản phẩm", cartItem.quanlity);
            }
          });
      } else {
        alert("Đã đạt tối đa số lượng!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const decreaseQuanlity = async (itemId, quanlity) => {
    try {
      if (quanlity > 1) {
        console.log("test", cartItem);
        await axios
          .put(
            `${API_URL}/items/${itemId}`,
            {
              quanlity: parseInt(quanlity) - 1,
            },
            {
              headers: {
                Authorization: `Bearer ${getToken}`,
              },
            }
          )
          .then((res) => {
            if (res.data) {
              loadItemCart();
              console.log("Tăng sản phẩm", cartItem.quanlity);
            }
          });
      } else {
        alert("Đã đạt tối thiểu số lượng!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dataContext = {
    isloading,
    cartItem,
    loadItemCart,
    decreaseQuanlity,
    increaseQuanlity,
    addProductToCart,
    deleteItemCart,
  };
  return (
    <CartContext.Provider value={dataContext}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
