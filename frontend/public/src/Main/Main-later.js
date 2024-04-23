import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MainPage.css';
import CategoryPage from './CategoryPage';
import BannerCarousel from './BannerCarousel';
import EventCard from './EventCard';
import ClubNotice from './ClubNotice';
import logo from './logo.png';
import chatbotImage from './chatbot.png'; // AI 챗봇 이미지 추가

function MainLater() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태로 변경

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="MainPage">
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
                  <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
                  <Nav.Link as={Link} to="/mypage">마이페이지</Nav.Link>
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

      <CategoryPage />

      <BannerCarousel />

      <div className="content-wrapper">
        <div className="event-card-container">
          <EventCard />
        </div>
        <div className="club-notice-container">
          <ClubNotice />
        </div>
      </div>
      
      {/* AI 챗봇 이미지 추가 */}
      <img src={chatbotImage} alt="AI 챗봇" className="chatbot-image" />
    </div>
  );
}

export default MainLater;