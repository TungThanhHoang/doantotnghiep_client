import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { API_URL, DISTANCE, MARKET } from "../../../contexts/constants";

export const getMarketLocation = createAsyncThunk("navbar/market", async (thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/markets`);
        return response?.data?.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
})

export const getDistance = createAsyncThunk("market/distance", async (data, thunkAPI) => {
    try {
        const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${data}.json?access_token=pk.eyJ1IjoidGhhbmh0dW5nMTc2IiwiYSI6ImNremY3Y3EzZTNmM2Uyb3BoZnNuYjJrOWMifQ.QHgDzZUGqnkSzOWVZOyBtQ`)
        localStorage.setItem(DISTANCE, JSON.stringify({ distance: response?.data?.routes[0]?.distance, duration: response?.data?.routes[0]?.duration }));
        return response?.data?.routes;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
})

const navSlice = createSlice({
    name: "nav",
    initialState: {
        loading: false,
        markets: [],
        markers: [],
        selectMarket: null,
        isMarket: true,
    },
    reducers: {
        onChangeMarket: (state, action) => {
            state.selectMarket = action.payload;
            const findMarket = state.markets.find(item => item.id === Number(action.payload));
            localStorage.setItem(MARKET, JSON.stringify(findMarket));
            if (!localStorage.getItem(MARKET)) {
                state.isMarket = true;
            } else {
                state.isMarket = false;
            }
        }

    },
    extraReducers: {
        [getMarketLocation.pending]: (state, action) => {
            state.loading = true;
        },
        [getMarketLocation.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.markets = action.payload;
        },
        [getMarketLocation.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getDistance.pending]: (state, action) => {
            state.loading = true;
        },
        [getDistance.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.markers = action.payload;
        },
        [getDistance.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default navSlice;