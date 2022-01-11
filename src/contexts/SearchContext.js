import React, { createContext, useState } from "react";
import axios from "axios";
import { apiUrl } from "./constants";
import slug from "slug";
export const SearchContext = createContext();
const SearchContextProvider = ({ children }) => {
  const [searchItem, setSearchItem] = useState([]);
  const [stringSearch, setStringSearch] = useState("");
  const searchProduct = async () => {
    const getWard = localStorage.getItem("ward");
    const convertWard = slug(getWard ? getWard : "");
    try {
      await axios
        .get(`${apiUrl}/products?wards.slug=${convertWard}&_q=${stringSearch}`)
        .then((res) => setSearchItem(res.data))
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
