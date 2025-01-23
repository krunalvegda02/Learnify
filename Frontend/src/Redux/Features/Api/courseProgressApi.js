import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PROGRESS_API = "http://localhost:3000/api/v1/progress/";

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PROGRESS_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `${courseId}`,
        methodL: "GET",
      }),
    }),
    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `${courseId}/lecture/${lectureId}/view`,
        method: "POST",
      }),
    }),
    markAsCompleted: builder.mutation({
      query: (courseId) => ({
        url: `${courseId}/complete`,
        method: "POST",
      }),
    }),
    markAsIncompleted: builder.mutation({
      query: (courseId) => ({
        url: `${courseId}/incomplete`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
  useMarkAsCompletedMutation,
  useMarkAsIncompletedMutation,
} = courseProgressApi;
