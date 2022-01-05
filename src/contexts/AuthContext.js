import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { AuthReducer } from "../reducers/AuthReducer";
import { apiUrl, LOCAL_TOKEN_USER } from "./constants";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [authState, dispatch] = useReducer(AuthReducer, {
    isLoading: true,
    isAuth: false,
    user: null,
    ward: null,
    bill: null,
  });
  // const setToken = (token) => {
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = ` Bearer ${token} `;
  //   } else {
  //     delete axios.defaults.headers.common["Authorization"];
  //   }
  // };
  const loadUser = async () => {
    const tokenUser = localStorage[LOCAL_TOKEN_USER];
    if (tokenUser) {
      // setToken(localStorage[LOCAL_TOKEN_USER]);
      // console.log("token", tokenUser);
    }
    try {
      await axios
        .get(`${apiUrl}/users/me`, {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        })
        .then((res) => {
          dispatch({
            type: "SET_AUTH",
            payload: { isAuth: true, user: res.data, ward: res.data.ward },
          });
          localStorage.setItem("ward", res.data.ward);
        });
    } catch (error) {
      localStorage.removeItem(LOCAL_TOKEN_USER);
      // setToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuth: false, user: null, ward: null },
      });
    }
  };
  const loginUser = async (formLogin) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/local`, formLogin);
      if (response.data.user) {
        setLoading(false);
        localStorage.setItem(LOCAL_TOKEN_USER, response.data.jwt);
        localStorage.setItem("bill", JSON.stringify(response.data.user.bills));
      }
      await loadUser();
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
  const registerUser = async (formRegister) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/local/register`,
        formRegister
      );
      if (response.data.user) {
        localStorage.setItem(LOCAL_TOKEN_USER, response.data.jwt);
      }
      await loadUser();
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
  const updateUser = async (formUpdate, userId) => {
    const tokenUser = await localStorage[LOCAL_TOKEN_USER];
    try {
      const response = await axios.put(
        `${apiUrl}/users/${userId}`,
        formUpdate,
        {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        }
      );
      if (response.data) {
        // console.log(response.data);
        await loadUser();
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const logoutUser = () => {
    localStorage.clear();
    dispatch({
      type: "SET_AUTH",
      payload: { isAuth: false, user: null, ward: null },
    });
  };

  useEffect(() => {
    loadUser();
    return () => {
      loadUser();
    };
  }, []);

  const authData = {
    loading,
    loginUser,
    registerUser,
    logoutUser,
    updateUser,
    authState,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
