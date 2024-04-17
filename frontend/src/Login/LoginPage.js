// LoginPage.js

import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!studentID.trim() || !password.trim()) {
      setErrorMessage('아이디(학번)와 비밀번호를 입력하세요.');
      return;
    }

    if (studentID === '123456' && password === 'password') {
      console.log('로그인 성공');
      
      if (rememberMe) {
        localStorage.setItem('studentID', studentID);
      } else {
        localStorage.removeItem('studentID');
      }
    } else {
      setErrorMessage('아이디(학번)와 비밀번호가 일치하지 않습니다.');
    }
  };

  useState(() => {
    const storedStudentID = localStorage.getItem('studentID');
    if (storedStudentID) {
      setStudentID(storedStudentID);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="login-background">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6}>
            <div className="login-container">
              <h2 className="login-header">로그인</h2>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Control
                  type="text"
                  placeholder="아이디(학번)을 입력하세요"
                  value={studentID}
                  onChange={(e) => setStudentID(e.target.value)}
                  className="input-field"
                />
                <Form.Control
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                />
                <Form.Group as={Row}>
                  <Col xs={6}>
                    <Form.Check
                      type="checkbox"
                      label="아이디(학번) 저장"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  </Col>
                  <Col xs={6} className="text-right">
                    <Link to="/reset-password" className="forgot-password-link">비밀번호를 잊으셨나요?</Link>
                  </Col>
                </Form.Group>
                <div className="login-button-container">
                  <Button variant="primary" type="submit" className="login-button">
                    로그인
                  </Button>
                </div>
                <div className="signup-link-container">
                  <Link to="/signup" className="signup-button">회원가입</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
