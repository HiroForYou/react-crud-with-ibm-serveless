const initialState = {
  products: [],
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.data };
    case "CREATE_PRODUCT":
      return { ...state, products: [...state.products, action.data] };
    case "SET_USER_INFO":
      return { ...state, userInfo: action.data };
    case "USER_SIGNOUT":
      return { ...state, userInfo: "" };
    default:
      return state;
  }
};

export default rootReducer;
