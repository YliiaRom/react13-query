import { useEditPostMutation, useGetPostByIdQuery } from "@/api/postsApi.js";
import { useAddPostMutation } from "@/store/postsRTKQuery";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostEditPage = () => {
  // const navigate = useNavigate();
  const [statusPost, setStatusPost] = useState("не зміненно");
  const [titleState, setTitleState] = useState("");

  const [contentState, setContentState] = useState("");
  const [editPost] = useEditPostMutation();
  const [addPost] = useAddPostMutation();
  const { id } = useParams();
  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdQuery(id, {
    skip: !id,
  });
  useEffect(() => {
    if (post) {
      setTitleState(post.title);

      setContentState(post.body);
    }
  }, [post]);

  const handlerTitle = (e) => {
    setTitleState(e.target.value);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    // --edit
    if (post) {
      const newPost = {
        ...post,
        title: titleState,
        publicationDate: Date.now(),
        body: contentState,
      };
      try {
        await editPost({ id, data: newPost }).unwrap();
        setStatusPost("успішно оновленно");
      } catch (error) {
        console.log(error.message);
        setStatusPost("помилка при оновленні");
      }
    } else {
      const newPost = {
        title: titleState,
        body: contentState,
      };

      try {
        const result = await addPost(newPost).unwrap();
        setStatusPost("успішно додан");
        setTitleState("");
        setContentState("");
        console.log(result);
        // navigate(`postss/edit/${result.id}`);
      } catch (error) {
        console.log(error.message);
        setStatusPost("помилка при додаванні");
      }
    }
    // --create
  };

  return (
    <div>
      {post && (
        <div>
          {" "}
          {isLoading && <p>Загрузка значень</p>}
          {isError && <p>Помілка при загрузці</p>}
        </div>
      )}

      <div>
        {post ? (
          <div>
            <h3>{post.title}</h3>
            <p>ID: {post.id}</p>
            <p>
              Дата публікації: {new Date(post.publicationDate).toLocaleString()}
            </p>
            <p>Лайки: {post.likesNumber}</p>
            <p>Дислайки: {post.dislikesNumber}</p>
            <p></p>
            <p>{post.body || "Без опису"}</p>
          </div>
        ) : (
          <p>додавання поста</p>
        )}
        <form className="formQuery" onSubmit={handlerSubmit}>
          <label className="editTitle">
            title
            <textarea
              name="title"
              value={titleState}
              onChange={(e) => handlerTitle(e)}
            />
          </label>
          {/* <label>
            Дата публікації:
            <input
              type="text"
              name="publicationDate"
              value={publicationDateState}
              onChange={(e) => setPublicationDateState(e.target.value)}
            />
          </label> */}

          <label>
            content
            <textarea
              name="content"
              value={contentState}
              onChange={(e) => setContentState(e.target.value)}
            />
          </label>
          <button type="submit" className="mainBtn">
            {post ? "змінити пост" : "create Post"}
          </button>
        </form>
        <p style={{ color: "#999" }}>Статус додавання поста :{statusPost}</p>
      </div>
    </div>
  );
};

export default PostEditPage;
