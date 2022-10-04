import axios from "axios";
import React, { createContext, useState, useReducer } from "react";
import { CategoryReducer } from "../reducers/CategoryReducer";
import {
  FILTER_CATEGORY_PRODUCT,
  LOAD_CATEGORIES,
  LOAD_CATEGORY,
} from "../reducers/Type";
import { API_URL } from "./constants";
export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [categoryState, dispatch] = useReducer(CategoryReducer, {
    isLoading: true,
    categories: [],
    category: [],
    productFilter: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingItem, setIsLoadingItem] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const loadCategory = async () => {
    try {
      await axios
        .get(`${API_URL}/categories`)
        .then((res) =>
          dispatch({
            type: LOAD_CATEGORIES,
            payload: res.data,
          })
        )
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const loadOneCategory = async (catId) => {
    try {
      setIsLoading(true);
      await axios
        .get(`${API_URL}/categories/${catId}`)
        .then((res) => {
          setIsLoading(false);
          dispatch({ type: LOAD_CATEGORY, payload: res.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const loadProductFilter = async (id,ward) => {
    setIsLoadingItem(true);
    try {
      await axios
        .get(
          `${API_URL}/products?category._id=${id}&wards.slug=${ward}&Price_gte=${minPrice}&Price_lte=${maxPrice}`
        )
        .then((res) => {
          setIsLoadingItem(false);
          dispatch({
            type: FILTER_CATEGORY_PRODUCT,
            payload: res.data,
          });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const dataContext = {
    categoryState,
    isLoading,
    isLoadingItem,
    setMaxPrice,
    setMinPrice,
    loadCategory,
    loadOneCategory,
    loadProductFilter,
  };

  return (
    <CategoryContext.Provider value={dataContext}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoryContextProvider;
