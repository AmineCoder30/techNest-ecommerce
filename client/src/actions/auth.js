import {
  AUTH,
  GET_USER,
  GET_ALL_USERS,
  SET_ERROR,
} from "../constants/ActionsType.js";
import { toast } from "react-toastify";
import options from "../constants/toastOptions.js";
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    if (data.error) {
      dispatch({ type: SET_ERROR, payload: data.error });
      console.log(data.error);
      toast.error(data.message, options);
    } else {
      dispatch({ type: AUTH, data });

      router("/");
    }
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: SET_ERROR, payload: error.response.data.message });
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    // Ensure the response is returned and destructured correctly
    const { data } = await api.signUp(formData);
    if (data.error) {
      dispatch({ type: SET_ERROR, payload: data.error });
      toast.error(data.error, options);
    } else {
      dispatch({ type: AUTH, data });
    }
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: SET_ERROR, payload: error.response.data.message });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  console.log("id after req:", id);
  try {
    const { data } = await api.getUser(id);
    console.log("id before req:", id);
    dispatch({ type: GET_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();
    dispatch({ type: GET_ALL_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(user);
    toast.success("User updated successfully", options);
  } catch (error) {
    console.log(error);
  }
};
