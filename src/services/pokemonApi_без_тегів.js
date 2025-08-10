import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Визначаємо сервіс за допомогою базового URL та очікуваних кінцевих точок.
// `createApi`- це ядро функціональності RTK Query.
// `fetchBaseQuery`- це легка обгортка навколо `fetch`, яка спрощує запити.
export const pokemonApi = createApi({
  // `reducerPath` визначає, де цей зріз API буде додано у ваш Redux Store.
  reducerPath: "pokemonApi",
  // `baseQuery`- це функція, яка обробляє фактичні запити.
  // Тут ми використовуємо `fetchBaseQuery` і вказуємо базовий URL для PokeAPI.
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  // `endpoints`- це об'єкт, де ви визначаєте всі свої запити (query) та мутації (mutation).
  endpoints: (build) => ({
    // Визначаємо кінцеву точку `getPokemonByName` для отримання даних про покемона за ім'ям.
    // `build.query` використовується для операцій отримання даних (GET-запити).
    getPokemonByName: build.query({
      // `query`- це функція, яка повертає рядок URL або об'єкт з налаштуваннями запиту.
      // Вона приймає аргумент (тут `name`) і додає його до базового URL.
      query: (name) => `pokemon/${name}`,
    }),

    // Нова кінцева точка для отримання декількох покемонів з пагінацією.
    // Вона приймає об'єкт з параметрами `limit` та `offset`.
    getPokemonsPaginated: build.query({
      // `query` функція конструює URL з параметрами `limit` та `offset`.
      // Якщо параметри не надані, використовуються значення за замовчуванням (наприклад, 20 покемонів).
      query: ({ limit = 20, offset = 0 }) =>
        `pokemon/?limit=${limit}&offset=${offset}`,
    }),
  }),
});

// RTK Query автоматично генерує хуки React на основі визначених кінцевих точок.
// Тут ми експортуємо хук `useGetPokemonByNameQuery` для використання у функціональних компонентах.
// Також експортуємо новий хук `useGetPokemonsPaginatedQuery` для пагінації.
export const { useGetPokemonByNameQuery, useGetPokemonsPaginatedQuery } =
  pokemonApi;
