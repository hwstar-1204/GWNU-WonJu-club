import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo2 from './logo2.PNG';
import './TopScreen.css';

const TopScreen = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  

    return (
        <Navbar bg="white" expand="lg" className="mb-3">
            <Container>
                <Navbar.Brand as={Link} to="/main">
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
                                {/* 로그아웃 버튼 추가 */}
                                <Nav.Link onClick={() => setIsLoggedIn(false)}>로그아웃</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default TopScreen;
