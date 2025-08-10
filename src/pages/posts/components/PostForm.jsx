function PostForm() {
  console.log(`==========render PostForm`);
  const handlerSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title: e.target.elements.title.value,
      body: e.target.elements.body.value,
      authorId: e.target.elements.authorId.value,
    };
    console.log(newPost);
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
        <label>
          ID Автора:
          <input type="text" placeholder="Yuliia-1" name="authorId" />
        </label>
        <button className="mainBtn" type="submit">
          Додати пост (Slice)
        </button>
        <button className="mainBtn">Додати пост (RTK Query)</button>
      </form>
    </div>
  );
}

export default PostForm;
