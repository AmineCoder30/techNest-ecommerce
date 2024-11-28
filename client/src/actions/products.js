// File path: ../actions/productActions.js
import * as actionType from "../constants/ActionsType";
import * as api from "../api/index.js";
import options from "../constants/toastOptions.js";
import { toast } from "react-toastify";
/**
 * Helper function to create a FormData object from product data.
 * @param {Object} product - The product data.
 * @returns {FormData} FormData object containing product data.
 */
const createProductFormData = (product) => {
  const dataForm = new FormData();
  dataForm.append("productName", product.productName);
  dataForm.append("brandName", product.brandName);
  dataForm.append("description", product.description);
  dataForm.append("price", product.price);
  dataForm.append("sellingPrice", product.sellingPrice);
  dataForm.append("category", product.category);

  if (product.userId) dataForm.append("userId", product.userId); // Optional field for update
  if (product._id) dataForm.append("_id", product._id); // Optional field for update

  // Handle productImage
  if (Array.isArray(product.productImage)) {
    product.productImage.forEach((file) =>
      dataForm.append("productImage", file)
    );
  } else if (product.productImage) {
    dataForm.append("productImage", product.productImage);
  }

  return dataForm;
};

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.getProducts();
    dispatch({ type: actionType.GET_ALL_PRODUCTS, payload: data });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const addProduct = (formData) => async (dispatch) => {
  try {
    const dataForm = createProductFormData(formData);
    const { data } = await api.addProduct(dataForm);
    dispatch({ type: actionType.UPLOAD_PRODUCT, payload: data });
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    const { data } = await api.getProduct(id);
    dispatch({ type: actionType.GET_PRODUCT, payload: data });
  } catch (error) {
    console.error("Error fetching single product:", error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.deleteProduct(id);
    dispatch({ type: actionType.DELETE_PRODUCT, payload: id });
    toast.success("Product deleted successfully", options);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

export const updateProduct = (product) => async (dispatch) => {
  try {
    const dataForm = createProductFormData(product);
    const { data } = await api.updateProduct(dataForm);
    dispatch({ type: actionType.UPDATE_PRODUCT, payload: data });
    toast.success("Product updated successfully", options);
  } catch (error) {
    console.error("Error updating product:", error);
  }
};
