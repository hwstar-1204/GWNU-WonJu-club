import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 리액트 라우터의 Link 컴포넌트 불러오기
import '../free_posts_Style/PostList.css';

const PostList = () => {
  const [clubName, setClubName] = useState("FreeBoard");  // 자유게시판에서 동아리 이름 넘겨줘야함
  const [category, setCategory] = useState("일반");
  const [order, setOrder] = useState("created_date");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    console.log(page, totalPages);
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortByChange = (value) => {
    setOrder(value);
  };

  const handlePostClick = (postId) => {
    console.log("click_id: ", postId);
    navigate(`/club_board/postView/${postId}`);
  };

  useEffect(() => {
    let url = `http://127.0.0.1:8000/club_board/board_posts/${clubName}/${category}/${order}/?page=${currentPage}`;  
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Token ${token}`
      },
    };
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log(data.results.length);
        setPosts(data.results); 
        setTotalPages(Math.ceil(data.count / 10)); // 10개씩 페이지네이션

      })
      .catch(err => {
        console.log(err)
      });
  }, [clubName, category, order, currentPage]);  //pageSize

  return (
    <div className='post-list-container'>
      <h1 className='post-list-title'>자유 게시판</h1>
      <div className='post-list-head'>
      <div className='post-list-sort'>
        <select className='post-list-sort-select'
          value={order}
          onChange={(e) => handleSortByChange(e.target.value)}>
          <option value="created_date">정렬</option>
          <option value="created_date">최신순</option>
          <option value="most_viewed">조회순</option>
          <option value="most_recommended">추천순</option>
        </select>
      </div>
     
      <div className='search'>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
        />
        <button>검색</button>
      </div>

        <div className='write'>
        <button onClick={() => navigate("write", { state: { club_name: "FreeBoard" } })}>
          글쓰기
        </button>
      </div>
      
      </div>
      <table className="post-table">
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>추천수</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} onClick={() => handlePostClick(post.id)}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.author_name}</td>
              <td>{new Date(post.created_date).toLocaleDateString('ko-KR')}</td>
              <td>{post.view_cnt}</td>
              <td>{post.recommended_cnt}</td>
            </tr>
          ))}
          </tbody>
          </table>

      <div className='pagination'>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
          
          <button
            key={page}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      
     
    </div>
  );
};

export default PostList;
