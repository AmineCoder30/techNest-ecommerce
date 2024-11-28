import {
  ADD_TO_CART,
  GET_CART,
  DELETE_CART,
  UPDATE_CART,
} from "../constants/ActionsType";

const initialState = {
  allCarts: [],
  currentCart: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, allCarts: [...state.allCarts, action.payload] };
    case GET_CART:
      return { ...state, allCarts: action.payload };
    case DELETE_CART:
      return {
        ...state,
        allCarts: state.allCarts.filter(
          (item) => item._id !== action.payload.id
        ),
      };

    case UPDATE_CART:
      return {
        ...state,
        allCarts: state.allCarts.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
