
// TopScreen.js

import React, { useState, useEffect, useContext  } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext'; // default로 가져오기
import logo from './logo.png';
import './TopScreen.css';

const   TopScreen = () => {
  // const { isLoggedIn, logout } = useContext(UserContext); // UserContext에서 로그인 상태와 로그아웃 함수를 가져옵니다.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 토큰 값 가져오기
    const token = localStorage.getItem('token');
    // 토큰 값이 있는지 확인하여 isLoggedIn 상태 업데이트
    setIsLoggedIn(!!token);
  }, []);
  const handleLogout = () => {
    // logout(); // 로그아웃 함수 호출
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Navbar bg="white" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/main">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="강원동 로고"
          />
          <span style={{ color: '#ff0000' }}>G</span>
          <span style={{ color: '#ffcc00' }}>W</span>
          <span style={{ color: '#ffa500' }}>N</span>
          <span style={{ color: '#87ceeb' }}>U</span>{' '}
          <span style={{ color: '#ff0000' }}>C</span>
          <span style={{ color: '#ffcc00' }}>L</span>
          <span style={{ color: '#ffa500' }}>U</span>
          <span style={{ color: '#87ceeb' }}>B</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/mypage">마이페이지</Nav.Link>
                <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">로그인</Nav.Link>
                <Nav.Link as={Link} to="/signup">회원가입</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

};

export default TopScreen;
