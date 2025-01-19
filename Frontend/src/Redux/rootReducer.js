import { authApi } from "./Features/Api/authApi";
import { CourseApi } from "./Features/Api/CourseApi";
import { lectureApi } from "./Features/Api/lectureApi";
import { purchaseApi } from "./Features/Api/purchaseApi";
import authReducer from "./Features/authSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [CourseApi.reducerPath]: CourseApi.reducer,
  [lectureApi.reducerPath]: lectureApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
});

export default rootReducer;
