import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginUser } from "../authSlice";
const USER_API = "http://localhost:3000/api/v1/user/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    //Mutation for posting data  and  Query for fetching data
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
    LoginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(LoginUser({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
