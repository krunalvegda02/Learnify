import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3000/api/v1/lecture/";

export const lectureApi = createApi({
  reducerPath: "lectureApi",
  tagTypes: ["Refetch_Lectures"],
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
      query: ({ courseId }) => ({
        url: `${courseId}`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lectures"],
    }),
    updateLecture: builder.mutation({
      query: ({ formData, lectureId }) => ({
        url: `${lectureId}`,
        method: "PATCH",
        body: formData,
      }),
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `get/${lectureId}`,
        method: "GET",
      }),
    }),
    deleteLecture: builder.mutation({
      query: (lectureId) => ({
        url: `${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lectures"]
    }),
  }),
});

export const {
  useCreateLectureMutation,
  useGetUserLectureQuery,
  useUpdateLectureMutation,
  useGetLectureByIdQuery,
  useDeleteLectureMutation,
} = lectureApi;
