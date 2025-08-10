import { useState } from "react";
import {
  pokemonApi,
  useGetPokemonByNameQuery,
  useGetPokemonInfoByTypeQuery,
} from "@/services/pokemonApi.js";
import { useSelector } from "react-redux";

function PokemonDetails() {
  const [pokemonNameInput, setPokemonNameInput] = useState("bulbasaur");
  const [pokemonName, setPokemon] = useState("bulbasaur");

  // 1. Отримуємо кешований список покемонів
  const pokemons = useSelector(
    (state) =>
      pokemonApi.endpoints.getPokemonsPaginated.select({
        limit: 20,
        offset: 0,
      })(state)?.data
  );
  // 2. Шукаємо покемона в кеші списку
  const cachedPokemon = pokemons?.fullData?.find((p) => p.name === pokemonName);

  // 3. Виконуємо запит лише якщо покемона немає в кеші
  const {
    data: fetchedPokemon,
    error,
    isLoading,
  } = useGetPokemonByNameQuery(pokemonName, {
    skip: !!cachedPokemon,
  });

  const {
    data: fetchedTypeDate,
    error: errorTypeDate,
    isLoading: isLoadingTypeDate,
  } = useGetPokemonInfoByTypeQuery(2);

  if (!isLoadingTypeDate) {
    console.log(fetchedTypeDate);
  } else if (errorTypeDate) {
    console.log(errorTypeDate);
  }
  // 4. Визначаємо джерело даних: з кешу чи з API
  const data = cachedPokemon ?? fetchedPokemon;

  // 5. Стан завантаження
  if (!cachedPokemon && isLoading) {
    return <div>Завантаження даних про покемона...</div>;
  }

  // 6. Обробка помилки
  if (!cachedPokemon && error) {
    return (
      <div>
        Ой, сталася помилка при завантаженні покемона. Статус: {error.status}
      </div>
    );
  }

  // 7. Рендер
  return (
    <div className="description">
      <div className="pockemonDetail">
        <p>Мій покемон</p>
        {data ? (
          <>
            <h3>Ім'я: {data.species.name.toUpperCase()}</h3>
            <img
              src={data.sprites.front_shiny}
              alt={data.species.name}
              style={{ width: "200px" }}
            />
            <p>Вага: {data.weight}</p>
            <p>Висота: {data.height}</p>
          </>
        ) : (
          <p>Немає даних про покемона.</p>
        )}
      </div>

      <label>
        name pokemon
        <input
          type="text"
          value={pokemonNameInput}
          onChange={(e) => setPokemonNameInput(e.target.value)}
        />
      </label>
      <button onClick={() => setPokemon(pokemonNameInput)} className="mainBtn">
        Find pokemon
      </button>
    </div>
  );
}

export default PokemonDetails;
