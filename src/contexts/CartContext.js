import React, { createContext, useState } from "react";
import axios from "axios";
import { API_URL, LOCAL_TOKEN_USER } from "./constants";
export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const getToken = localStorage.getItem(LOCAL_TOKEN_USER);

  const loadItemCart = async () => {
    const token = await localStorage.getItem(LOCAL_TOKEN_USER);
    try {
      const response = await axios.get(`${API_URL}/items?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setCartItem(response.data);
        return null;
      }
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
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const addProductToCart = async (productId, quantityId) => {
    const item = cartItem?.find((idItem) => idItem.product.id === productId);
    try {
      setIsLoading(true);
      if (item) {
        const response = await axios.put(
          `${API_URL}/items/${item.id}`,
          {
            data: {
              quantity: parseInt(item.quantity) + parseInt(quantityId)
            }
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
        }
      } else {
        const response = await axios.post(
          `${API_URL}/items`,
          {
            data: {
              product: productId,
              quantity: quantityId,
            }
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
        }
      }
    } catch (error) {
      console.log(error.data);
    }
  };

  const increaseQuanlity = async (itemId, quantity) => {
    try {
      if (quantity < 10) {
        setIsLoading(true);
        await axios
          .put(
            `${API_URL}/items/${itemId}`,
            {
              data: { quantity: parseInt(quantity) + 1, }
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
              return res.data
            }
          });
          return "done";
      } else {
        alert("Đã đạt tối thiểu số lượng!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const decreaseQuanlity = async (itemId, quantity) => {
    try {
      if (quantity > 1) {
        await axios
          .put(
            `${API_URL}/items/${itemId}`,
            {
              data: { quantity: parseInt(quantity) - 1 }
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
            }
          })
          return "done";
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
