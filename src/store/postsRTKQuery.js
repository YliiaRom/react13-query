import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  // Унікальний ключ для редуктора Redux (може бути будь-яким рядком)
  reducerPath: "myApiPosts",
  // Базовий запит, який використовується для всіх кінцевих точок
  baseQuery: fetchBaseQuery({
    baseUrl: `https://jsonplaceholder.typicode.com`,
  }),
  // Типи тегів, які будуть використовуватися для кешування та інвалідації
  tagTypes: ["Posts"],
  endpoints: (build) => ({
    getAllPosts: build.query({
      query: () => `posts`,
      transformResponse: (response) => response.slice(0, 20),
      providesTags: ["Posts"],
    }),
    getPost: build.query({
      // 1. Приклад запиту (Query): Отримання одного поста за ID
      query: (id) => `posts/${id}`,
      // Надає тег 'Post' з конкретним ID для кешованих даних.
      providesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
    //2. Приклад нескінченного запиту (Infinite Query): Отримання списку постів з пагінацією
    getPosts: build.infiniteQuery({
      infiniteQueryOptions: {
        // Початкове значення параметра сторінки.
        initialPageParam: 1,
        // Функція для обчислення наступного параметра сторінки.
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          // Припускаємо, що API повертає щось, що дозволяє визначити наступну сторінку.
          // Тут просто збільшуємо номер сторінки.
          if (lastPage && lastPage.length === 0) {
            return undefined; // Немає більше даних
          }
          return lastPageParam + 1;
        },
      },
      query: ({ pageParam = 1 }) => `posts/?_page=${pageParam}&_limit=10`,
    }),
    addPost: build.mutation({
      query: (body) => ({
        url: "posts",
        method: `POST`,
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: build.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});
export const {
  useGetAllPostsQuery,
  useGetPostQuery,
  useGetPostsInfiniteQuery,
  useAddPostMutation,
  useDeletePostMutation,
} = api;
// {
//   "userId": 1,
//   "id": 1,
//   "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//   "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
// },
