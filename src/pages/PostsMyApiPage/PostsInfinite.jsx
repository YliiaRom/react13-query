import { Fragment, useEffect } from "react";
import { useGetPostsInfiniteQuery } from "@/api/postsApi";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";

const PostsInfinitePage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isSuccess,
  } = useGetPostsInfiniteQuery();

  const isBottom = useScrollToBottom();

  useEffect(() => {
    if (
      isBottom &&
      hasNextPage &&
      !isLoading &&
      !isFetchingNextPage &&
      isSuccess
    ) {
      fetchNextPage();
    }
  }, [
    isBottom,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isSuccess,
    fetchNextPage,
  ]);

  if (isLoading) return <p>Завантаження...</p>;
  if (!isSuccess) return <p>Помилка завантаження.</p>;

  return (
    <div>
      <h2>Нескінченне завантаження постів</h2>

      {data.pages.map((page, i) => (
        <Fragment key={i}>
          <ul className="infinityPostList">
            {page.items.map((post) => (
              <li key={post.id}>
                <h4>{post.title}</h4>
                <div>
                  <p>❤️ Лайки: {post.likesNumber}</p>{" "}
                  <p>💔 Дислайки: {post.dislikesNumber}</p>
                </div>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
      {isFetchingNextPage && <p>Завантаження наступної сторінки...</p>}
      {!hasNextPage && <p>Більше постів немає.</p>}
    </div>
  );
};

export default PostsInfinitePage;
