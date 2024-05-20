// TopScreen.js
import React, { useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions'; // 경로는 실제 구조에 맞게 조정 필요

import logo2 from '../Main/Main_assets/logo2.PNG';
import './TopScreen.css';

const TopScreen = () => { 
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 로그인 상태이고 로그인 페이지나 회원가입 페이지에 있을 경우 메인 페이지로 리다이렉트
    if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/');
    }
  }, [isLoggedIn, location, navigate]);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    await dispatch(logout());
    navigate("/");
    console.log('로그아웃 되었습니다.');
  };

  return (
    <Navbar bg="white" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo2}
            width="180"
            height="80"
            className="d-inline-block align-top"
            alt="강원동 로고"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login">로그인</Nav.Link>
                <Nav.Link as={Link} to="/signup">회원가입</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/mypage">마이페이지</Nav.Link>
                <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopScreen;
