import { useAddPostMutation } from "@/store/postsRTKQuery.js";
import { useState } from "react";

function PostFormQuery() {
  const [addPost, { isError, isLoading, isSuccess }] = useAddPostMutation();
  const [newpost, setNewPost] = useState();
  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addPost({
        id: new Date().getMilliseconds(),
        title: e.target.elements.title.value,
        body: e.target.elements.body.value,
      }).unwrap();
      (e.target.elements.title.value = ""),
        (e.target.elements.body.value = ""),
        setNewPost(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="sectionWrap">
      <form className="postFormCss" onSubmit={handlerSubmit}>
        <label>
          Заголовок:
          <input type="text" placeholder="title" name="title" />
        </label>
        <label className="big">
          Текст поста:
          <textarea placeholder="ххх..." className="big" name="body" />
        </label>

        <button className="mainBtn">
          {isLoading ? "Додаємо" : "Додати"} пост (RTK Query)
        </button>
      </form>
      {isSuccess && (
        <p>
          пост
          <span style={{ color: isSuccess ? "#f09d03ab" : "white" }}>
            успішно{" "}
          </span>
          доданий
        </p>
      )}
      {isError && <p>Error ...</p>}
      {newpost && (
        <div>
          <h3>
            {newpost.title} -id{newpost.id}
          </h3>
          <p>{newpost.body}</p>
        </div>
      )}
    </div>
  );
}

export default PostFormQuery;
