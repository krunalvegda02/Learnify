import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:3000/api/v1/course/";

export const CourseApi = createApi({
  reducerPath: "CourseApi",
  tagTypes: ["Refetch_Creator_Course"],
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
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getPublishCourse: builder.query({
      query: () => ({
        url: "c/publish-courses",
        method: "GET",
      }),
    }),
    getCreatorCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),
    updateCourse: builder.mutation({
      query: ({ formdata, courseId }) => ({
        url: `${courseId}`,
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `${courseId}`,
        method: "GET",
      }),
    }),
    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `${courseId}/publish?publish=${query}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetPublishCourseQuery,
  useGetCreatorCourseQuery,
  useUpdateCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} = CourseApi;
