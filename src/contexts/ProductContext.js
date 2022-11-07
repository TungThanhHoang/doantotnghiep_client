import axios from "axios";
import React, { createContext, useState, useReducer } from "react";
import { ProductReducer } from "../reducers/ProductReducer";
import {
  LOAD_NEW_PRODUCTS,
  LOAD_ONE_PRODUCT,
  LOAD_PRODUCTS,
  LOAD_PRODUCT_FRUIT,
  LOAD_PRODUCT_SEAFOOD,
} from "../reducers/Type";
import { API_URL } from "./constants";
export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(ProductReducer, {
    isLoading: true,
    products: [],
    newProducts: [],
    product: [],
    productFruits: [],
    productSeaFoods: []
  });
  const [isloading, setLoading] = useState(false);

  const loadProduct = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/products?sort[0]=updatedAt%3Adesc&populate=*`
      );
      if (response.data) {
        dispatch({ type: LOAD_PRODUCTS, payload: response.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProductByFruitCategory = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/products?filters[category][slug][$eq]=trai-cay&sort[0]=updatedAt%3Adesc&populate=*`
      );
      if (response.data) {
        dispatch({ type: LOAD_PRODUCT_FRUIT, payload: response.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getProductBySeaFoodCategory = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/products?filters[category][slug][$eq]=hai-san&sort[0]=updatedAt%3Adesc&populate=*`
      );
      if (response.data) {
        dispatch({ type: LOAD_PRODUCT_SEAFOOD, payload: response.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const loadNewProduct = async () => {
    try {
      await axios
        .get(
          `${API_URL}/products?filters[promotion][$ne]=null&sort[0]=updatedAt%3Adesc&populate=*`
        )
        .then((res) => {
          dispatch({ type: LOAD_NEW_PRODUCTS, payload: res.data.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const loadOneProduct = async (productId) => {
    setLoading(true);
    try {
      await axios
        .get(`${API_URL}/products/${productId}?populate=*`)
        .then((res) => {
          setLoading(false);
          dispatch({ type: LOAD_ONE_PRODUCT, payload: [res.data.data] });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const formatPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const dataContext = {
    productState,
    formatPrice,
    isloading,
    loadProduct,
    loadNewProduct,
    loadOneProduct,
    getProductByFruitCategory,
    getProductBySeaFoodCategory

  };

  return (
    <ProductContext.Provider value={dataContext}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
