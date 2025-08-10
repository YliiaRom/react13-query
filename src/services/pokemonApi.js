import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  tagTypes: ["Pokemon"], // 🔧 Додаємо тип тегів
  endpoints: (build) => ({
    // 🔁 1. Отримання покемона за іменем
    getPokemonByName: build.query({
      query: (name) => `pokemon/${name}`,

      // Додаємо тег для кожного імені
      providesTags: (result, error, name) =>
        result ? [{ type: "Pokemon", id: name }] : [],
    }),
    getPokemonInfoByType: build.query({
      query: (type) => `type/${type}`,
    }),

    // 🔁 2. Отримання всіх покемонів з повною інформацією
    getPokemonsPaginated: build.query({
      query: ({ limit = 20, offset = 0 }) =>
        `pokemon/?limit=${limit}&offset=${offset}`,

      // Завантаження повної інформації про кожного покемона
      async transformResponse(response) {
        const fullData = await Promise.all(
          response.results.map((p) => fetch(p.url).then((res) => res.json()))
        );

        return {
          ...response,
          fullData,
        };
      },

      // Присвоюємо теги кожному покемону для кешу
      providesTags: (result) => {
        return result
          ? result.fullData.map((p) => ({ type: "Pokemon", id: p.name }))
          : [];
      },
    }),
  }),
});

// 🔁 Експортуємо хуки
export const {
  useGetPokemonByNameQuery,
  useGetPokemonsPaginatedQuery,
  useGetPokemonInfoByTypeQuery,
} = pokemonApi;
