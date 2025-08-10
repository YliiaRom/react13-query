import React, { useState } from "react";
import { useGetPokemonsPaginatedQuery } from "@/services/pokemonApi.js";

function PokemonPaginationList() {
  const [currentPage, setCurrentPage] = useState(0); // Поточна сторінка, починаючи з 0
  const pokemonsPerPage = 20; // Кількість покемонів на одній сторінці

  // Обчислюємо зміщення (offset) на основі поточної сторінки та кількості елементів на сторінці
  const offset = currentPage * pokemonsPerPage;

  // Використовуємо хук запиту для отримання пагінованих даних
  // `data` містить список покемонів, `error` - інформацію про помилку,
  // `isLoading` - true під час першого завантаження, `isFetching` - true під час будь-якого завантаження (включаючи оновлення)
  const { data, error, isLoading, isFetching } = useGetPokemonsPaginatedQuery({
    limit: pokemonsPerPage,
    offset: offset,
  });
  //   Знаходимо загальну кількість сторінок
  const totalPagesNumber =
    (data && data.count && Math.ceil(data.count / pokemonsPerPage)) || null;

  // Обробник для переходу на наступну сторінку
  const handleNextPage = () => {
    // Перевіряємо, чи є ще сторінки для завантаження
    // `data.count` - це загальна кількість покемонів, доступних в API
    if (data && offset + pokemonsPerPage < data.count) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Обробник для переходу на попередню сторінку
  const handlePreviousPage = () => {
    // Перевіряємо, щоб не перейти на сторінку з від'ємним номером
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Відображаємо UI залежно від стану завантаження
  if (isLoading) {
    return <div>Завантаження списку покемонів...</div>;
  }

  // Відображаємо UI, якщо сталася помилка
  if (error) {
    return (
      <div>
        Ой, сталася помилка при завантаженні покемонів. Статус:{" "}
        {error.status || "Невідомий"}
      </div>
    );
  }

  // Відображаємо дані, якщо вони успішно завантажені
  return (
    <div>
      <h2>Список покемонів (Пагінація)</h2>
      {data && data.results && data.results.length > 0 ? (
        <ul style={{ listStyleType: "none" }} className="pockemonList">
          {data.results.map((pokemon) => (
            <li key={pokemon.name}>
              {pokemon.name}
              {/* Для отримання детальної інформації про кожного покемона потрібно було б зробити окремий запит до pokemon.url */}
              {/* <a href={pokemon.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px', fontSize: '0.8em', color: '#007bff' }}>(Деталі)</a> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Немає даних про покемонів.</p>
      )}
      {/* // `isFetching` показує, чи відбувається запит (навіть якщо дані вже є в кеші) */}
      {isFetching && <p>Оновлення списку...</p>}
      <div className="pgWrap">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0 || isFetching} // Вимикаємо кнопку, якщо це перша сторінка або йде завантаження
          className="pgMainBtn"
        >
          Попередня
        </button>
        <span>
          Сторінка {currentPage + 1}
          {/* Обчислюємо загальну кількість сторінок, якщо дані доступні */}
          {totalPagesNumber && ` з ${totalPagesNumber}`}
        </span>
        <button
          onClick={handleNextPage}
          className="pgMainBtn"
          // Вимикаємо кнопку, якщо досягнуто останньої сторінки або йде завантаження
          disabled={
            (data && offset + pokemonsPerPage >= data.count) || isFetching
          }
        >
          Наступна
        </button>
      </div>
    </div>
  );
}

export default PokemonPaginationList;
