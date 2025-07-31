import { useDispatch, useSelector } from "react-redux";
import PostsList from "./components/PostsList";
import { useEffect } from "react";
import { fetchPosts } from "@/store/postsThunk.js";
import { setCurrentPage } from "@/store/postsSlice.js";
import PaginationBlock from "./components/PaginationBlock";

function HomePostsPage() {
  const {
    postsList,
    currentPageNumber,
    postsNumPerPage,
    totalPageNumber,
    status,
    error,
  } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchPosts({
        pageNumber: currentPageNumber,
        itemsPerPage: postsNumPerPage,
      })
    );
  }, [dispatch, currentPageNumber, postsNumPerPage]);

  const changeNumberPage = (numberPage) => {
    dispatch(setCurrentPage(numberPage));
  };
  return (
    <>
      <hr />
      <PaginationBlock
        currentPageNumber={currentPageNumber}
        totalPageNumber={totalPageNumber}
        changeNumberPage={changeNumberPage}
      />
      <PostsList postsList={postsList} />
      {status === "loading" ? <p>Завантаження ...</p> : null}
      {error === "failed" ? <p>{error}</p> : null}
      <PaginationBlock
        currentPageNumber={currentPageNumber}
        totalPageNumber={totalPageNumber}
        changeNumberPage={changeNumberPage}
      />
    </>
  );
}

export default HomePostsPage;
