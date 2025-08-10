import React from "react";
import { useGetPostByIdQuery } from "@/api/postsApi.js";

const PostDetails = ({ postId }) => {
  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdQuery(postId, {
    skip: !postId,
  });

  if (!postId) return <h2>Оберіть пост, щоб побачити деталі.</h2>;
  if (isLoading) return <p>Завантаження деталей...</p>;
  if (isError) return <p>Помилка завантаження деталей.</p>;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "20px",
      }}
    >
      <h3>{post.title}</h3>
      <p>ID: {post.id}</p>
      <p>Дата публікації: {new Date(post.publicationDate).toLocaleString()}</p>
      <p>likes: {post.likesNumber}</p>
      <p>dislikes: {post.dislikesNumber}</p>
      <p>{post.body || "Без опису"}</p>
    </div>
  );
};

export default PostDetails;
