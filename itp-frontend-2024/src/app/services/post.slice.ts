import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/",
  }),
  tagTypes: ["Post", "Posts"],
  endpoints: (builder) => ({
    getPostById: builder.query<Post, number>({
      query: (id) => `/post/${id}`,
      providesTags: () => [{ type: "Post" }],
    }),
    getPosts: builder.query<Post[], void>({
      query: () => `/post`,
      providesTags: () => [{ type: "Posts" }],
    }),
    createPost: builder.mutation<Post, Post>({
      query: (post) => ({
        url: `/post`,
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation<Post, Post>({
      query: (post) => ({
        url: `/post`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
  refetchOnFocus: true
});

export const { useGetPostByIdQuery, useLazyGetPostByIdQuery, useGetPostsQuery, useCreatePostMutation, useUpdatePostMutation } = postApi;
