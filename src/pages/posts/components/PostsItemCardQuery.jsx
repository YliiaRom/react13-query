import { useDeletePostMutation } from "@/store/postsRTKQuery.js";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

function PostsItemCardQuery({ postData }) {
  const [deletePost, { isLoading }] = useDeletePostMutation();

  const likesRef = useRef(0);
  const dislikesRef = useRef(0);
  const [, setLikes] = useState(0);

  const handlerLikes = () => {
    likesRef.current += 1;
    setLikes((prev) => prev + 1);
  };
  const handlerDisLikes = () => {
    dislikesRef.current += 1;
    setLikes((prev) => prev + 1);
  };
  const handlerDel = async (id) => {
    await deletePost(id);
  };

  return (
    <>
      <div className="postsItemCss">
        <h3>{postData.title}</h3>
        <div>{postData.body}</div>

        <div className="likesBody">
          <div onClick={handlerLikes}>❤️ {likesRef.current}</div>
          <div onClick={handlerDisLikes}>💔{dislikesRef.current}</div>
        </div>
        <p>{postData.authorId}</p>
        <button onClick={() => handlerDel(postData.id)} disabled={isLoading}>
          🗑️ Delete
        </button>
      </div>
    </>
  );
}

export default PostsItemCardQuery;
