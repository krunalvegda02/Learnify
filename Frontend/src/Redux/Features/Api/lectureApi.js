import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3000/api/v1/lecture/";

export const lectureApi = createApi({
  reducerPath: "lectureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createLecture: builder.mutation({
      query: ({ title, courseId }) => ({
        url: `${courseId}`,
        method: "POST",
        body: { title },
      }),
    }),
    getUserLecture: builder.query({
      query: ( {courseId} ) => ({
        url: `${courseId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateLectureMutation, useGetUserLectureQuery } = lectureApi;
