import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  loginReducer,
  registerReducer,
  verifyEmailReducer,
} from "./reducers/authReducers";

const initialStae = {
  user: {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : [],
  },
  loading: false,
};
const reducer = combineReducers({
  loggedInUser: loginReducer,
  registeredUser: registerReducer,
  verifyEmail: verifyEmailReducer,
});
const composeEhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialStae,
  composeEhancer(applyMiddleware(thunk))
);
export default store;
