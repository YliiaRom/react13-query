import { useGetAllPostsQuery } from "@/store/postsRTKQuery";
import PostsLisQuery from "./components/PostsListQuery";

function PostsWithPlaceholder() {
  const { data, error, isLoading } = useGetAllPostsQuery();
  return (
    <>
      <h2>
        Зробити запити на JSONplaceholder для отримання постів.
        <br /> Використати RTK Query
        <br />
        Пагінація(КЕШ)
      </h2>
      {isLoading && <p>Завантаження</p>}
      <PostsLisQuery postsList={data} />
      {error && <p>{error.message}</p>}
    </>
  );
}

export default PostsWithPlaceholder;
