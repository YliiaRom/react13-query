import { useState } from "react";
import PostsList from "./PostsList";
import PostDetails from "./PostDetails";
import { Link } from "react-router-dom";
import { Outlet } from "react-router";

const PostsPage = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);

  return (
    <div>
      <Link to="/posts-my-api/postss/edit/:id?">
        <button>➕ Додати новий пост</button>
      </Link>
      {/* <h2>Сторінка постів</h2> */}
      <PostDetails postId={selectedPostId} />
      <PostsList onSelect={setSelectedPostId} />
      <Link to="/posts-my-api/postss/edit/:id?">
        <button>➕ Додати новий пост</button>
      </Link>
      <Outlet />
    </div>
  );
};

export default PostsPage;
