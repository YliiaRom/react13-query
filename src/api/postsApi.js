import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",

  baseQuery: fetchBaseQuery({ baseUrl: "https://bk-query-posts.onrender.com" }),
  tagTypes: ["Post", "Posts"],
  endpoints: (build) => ({
    // Список постів з пагінацією (build.query)
    getPostsP: build.query({
      query: ({ page = 1, limit = 10 }) =>
        `/posts?_page=${page}&_limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Post", id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),

    // Деталі поста
    getPostById: build.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    // Нескінченне завантаження (build.infiniteQuery)
    getPosts: build.infiniteQuery({
      query: ({ pageParam = 1 }) => `/posts?_page=${pageParam}&_limit=10`,
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) =>
          lastPage.remaining > 0 ? allPages.length + 1 : undefined,
      },
      providesTags: (result) =>
        result
          ? [
              ...result.pages.flatMap((page) =>
                page.items.map(({ id }) => ({ type: "Post", id }))
              ),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),

    // Видалити пост
    deletePost: build.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Posts", id: "LIST" },
        { type: "Post", id },
      ],
    }),

    //--edit Post
    editPost: build.mutation({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: "Put",
        body: data,
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Posts", id: "LIST" },
        { type: "Post", id },
      ],
    }),
    //--add post
    addPost: build.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => [
        { type: "Posts", id: "LIST" },
        result ? { type: "Post", id: result.id } : null,
      ],
    }),
    // Лайк поста
    likePost: build.mutation({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    // Дислайк поста
    dislikePost: build.mutation({
      query: (id) => ({
        url: `/posts/${id}/dislike`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
  }),
});

export const {
  useGetPostsPQuery,
  useGetPostByIdQuery,
  useGetPostsInfiniteQuery,
  useDeletePostMutation,
  useEditPostMutation,
  useAddPostMutation,
  useLikePostMutation,
  useDislikePostMutation,
} = postsApi;
