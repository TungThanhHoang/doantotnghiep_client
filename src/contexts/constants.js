export const API_URL = process.env.NODE_ENV !== "production"
? "http://localhost:1337/api"
: "https://onlineshoppingmarket.herokuapp.com";
export const LOCAL_TOKEN_USER = "_user";
export const LATITUDE = "lat";
export const LONGITUDE = "lng";
export const LOCAL_TOKEN_NEW_PRODUCTS = "_newproduct";
export const LOCAL_TOKEN_CART_ITEM = "_cartItem ";
export const LOCAL_TOKEN_NAV = "_nav ";
export const MARKET = "_marketSelect";
export const DISTANCE = "_distance";
export const FITTEEN_MINUTES = 15 * 60 * 1000 + new Date().getTime();
