const initialState = {
  products: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.data };
    case "CREATE_PRODUCT":
      return { ...state, products: [...state.products, action.data] };
    default:
      return state;
  }
};

export default rootReducer;
