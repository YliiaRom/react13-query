import { useGetPostsInfiniteQuery } from "@/store/postsRTKQuery.js";
import { useState } from "react";

function PostsListInfinityQuery() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
    useGetPostsInfiniteQuery();

  //сторінки
  const allPages = data?.pages ?? [];
  //--пости на сторінці з індексом === currentPageIndex
  const currentPagePost = allPages[currentPageIndex] ?? [];

  //кільк сторінок
  const totalPages = allPages?.length ?? 0;

  //--BTN поперерня сторінка
  const handlerPreviousPage = async () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };
  //--BTN наступна сторінка
  const handlerNextPage = async () => {
    if (currentPageIndex + 1 === totalPages && hasNextPage) {
      await fetchNextPage();
    }
    setCurrentPageIndex((prev) => prev + 1);
  };
  //--BTN змінити index відображення сторінки
  const handlerCurrentPage = (index) => {
    setCurrentPageIndex(index);
  };

  if (isLoading) return <p>Завантаження</p>;
  if (isError) return <p>Error....Помилка завантаження постів</p>;
  return (
    <>
      <h2>зробити Infinite Pagination (відобрвження з КЕШУ) </h2>

      {/* ----------кнопки сторінок */}
      <div className="pgBtnQuery">
        {[...Array(totalPages)].map((_, index) => (
          <div
            key={index}
            onClick={() => handlerCurrentPage(index)}
            className="pgBtn"
          >
            {index + 1}
          </div>
        ))}
      </div>
      <h4>Posts - сторінка({currentPageIndex + 1})</h4>
      {/* ================== <--  BTN --> */}
      <div>
        <button
          className="pgMainBtn"
          onClick={handlerPreviousPage}
          disabled={currentPageIndex < 1}
        >
          ← Попередня
        </button>

        <button
          className="pgMainBtn"
          onClick={handlerNextPage}
          disabled={currentPageIndex === isFetching}
        >
          → Наступна
        </button>
        {/* ================== <--  BTN --> */}
      </div>

      {currentPagePost.length > 0 ? (
        <ul className="postsInfinite">
          {currentPagePost.map((el) => {
            return (
              <li key={el.id}>
                <h3>{el.title}</h3>
                <p>{el.body}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p> немає постів для відображення</p>
      )}
    </>
  );
}

export default PostsListInfinityQuery;
