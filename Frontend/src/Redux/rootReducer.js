import { authApi } from "./Features/Api/authApi";
import authReducer from "./Features/authSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;
