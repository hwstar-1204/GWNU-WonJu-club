import React, { useState } from 'react';
import '../free_posts_Style/WritePost.css'; // WritePost 컴포넌트의 CSS 불러오기

const WritePost = ({ postId, onEdit, onDelete }) => {
  const [isNotice, setIsNotice] = useState(false); // 공지 사항 여부 상태
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

    // 이미지 미리보기 로직
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 게시글 작성 완료 (게시물 생성) 로직을 여기에 구현합니다.
    console.log("게시글 작성 완료");

    // 공지 사항 관련 데이터 처리를 위한 추가 로직 (필요한 경우)
  };

  // 글 유형 변경 시 입력 폼 변경
  const handleNoticeChange = (e) => {
    const value = e.target.value === "true";
    setIsNotice(value);
  };

  return (
    <div className="write-post-container">
      <form className="write-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="notice-option">글 유형:</label>
          <select id="notice-option" value={isNotice} onChange={handleNoticeChange}>
            <option value={false}>일반</option>
            <option value={true}>공지 사항</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title">{isNotice ? "공지 사항 제목:" : "제목:"}</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용:</label>
          <textarea id="content" value={content} onChange={handleContentChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="author">작성자:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={handleAuthorChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image" className="image-upload-button">
            사진 업로드
            <input type="file" id="image" onChange={handleImageChange} accept="image/*" />
          </label>
          {imagePreview && <img src={imagePreview} alt="이미지 미리보기" className="image-preview" />}
        </div>
        <button type="submit">{isNotice ? "공지 사항 작성" : "작성 완료"}</button>
        {postId && (
          <div>
            {/* postId가 있을 경우 수정 및 삭제 버튼 표시 */}
            <button onClick={() => onEdit(postId)}>수정</button>
            <button onClick={() => onDelete(postId)}>삭제</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default WritePost;
