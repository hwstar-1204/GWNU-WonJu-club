import React, { useState } from 'react';
import '../free_posts_Style/WritePost.css'; // WritePost 컴포넌트에 대한 CSS 파일 import

const WritePost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // 이미지 프리뷰를 표시
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleSubmit = () => {
    // 이 부분에 게시글을 서버로 보내는 로직을 추가할 수 있습니다.
    console.log("제목:", title);
    console.log("작성자:", author);
    console.log("내용:", content);
    console.log("사진:", image);
    // 작성 완료 후 추가로 필요한 작업을 여기에 추가할 수 있습니다.
  };

  return (
    <div className="write-post-container">
      <h2>게시물 작성</h2>
      <form className="write-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="author">작성자:</label>
          <input type="text" id="author" value={author} onChange={handleAuthorChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용:</label>
          <textarea id="content" value={content} onChange={handleContentChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="image" className="image-upload-button">
            사진 업로드
            <input type="file" id="image" onChange={handleImageChange} accept="image/*" />
          </label>
          {imagePreview && <img src={imagePreview} alt="이미지 프리뷰" className="image-preview" />}
        </div>
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
}

export default WritePost;
