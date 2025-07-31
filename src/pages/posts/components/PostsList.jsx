// import { useSelector } from "react-redux";
import PostsItemCard from "./PostsItemCard";

function PostsList({ postsList }) {
  // const postsList = useSelector((state) => state.posts.postsList);
  // console.log(postsList);
  return (
    <>
      {postsList.length ? (
        <ul>
          {postsList.map((post) => (
            <li key={post.id}>
              <PostsItemCard postData={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Список порожній</p>
      )}
    </>
  );
}

export default PostsList;
