import React, { useState } from "react";
import {
  useGetPostsPQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
} from "../../api/postsApi.js";
import { useNavigate } from "react-router-dom";

const PostsList = ({ onSelect }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useGetPostsPQuery({
    page,
    limit: 5,
  });

  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const [dislikePost] = useDislikePostMutation();

  const navigate = useNavigate();

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка завантаження постів</p>;

  const { items, totalPages, remaining } = data;
  // --edit
  const handlerEdit = (id) => {
    navigate(`/posts-my-api/postss/edit/${id}`);
  };
  return (
    <div>
      {/* <div>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="pgMainBtn"
        >
          Попередня
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "activePgBtn" : "pgBtn"}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => (remaining > 0 ? p + 1 : p))}
          disabled={remaining === 0}
          className="pgMainBtn"
        >
          Наступна
        </button>
      </div> */}
      {/* ======================list============== */}
      <ul className="listScroll">
        {items.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <div className="likesBox">
              <button onClick={() => likePost(post.id)}>Likes 👍 :</button>{" "}
              {post.likesNumber}
              <br />
              <button onClick={() => dislikePost(post.id)}>
                Dislikes 👎 :
              </button>
              {post.dislikesNumber}
            </div>

            <div className="btnActionBox">
              <button onClick={() => onSelect(post.id)}>Деталі</button>{" "}
              {/* --edit */}
              <button onClick={() => handlerEdit(post.id)}>
                Редагувати
              </button>{" "}
              <button
                onClick={() => {
                  if (window.confirm("Видалити пост?")) deletePost(post.id);
                }}
              >
                Видалити
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* ======================/list============== */}
      {isFetching && <p>Оновлення...</p>}
      <hr />
      <div>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="pgMainBtn"
        >
          Попередня
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "activePgBtn" : "pgBtn"}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => (remaining > 0 ? p + 1 : p))}
          disabled={remaining === 0}
          className="pgMainBtn"
        >
          Наступна
        </button>
      </div>
    </div>
  );
};

export default PostsList;
