import { combineReducers } from "redux";
import authReducer from "./auth";
import productReducer from "./products";
import cartReducer from "./cart";
export const reducers = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
});
