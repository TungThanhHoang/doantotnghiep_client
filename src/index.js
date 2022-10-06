import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./contexts/AuthContext";
import ProductContextProvider from "./contexts/ProductContext";
import CartContextProvider from "./contexts/CartContext";
import CheckOutContextProvider from "./contexts/CheckOutContext";
import CategoryContextProvider from "./contexts/CategoryContext";
import SearchContextProvider from "./contexts/SearchContext";
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <AuthContextProvider>
    <Provider store={store}>
      <CategoryContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <CheckOutContextProvider>
              <SearchContextProvider>
                {/* <React.StrictMode> */}
                <App />
                {/* </React.StrictMode> */}
              </SearchContextProvider>
            </CheckOutContextProvider>
          </CartContextProvider>
        </ProductContextProvider>
      </CategoryContextProvider>
    </Provider>
  </AuthContextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
