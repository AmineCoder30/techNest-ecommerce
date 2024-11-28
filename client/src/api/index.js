import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api" });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("user");
  if (profile) {
    const token = JSON.parse(profile).data.token;
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

//auth api
export const signIn = (formData) => API.post("/signin", formData);
export const signUp = (formData) => API.post("/signup", formData);
export const getUser = (id) => API.get(`/user-details/${id}`);
export const getUsers = () => API.get("/all-user");
export const updateUser = (user) => API.post("/update-user", user);

//product api
export const getProducts = () => API.get("/get-product");
export const addProduct = (formData) => {
  return API.post("/upload-product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getProduct = (id) => API.get(`/product-details/${id}`);
export const deleteProduct = (product) =>
  API.delete(`/delete-product`, product);
export const updateProduct = (product) =>
  API.post(`/update-product`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// cart api
export const getCart = (id) => API.get(`/get-cards/${id}`);
export const addToCart = (product) => API.post("/addtocart", product);
export const deleteCart = (id) => API.post(`/delete-cart`, id);
export const updateCart = (product) => API.post(`/update-cart`, product);

//end{code}
