import {
  ADD_TO_CART,
  UPDATE_CART,
  DELETE_CART,
  GET_CART,
} from "../constants/ActionsType";
import { toast } from "react-toastify";
import options from "../constants/toastOptions.js";
import * as api from "../api/index.js";

export const addToCart = (product) => async (dispatch) => {
  try {
    const { data } = api.addToCart(product);
    toast.success("Product added to cart", options);
    dispatch({ type: ADD_TO_CART, payload: data.data });
  } catch (error) {
    console.log(error);
  }
};
export const updateCart = (product) => async (dispatch) => {
  try {
    const { data } = api.updateCart(product);
    dispatch({ type: UPDATE_CART, payload: product });
  } catch (error) {
    console.log(error);
  }
};
export const deleteCart = (id) => async (dispatch) => {
  console.clear();
  console.log(id);
  try {
    const { data } = await api.deleteCart(id);
    dispatch({ type: DELETE_CART, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const getCart = (id) => async (dispatch) => {
  try {
    const { data } = await api.getCart(id);
    console.log(data);
    dispatch({ type: GET_CART, payload: data?.data });
  } catch (error) {
    console.log(error);
  }
};
