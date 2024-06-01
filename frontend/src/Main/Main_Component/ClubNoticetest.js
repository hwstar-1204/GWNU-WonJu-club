import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css 파일 포함
import '../Main_Style/ClubNotice.css';
import { Card, CardBody, CardTitle, CardText, Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
            &lt;
          </button>
        </li>
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

const CommentSection = ({ noticeId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/club_board/notice/${noticeId}/comments/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error(error));
  }, [noticeId]);

  const handleAddComment = () => {
    fetch(`http://localhost:8000/club_board/notice/${noticeId}/comments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ text: newComment }),
    })
      .then((response) => response.json())
      .then((comment) => {
        setComments([...comments, comment]);
        setNewComment('');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="comment-section">
      <h6>댓글</h6>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>{comment.text}</p>
        </div>
      ))}
      <Input
        type="textarea"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="댓글을 입력하세요..."
      />
      <Button onClick={handleAddComment} color="primary">
        댓글 추가
      </Button>
    </div>
  );
};

const ClubNotice = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  const isClubOfficer = localStorage.getItem('isClubOfficer') === 'true'; // 클럽 임원 여부를 localStorage에서 가져옴

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
        setNotices(data.results);
        setTotalPages(Math.ceil(data.count / 10)); // 10개씩 페이지네이션
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setNotices([]);
        setIsLoading(false);
      });
  };

  const fetchTags = () => {
    fetch(`http://localhost:8000/club_board/tags/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTags(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchNotices(currentPage, searchTerm, sortOrder, selectedTag);
    fetchTags();
  }, [currentPage, searchTerm, sortOrder, selectedTag]);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
  const toggleLoginModal = () => setIsLoginModalOpen(prevState => !prevState);
  const toggleWarningModal = () => setIsWarningModalOpen(prevState => !prevState);

  const handleWriteButtonClick = () => {
    if (!isLoggedIn) {
      toggleLoginModal();
    } else if (!isClubOfficer) {
      toggleWarningModal();
    } else {
      // 임원인 경우 공지 작성 페이지로 이동
      window.location.href = '/create-notice';
    }
  };

  return (
    <div>
      <div className='top'>
        <h3>공지사항</h3>
        <div className="search-bar">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sort-buttons">
          <Button onClick={() => setSortOrder('desc')} active={sortOrder === 'desc'}>최신순</Button>
          <Button onClick={() => setSortOrder('asc')} active={sortOrder === 'asc'}>오래된 순</Button>
        </div>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret>
            태그 필터링
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setSelectedTag('')}>전체</DropdownItem>
            {tags.map(tag => (
              <DropdownItem key={tag.id} onClick={() => setSelectedTag(tag.name)}>
                {tag.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <Button color="primary" onClick={handleWriteButtonClick}>글쓰기</Button>
      </div>

      {isLoading ? (
        <div className="d-flex justify-content-center">로딩 중...</div>
      ) : (
        <div className="card-container">
          {notices.map((notice) => (
            <Card key={notice.specific_id} className="notice-card">
              <CardBody>
                <CardTitle tag="h5">
                  <a href={notice.link} target="_blank" rel="noreferrer" data-toggle="tooltip" title={notice.link}>
                    {notice.title.length > 50 ? notice.title.substring(0, 50) + '...' : notice.title}
                  </a>
                </CardTitle>
                <CardText>
                  작성자: {notice.author}
                </CardText>
                <CardText>
                  작성 날짜: {notice.created_date}
                </CardText>
                <CardText>
                  태그: {notice.tags.join(', ')}
                </CardText>
                <CommentSection noticeId={notice.specific_id} />
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* 로그인 팝업 */}
      <Modal isOpen={isLoginModalOpen} toggle={toggleLoginModal}>
        <ModalHeader toggle={toggleLoginModal}>로그인 필요</ModalHeader>
        <ModalBody>임원만 작성할 수 있습니다. 로그인하시겠습니까?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => window.location.href = '/login'}>로그인</Button>{' '}
          <Button color="secondary" onClick={toggleLoginModal}>취소</Button>
        </ModalFooter>
      </Modal>

      {/* 경고 팝업 */}
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
