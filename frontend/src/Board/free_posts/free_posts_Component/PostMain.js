import React, { useState, useEffect } from 'react';
import PostList from './PostList.js';
import { Link } from 'react-router-dom'; 
import { postList } from './Data.js'; // 데이터 가져오기

const PostMain = () => {
  const [sortBy, setSortBy] = useState("선택");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSearchTerm, setFilteredSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(postList); // 데이터 설정
  }, []);

  const handleSortByChange = (value) => {
    setSortBy(value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    setFilteredSearchTerm(searchTerm);
  };

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <div style={{ textAlign: "right", marginRight: "200px" }}>
          <select
            value={sortBy}
            onChange={(e) => handleSortByChange(e.target.value)}
            style={{ width: "180px" }}
          >
            <option value="선택">선택</option>
            <option value="전체">전체</option>
            <option value="작성순">작성순</option>
            <option value="제목순">제목순</option>
            <option value="조회순">조회순</option>
            <option value="추천순">추천순</option>
          </select>
          <div style={{ marginTop: "20px" }}>
          </div>
        </div>
        <PostList posts={posts} sortBy={sortBy} searchTerm={filteredSearchTerm} />
        <div style={{ marginTop: "30px", textAlign: "right", marginRight: "200px" }}>
          <Link to="/write">
            <button style={{ width: "60px" }}>
              글쓰기
            </button>
          </Link>
          <div style={{ marginBottom: "10px" }}> {/* 검색 버튼 위 여백 */}
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="검색어를 입력하세요"
            style={{ width: "180px", marginRight: "10px" }}
          />
          <button style={{ width: "60px" }} onClick={handleSearch}>검색</button>
        </div>
      </div>
    </>
  );
}

export default PostMain;
