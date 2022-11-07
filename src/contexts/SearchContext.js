import React, { createContext, useState } from "react";
import axios from "axios";
import { API_URL } from "./constants";
export const SearchContext = createContext();
const SearchContextProvider = ({ children }) => {
  const [searchItem, setSearchItem] = useState([]);
  const [stringSearch, setStringSearch] = useState("");
  const searchProduct = async (search) => {
    try {
      await axios
        .get(`${API_URL}/products?filters[title][$containsi]=${search}&populate=*`)
        .then((res) => setSearchItem(res.data.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const dataContext = {
    stringSearch,
    searchItem,
    searchProduct,
    setStringSearch,
  };
  return (
    <SearchContext.Provider value={dataContext}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
