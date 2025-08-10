import { useGetPostQuery } from "@/store/postsRTKQuery.js";
import PostsItemCard from "./PostsItemCard";
import PostsItemCardQuery from "./PostsItemCardQuery";
import { useRef, useState } from "react";
import PostFormQuery from "./PostsFormQuery";
import PostsListInfinityQuery from "./PostsListInfinityQuery";

function PostsLisQuery({ postsList }) {
  const inputRef = useRef();
  const [postId, setPostId] = useState(null);
  const {
    data: postInfo,
    error,
    isLoading,
  } = useGetPostQuery(postId, { skip: !postId });

  return (
    <div className="postsLisQueryBox">
      <label>
        знайти інфу по id поста:
        <input
          type="number"
          placeholder="введіть id"
          name="num"
          ref={inputRef}
          // onChange={(e) => setPostId(Number(e.target.value)) || null}
        />
      </label>
      <button
        onClick={() => setPostId(inputRef.current.value)}
        className="pgMainBtn"
      >
        Відобразити Пост
      </button>
      {postId && (
        <>
          {isLoading && <p>Завантаження ...</p>}
          {error && <p> {error.message}</p>}
          {!postInfo && <p> не знайденно з таким id</p>}
          {postInfo && (
            <div>
              <h3>{postInfo.title}</h3>
              <p>{postInfo.body}</p>
            </div>
          )}
        </>
      )}
      <hr />
      <PostFormQuery />
      <PostsListInfinityQuery />
      {postsList && (
        <ul>
          {postsList.map((post) => (
            <li key={post.id}>
              <PostsItemCardQuery postData={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostsLisQuery;
