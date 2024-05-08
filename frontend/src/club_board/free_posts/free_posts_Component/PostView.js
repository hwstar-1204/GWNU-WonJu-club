import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostByNo, increaseRecommendCount, postList } from './Data'; // postList 추가
import '../free_posts_Style/PostView.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const PostView = () => {
  const [data, setData] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { no } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const postData = await getPostByNo(no);
      setData(postData);
      // 댓글 데이터를 가져오는 API 호출
      // 댓글 데이터를 서버로부터 가져와야 합니다.
      const commentData = await fetchComments(no);
      setComments(commentData);
    };
    fetchData();
  }, [no]);

  const fetchComments = async (postId) => {
    // 댓글 데이터를 서버로부터 가져오는 API 호출
    // 여기서는 가상의 댓글 데이터를 반환합니다.
    return [
      { id: 1, content: "첫 번째 댓글" },
      { id: 2, content: "두 번째 댓글" },
      { id: 3, content: "세 번째 댓글" },
    ];
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const addComment = () => {
    // 댓글을 추가하는 로직
    // 실제로는 서버로 댓글을 추가하는 API를 호출해야 합니다.
    const newComment = { id: comments.length + 1, content: comment };
    setComments([...comments, newComment]);
    setComment(""); // 댓글 입력란 비우기
  };

  const handleRecommend = () => {
    // 추천하기 기능을 수행하는 함수
    // 실제로는 서버로 추천 데이터를 전송해야 합니다.
    increaseRecommendCount(no);
    // 추천 수를 증가하고 다시 데이터를 가져오도록 설정
    const updatedData = { ...data, recommendCount: data.recommendCount + 1 };
    setData(updatedData);
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">게시글 상세정보</h2>
      <div className="post-view-wrapper">
        {data ? (
          <div className="post-view-content">
            {/* 게시글 정보 표시 */}
            <Row className="post-view-row mb-3">
              <Col md={2} className="fw-bold">게시글 번호:</Col>
              <Col md={10}>{data.no}</Col>
            </Row>
            <Row className="post-view-row mb-3">
              <Col md={2} className="fw-bold">제목:</Col>
              <Col md={10}>{data.title}</Col>
            </Row>
            <Row className="post-view-row mb-3">
              <Col md={2} className="fw-bold">작성자:</Col>
              <Col md={10}>{data.author}</Col>
            </Row>
            <Row className="post-view-row mb-3">
              <Col md={2} className="fw-bold">작성일:</Col>
              <Col md={10}>{data.createDate}</Col>
            </Row>
            <Row className="post-view-row mb-3">
              <Col md={2} className="fw-bold">조회수:</Col>
              <Col md={10}>{data.readCount}</Col>
            </Row>
            <Row className="post-view-row mb-3">
              <Col md={2} className="fw-bold">내용:</Col>
              <Col md={10}>
                {data.content}
                {data.imageUrl && (
                  <img src={data.imageUrl} alt="게시글 이미지" className="post-image mt-3" />
                )}
              </Col>
            </Row>
            {/* 추천하기 버튼 */}
            <Row className="post-view-row mb-3">
              <Col md={2} className="fw-bold">추천하기:</Col>
              <Col md={10}>
                <Button variant="primary" onClick={handleRecommend}>추천</Button>
              </Col>
            </Row>
            {/* 댓글 입력란 */}
            <Row className="post-view-row mb-3">
              <Col md={2} className="fw-bold">댓글:</Col>
              <Col md={7}>
                <Form.Control
                  type="text"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="댓글을 입력하세요"
                />
              </Col>
              <Col md={3}>
                <Button variant="primary" onClick={addComment}>댓글 추가</Button>
              </Col>
            </Row>
            {/* 댓글 목록 */}
            <Row className="post-view-row mb-3">
              <Col md={2} className="fw-bold">댓글 목록:</Col>
              <Col md={10}>
                <ul>
                  {comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                  ))}
                </ul>
              </Col>
            </Row>
            {/* 추천 수 */}
            <Row className="post-view-row mb-3">
              <Col md={2} className="fw-bold">추천수:</Col>
              <Col md={10}>{data.recommendCount}</Col> {/* 추천 수 표시 */}
            </Row>
          </div>
        ) : (
          <div className="text-center">해당 게시글을 찾을 수 없습니다.</div>
        )}
        <div className="text-center mt-4">
          <Button variant="primary" onClick={goBack}>목록으로 돌아가기</Button>
        </div>
      </div>
    </Container>
  );
};

export default PostView;
