import { configureStore } from "@reduxjs/toolkit";
import navSlice from "../components/layouts/Navbar/navSlice";
import paymentSlice from "./paymentSlice";
const store = configureStore({
    reducer: {
        nav: navSlice.reducer,
        payment: paymentSlice.reducer
    }
})

export default store;