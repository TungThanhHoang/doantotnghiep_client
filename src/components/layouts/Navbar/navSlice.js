import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { API_URL } from "../../../contexts/constants";

export const getMarketLocation = createAsyncThunk("navbar/market", async (thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/markets`);
        return response?.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
})

const navSlice = createSlice({
    name: "nav",
    initialState: {
        loading: false,
        markets: [],
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
        }
    }
})

export default navSlice;