
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import cartReducer from "../reducers/cartReducer";

const reducers = combineReducers({
  cart: cartReducer
});

const store = createStore(
  reducers,
  JSON.parse(localStorage.getItem("cart")) === null
    ? {}
    : { cart: JSON.parse(localStorage.getItem("cart")) },

  applyMiddleware(thunk)
);

export default store;