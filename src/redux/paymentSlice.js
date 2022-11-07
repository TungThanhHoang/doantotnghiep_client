import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { API_URL } from "../contexts/constants";

export const getPaymentMethod = createAsyncThunk("payment/getPaymend", async (thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/payment-methods?populate=*`);
        return response?.data?.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
})

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        loading: false,
        payments: [],
    },
    extraReducers: {
        [getPaymentMethod.pending]: (state, action) => {
            state.loading = true;
        },
        [getPaymentMethod.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.payments = action.payload;
        },
        [getPaymentMethod.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default paymentSlice;