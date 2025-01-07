import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../Redux/Features/authSlice";
import rootReducer from "./rootReducer";
import {authApi} from "./Features/Api/authApi"

export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddlleware) => defaultMiddlleware().concat(authApi.middleware),
});
