import * as actionType from "../constants/ActionsType";
import { categories } from "../constants/categoriesList";

const initialState = {
  products: [],
  currentProduct: {},
  productDetails: {},
  categories: [],
  currentCategory: "",
  errors: "",
  fullProducts: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        fullProducts: action.payload,
      };
    case actionType.GET_PRODUCT:
      return { ...state, productDetails: action.payload };
    case actionType.UPLOAD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case actionType.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    case actionType.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case actionType.SET_PRODUCT:
      return { ...state, currentProduct: action.payload };
    case actionType.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case actionType.SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload };
    case actionType.RESET:
      return {
        ...state,
        fullProducts: state.products,
      };

    case actionType.SEARCH:
      const searchQuery = action.payload.toLowerCase();

      const filteredProducts = state.fullProducts.data.filter((product) =>
        product.description.toLowerCase().includes(searchQuery)
      );
      return {
        ...state,
        fullProducts: {
          ...state.fullProducts,
          data: filteredProducts,
        },
      };

    default:
      return state;
  }
};
export default productReducer;
