import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { AuthReducer } from "../reducers/AuthReducer";
import { API_URL, LATITUDE, LOCAL_TOKEN_USER, LONGITUDE } from "./constants";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [authState, dispatch] = useReducer(AuthReducer, {
    isLoading: true,
    isAuth: false,
    isConfirm: false,
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
    // if (tokenUser) {
    // setToken(localStorage[LOCAL_TOKEN_USER]);
    // console.log("token", tokenUser);
    // }
    try {
      await axios
        .get(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        })
        .then((res) => {
          dispatch({
            type: "SET_AUTH",
            payload: { isAuth: true, isConfirm: true, user: res.data },
          });
        });
    } catch (error) {
      localStorage.removeItem(LOCAL_TOKEN_USER);
      // setToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuth: false, isConfirm: false, user: null },
      });
    }
  };
  const loginUser = async (formLogin) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/local`, formLogin);
      if (response.data.user) {
        localStorage.setItem(LOCAL_TOKEN_USER, response.data.jwt);
        localStorage.setItem(LATITUDE, response.data?.user?.lat)
        localStorage.setItem(LONGITUDE, response.data?.user?.lng)
        setLoading(false);
      }
      await loadUser();
      return response.data;
    } catch (error) {
      setLoading(false);
      console.log(error)
      return error.response.data;
    }
  };
  const registerUser = async (formRegister) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/auth/local/register`,
        formRegister
      );
      if (response.data.user) {
        localStorage.setItem(LOCAL_TOKEN_USER, response.data.jwt);
        setLoading(false);

      }
      await loadUser();
      return response.data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };
  const updateUser = async (formUpdate, userId) => {
    setLoading(true);
    const tokenUser = await localStorage[LOCAL_TOKEN_USER];
    try {
      const response = await axios.put(
        `${API_URL}/users/${userId}`,
        formUpdate,
        {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        }
      );
      if (response.data) {
        // console.log(response.data);
        setLoading(false);
        await loadUser();
      }
      return response.data;
    } catch (error) {
      setLoading(false);
      console.log(error);
      return 'error';
    }
  };

  const logoutUser = () => {
    localStorage.clear();
    dispatch({
      type: "SET_AUTH",
      payload: { isAuth: false, isConfirm: false, user: null, ward: null },
    });
  };

  const getLatLngLocation = async (location) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi?address=${location}`, {
        headers: {
          'X-RapidAPI-Key': 'ea13cd457amsh86dc8fb8dd6122dp13fcacjsn6c56b9491b75',
          'X-RapidAPI-Host': 'address-from-to-latitude-longitude.p.rapidapi.com'
        }
      })
      if (response.data.Results.length) {
        setLoading(false);
        // localStorage.setItem(LATITUDE, response.data?.Results[0]?.latitude)
        // localStorage.setItem(LONGITUDE, response.data?.Results[0]?.longitude)
      }
      return response.data;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

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
    getLatLngLocation,
    updateUser,
    authState,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
