import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ClubBoard = () => {
  const { clubId } = useParams();
  const [posts, setPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12); // 페이지당 게시물 수를 12로 설정

  // 페이지네이션을 위한 상태
  const [pageLimit] = useState(5); // 한 번에 보여줄 페이지 수
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/club_board/${clubId}/posts?page=${currentPage}`);
        setPosts(response.data.posts); // Assuming the response has a 'posts' field
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [clubId, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextbtn = () => {
    setCurrentPage(currentPage + pageLimit);
    if (currentPage + pageLimit > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - pageLimit);
    if ((currentPage - pageLimit) % pageLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageLimit);
    }
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      <h1>동아리 게시판</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <span>{post.id}. </span>
            <strong>{post.title}</strong>
            <span> 조회수: {post.views} </span>
            <span> 작성일: {post.date} </span>
            <span> 작성자: {post.author} </span>
            <span> 추천수: {post.likes}</span>
          </li>
        ))}
      </ul>
      <nav>
        <button onClick={handlePrevbtn} disabled={currentPage === pages[0]}>Prev</button>
        {pages.map((number) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <button key={number} onClick={() => handlePageChange(number)} disabled={currentPage === number}>
                {number}
              </button>
            );
          } else {
            return null;
          }
        })}
        <button onClick={handleNextbtn} disabled={currentPage === pages[pages.length - 1]}>Next</button>
      </nav>
    </div>
  );
};

export default ClubBoard;
