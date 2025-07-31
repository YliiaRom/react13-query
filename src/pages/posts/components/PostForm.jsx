function PostForm() {
  return (
    <div className="sectionWrap">
      <div className="description postFormCss">
        <label>
          Заголовок:
          <input type="text" placeholder="title" />
        </label>
        <label className="big">
          Текст поста:
          <textarea placeholder="ххх..." className="big" />
        </label>
        <label>
          ID Автора:
          <input type="text" placeholder="Yuliia-1" />
        </label>
      </div>
      <button className="mainBtn">Додати пост</button>
    </div>
  );
}

export default PostForm;
