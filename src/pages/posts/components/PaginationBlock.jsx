function PaginationBlock({
  currentPageNumber,
  totalPageNumber,
  changeNumberPage,
}) {
  return (
    <div className="pgWrap">
      {totalPageNumber > 1 ? (
        <button
          disabled={currentPageNumber === 1}
          className="pgMainBtn"
          onClick={() => changeNumberPage(currentPageNumber - 1)}
        >
          Попередня
        </button>
      ) : null}

      {Array.from({ length: totalPageNumber }).map((_, index) => (
        <button
          key={index}
          onClick={() => changeNumberPage(index + 1)}
          className={currentPageNumber === index + 1 ? "activePgBtn" : "pgBtn"}
        >
          {index + 1}
        </button>
      ))}
      {totalPageNumber > 1 ? (
        <button
          disabled={currentPageNumber === totalPageNumber}
          className="pgMainBtn"
          onClick={() => changeNumberPage(currentPageNumber + 1)}
        >
          Наступна
        </button>
      ) : null}
    </div>
  );
}

export default PaginationBlock;
