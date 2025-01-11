import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:3000/api/v1/course/";

export const CourseApi = createApi({
  reducerPath: "CourseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ title, category }) => ({
        url: "",
        method: "POST",
        body: { title, category },
      }),
    }),
  }),
});

export const { useCreateCourseMutation } = CourseApi;
