// ClubNotice.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Main_Style/ClubNotice.css';
import { Table, Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null; // 한페이지는 페이지번호 안보임
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

const ClubNotice = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  const isClubOfficer = localStorage.getItem('isClubOfficer') === 'true';

  const fetchNotices = (page, search, sort, tag) => {
    setIsLoading(true);
    fetch(`http://localhost:8000/club_board/notice/?page=${page}&search=${search}&ordering=${sort}&tag=${tag}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setNotices(data.results);
          setTotalPages(Math.ceil(data.count / 10)); // 10개씩 페이지네이션
        } else {
          setNotices([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setNotices([]); // 오류 발생 시 notices를 빈 배열로 설정
      });
  };

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const toggleLoginModal = () => setIsLoginModalOpen((prevState) => !prevState);
  const toggleWarningModal = () => setIsWarningModalOpen((prevState) => !prevState);

  const handleWriteButtonClick = () => {
    if (!isLoggedIn) {
      toggleLoginModal();
    } else if (!isClubOfficer) {
      toggleWarningModal();
    } else {
      navigate('/create-notice');
    }
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    fetchNotices(currentPage, searchTerm, order, selectedTag);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setSearchPerformed(true); 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="club-notice-container">
      <h3 className="title">공지</h3>
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
              <DropdownItem onClick={() => setSelectedTag('')}>전체</DropdownItem>
              {tags.map((tag) => (
                <DropdownItem key={tag.id} onClick={() => setSelectedTag(tag.name)}>
                  {tag.name}
                </DropdownItem>
              ))}
              <DropdownItem divider />
              <DropdownItem onClick={() => handleSortOrderChange('desc')}>최신순</DropdownItem>
              <DropdownItem onClick={() => handleSortOrderChange('asc')}>오래된 순</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>


      <table className="table table-striped table-hover table-sm" >
        <thead className="thead-dark">
          <tr>
            <th className='table-secondary'>Link</th>
            {/* <th>작성자</th>
            <th>작성 날짜</th> */}
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.specific_id}>
              <td>
                {/* <a href={notice.link} target="_blank" rel="noreferrer">
                  {notice.title}
                </a> */}
                <a href={notice.link} target="_blank" rel="noreferrer" data-toggle="tooltip" title={notice.link}>
                  {notice.title.length > 50 ? notice.title.substring(0, 50) + '...' : notice.title}
                </a>
              </td>
              {/* <td>{notice.author}</td>
              <td>{notice.created_date}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="d-flex justify-content-center">
        {/* <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav> */}
        
      </div>

      <Modal isOpen={isLoginModalOpen} toggle={toggleLoginModal}>
        <ModalHeader toggle={toggleLoginModal}>로그인 필요</ModalHeader>
        <ModalBody>임원만 작성할 수 있습니다. 로그인하시겠습니까?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => window.location.href = '/login'}>로그인</Button>{' '}
          <Button color="secondary" onClick={toggleLoginModal}>취소</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isWarningModalOpen} toggle={toggleWarningModal}>
        <ModalHeader toggle={toggleWarningModal}>권한 없음</ModalHeader>
        <ModalBody>임원만 작성할 수 있습니다.</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleWarningModal}>확인</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ClubNotice;
