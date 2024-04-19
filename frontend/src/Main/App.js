import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import LoginPage from '../Login/LoginPage';
import PrivacyPolicyPage from '../Signup/PrivacyPolicyPage';
import SignupDetailPage from '../Signup/SignupDetailPage';
import ResetPasswordPage from '../Login/ResetPasswordPage';
import CategoryPage from './CategoryPage';
import BannerCarousel from './BannerCarousel';
import EventCard from './EventCard';
import ClubNotice from './ClubNotice';
import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<PrivacyPolicyPage />} />
        <Route path="/signup/details" element={<SignupDetailPage />} />
        <Route path="/login/reset-password" element={<ResetPasswordPage />} />
      </Routes>

      <Navbar bg="white" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand as={Link} to="/">
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
              <Nav.Link as={Link} to="/login">로그인</Nav.Link>
              <Nav.Link as={Link} to="/signup">회원가입</Nav.Link>
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
    </div>
  );
}

export default App;
