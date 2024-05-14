import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostByNo, increaseRecommendCount, deletePost } from './Data';
import '../free_posts_Style/PostView.css';

const PostView = () => {
  // 게시글 데이터 상태
  const [data, setData] = useState(null);
  // 댓글 입력 상태
  const [comment, setComment] = useState('');
  // 댓글 목록 상태
  const [comments, setComments] = useState([]);
  // URL 파라미터 가져오기
  const { no } = useParams();
  // 페이지 이동 함수
  const navigate = useNavigate();

  // 게시글 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const postData = await getPostByNo(no);
      setData(postData);
    };
    fetchData();
  }, [no]); 

  // 뒤로 가기 함수
  const goBack = () => {
    navigate(-1);
  };

  // 댓글 입력 값 변경 이벤트 핸들러
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // 댓글 추가 함수
  const addComment = () => {
    const newComment = { id: comments.length + 1, content: comment };
    setComments([...comments, newComment]);
    setComment('');
  };

  // 추천하기 함수
  const handleRecommend = () => {
    increaseRecommendCount(no);
    const updatedData = { ...data, recommendCount: data.recommendCount + 1 };
    setData(updatedData);
  };

  // 댓글 삭제 함수
  const deleteComment = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
  };

  // 댓글 수정 함수
  const editComment = (id, newContent) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, content: newContent };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  // 게시글 삭제 함수
  const handleDeletePost = () => {
    deletePost(no);
    navigate(-1);
  };

  return (
    <div className="post-view-container">
      {/* 게시글 데이터가 있을 때 */}
      {data ? (
        <>
          {/* 게시글 헤더 */}
          <div className="post-view-header">
            <h2 className="post-view-title">{data.title}</h2>
            <div className="post-view-info">
              <span className="post-view-author">작성자: {data.author}</span>
              <span className="post-view-date">작성일: {data.createDate}</span>
            </div>
          </div>

          {/* 게시글 내용 및 이미지 */}
          <div className="post-view-content">
            {data.content}
            {data.imageUrl && (
              <img src={data.imageUrl} alt="게시물 이미지" className="post-view-image" />
            )}
          </div>

          {/* 게시글 액션 버튼 */}
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

          {/* 댓글 섹션 */}
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

            {/* 댓글 추가 입력창 */}
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
        // 게시글 데이터가 없을 때
        <p>게시물을 불러오는 중입니다.</p>
      )}

      {/* 뒤로 가기 버튼 */}
      <button className="post-view-back-button" onClick={goBack}>
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default PostView;
