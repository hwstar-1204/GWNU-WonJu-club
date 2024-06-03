import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../free_posts_Style/PostList.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination-nav">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link custom-page-link" onClick={() => handlePageChange(currentPage - 1)}>
            &lt;
          </button>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button className="page-link custom-page-link" onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link custom-page-link" onClick={() => handlePageChange(currentPage + 1)}>
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

const PostList = () => {
  const [sortBy, setSortBy] = useState("선택");
  const [clubName, setClubName] = useState("FreeBoard");
  const [category, setCategory] = useState("일반");
  const [order, setOrder] = useState("created_date");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      let url = `http://127.0.0.1:8000/club_board/board_posts/${clubName}/${category}/${order}/?page=${currentPage}&search=${searchTerm}&tag=${selectedTag}`; //올바른 URL 넣기
      let options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Token ${token}`
        }
      };
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setPosts(data.results);
        setTotalPages(Math.ceil(data.count / 5));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [clubName, category, order, currentPage, searchTerm, selectedTag]);

  useEffect(() => {
    const fetchTags = async () => {
      let url = `http://127.0.0.1:8000/club_board/tags/`; //올바른 URL 넣기
      let options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Token ${token}`
        }
      };
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setTags(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTags();
  }, []);

  const handleSortByChange = (value) => setSortBy(value);
  const handlePostClick = (postId) => navigate(`postView/${postId}`);
  const handleSearchInputChange = (e) => setSearchInput(e.target.value);
  const handleSearch = () => {
    setSearchTerm(searchInput);
    setSearchPerformed(true);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className='post-list-container' style={{ padding: '80px' }}>
      <h3 className="title">자유게시판</h3>
      <div className="title-underline"></div>
      <div className="top d-flex justify-content-end align-items-center">
        <div className="search-bar d-flex align-items-center">
          <Input
            type="text"
            placeholder="search..."
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          <Button color="secondary" className="search-button" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="sort-dropdown">
            <DropdownToggle caret className="dropdown">
              정렬
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleSortByChange('전체')}>전체</DropdownItem>
              <DropdownItem onClick={() => handleSortByChange('작성순')}>작성순</DropdownItem>
              <DropdownItem onClick={() => handleSortByChange('제목순')}>제목순</DropdownItem>
              <DropdownItem onClick={() => handleSortByChange('조회순')}>조회순</DropdownItem>
              <DropdownItem onClick={() => handleSortByChange('추천순')}>추천순</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center">Loading...</div>
      ) : (
        <Table className="table table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>추천수</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && searchPerformed ? (
              <tr>
                <td colSpan="6" className="text-center">검색 결과가 없습니다.</td>
              </tr>
            ) : (
              posts.length === 0 ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td colSpan="5" className="text-center">게시글이 없습니다.</td>
                  </tr>
                ))
              ) : (
                posts.map(post => (
                  <tr key={post.id} onClick={() => handlePostClick(post.id)}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.author_name}</td>
                    <td>{new Date(post.created_date).toLocaleDateString('ko-KR')}</td>
                    <td>{post.view_cnt}</td>
                    <td>{post.recommended_cnt}</td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </Table>
      )}
      <Button color="primary" onClick={() => navigate("write", { state: { club_name: "FreeBoard" } })} className="btn write-btn">글쓰기</Button>
      <div className="pagination-container">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default PostList;
