import { authApi } from "./Features/Api/authApi";
import { CourseApi } from "./Features/Api/CourseApi";
import authReducer from "./Features/authSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [CourseApi.reducerPath]: CourseApi.reducer,
});

export default rootReducer;
