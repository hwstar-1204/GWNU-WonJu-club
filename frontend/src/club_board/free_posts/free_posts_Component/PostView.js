import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostByNo, increaseRecommendCount, deletePost } from './Data';
import '../free_posts_Style/PostView.css';

const PostView = () => {
  const [data, setData] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const { no } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const postData = await getPostByNo(no);
      setData(postData);
    };
    fetchData();
  }, [no]); 

  const goBack = () => {
    navigate(-1);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    const newComment = { id: comments.length + 1, content: comment };
    setComments([...comments, newComment]);
    setComment('');
  };

  const handleRecommend = () => {
    increaseRecommendCount(no);
    const updatedData = { ...data, recommendCount: data.recommendCount + 1 };
    setData(updatedData);
  };

  const deleteComment = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
  };

  const editComment = (id, newContent) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, content: newContent };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDeletePost = () => {
    deletePost(no);
    navigate(-1);
  };

  return (
    <div className="post-view-container">
      {data ? (
        <>
          <div className="post-view-header">
            <h2 className="post-view-title">{data.title}</h2>
            <div className="post-view-info">
              <span className="post-view-author">작성자: {data.author}</span>
              <span className="post-view-date">작성일: {data.createDate}</span>
            </div>
          </div>

          <div className="post-view-content">
            {data.content}
            {data.imageUrl && (
              <img src={data.imageUrl} alt="게시물 이미지" className="post-view-image" />
            )}
          </div>

          <div className="post-view-actions">
            <button className="post-view-recommend-button" onClick={handleRecommend}>
              추천하기 ({data.recommendCount})
            </button>
            <div className="post-view-buttons">
              <button className="post-view-edit-button" onClick={() => navigate(`/edit/${no}`)}>
                수정
              </button>
              <button className="post-view-delete-button" onClick={handleDeletePost}>
                삭제
              </button>
            </div>
          </div>

          <div className="post-view-comments">
            <h3>댓글 ({comments.length})</h3>
            <ul className="post-view-comments-list">
              {comments.map((comment) => (
                <li key={comment.id} className="post-view-comment">
                  {comment.content}
                  <button onClick={() => deleteComment(comment.id)}>삭제</button>
                  <button onClick={() => editComment(comment.id, prompt("댓글 수정", comment.content))}>편집</button>
                </li>
              ))}
            </ul>

            <div className="post-view-add-comment">
              <input
                type="text"
                placeholder="댓글을 입력하세요"
                value={comment}
                onChange={handleCommentChange}
                className="post-view-comment-input"
              />
              <button className="post-view-add-comment-button" onClick={addComment}>
                댓글 추가
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>게시물을 불러오는 중입니다.</p>
      )}

      <button className="post-view-back-button" onClick={goBack}>
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default PostView;
