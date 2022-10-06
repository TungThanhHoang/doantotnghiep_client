import { configureStore } from "@reduxjs/toolkit";
import navSlice from "../components/layouts/Navbar/navSlice";
const store = configureStore({
    reducer: {
        nav: navSlice.reducer,
    }
})

export default store;