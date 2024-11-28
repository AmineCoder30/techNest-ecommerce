import * as actionType from "../constants/ActionsType";

const initialState = {
  authData: {},
  users: [],
  errors: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem(
        "user",
        JSON.stringify({ ...action?.data, currentTime: new Date().getTime() })
      );

      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.GET_ALL_USERS:
      return { ...state, users: action.payload };
    case actionType.GET_USER:
      return { ...state, authData: action.payload };
    case actionType.SET_ERROR:
      return { ...state, errors: action.payload };

    default:
      return state;
  }
};

export default authReducer;
