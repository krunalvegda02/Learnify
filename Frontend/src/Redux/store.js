import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../Redux/Features/authSlice";
import rootReducer from "./rootReducer";
import { authApi } from "./Features/Api/authApi";
import { CourseApi } from "./Features/Api/CourseApi";
import { lectureApi } from "./Features/Api/lectureApi";
import { purchaseApi } from "./Features/Api/purchaseApi";
import { courseProgressApi } from "./Features/Api/courseProgressApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddlleware) =>
    defaultMiddlleware().concat(
      authApi.middleware,
      CourseApi.middleware,
      lectureApi.middleware,
      purchaseApi.middleware,
      courseProgressApi.middleware
    ),
});

const initializeApp = async () => {
  await store.dispatch(
    authApi.endpoints.LoadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
