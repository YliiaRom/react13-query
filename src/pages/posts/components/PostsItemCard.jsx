import { deletePosts } from "@/store/postsThunk.js";
import { useDispatch } from "react-redux";

function PostsItemCard({ postData }) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="postsItemCss">
        <h3>{postData.title}</h3>
        <div>{postData.body}</div>

        <div className="likesBody">
          <div>❤️ {postData.likesNumber}</div>
          <div>💔 {postData.dislikesNumber}</div>
        </div>
        <p>{postData.authorId}</p>
        <button onClick={() => dispatch(deletePosts(postData.id))}>
          Delete
        </button>
      </div>
    </>
  );
}

export default PostsItemCard;
// {
//   id: "post-1",
//   authorId: "CryptoVision",
//   title: "Майбутнє штучного інтелекту: що нас чекає?",
//   body: "Штучний інтелект стрімко розвивається, змінюючи наш світ. Від самокерованих автомобілів до персональних асистентів, ШІ вже інтегрований у наше повсякденне життя. Але що далі?",
//   likesNumber: 153,
//   dislikesNumber: 28,
//   createdAt: "2025-05-18T10:20:00.000Z",
// },
