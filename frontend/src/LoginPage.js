import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './LoginPage.css'; // CSS 파일 import

const LoginPage = () => {
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 예시로 학번이 '123456'이고 비밀번호가 'password'인 경우에만 로그인 성공
    if (studentID === '123456' && password === 'password') {
      // 로그인 성공시에는 다른 작업 수행
      console.log('로그인 성공');
    } else {
      setErrorMessage('학번 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="login-background">
      <Container>
        <div className="login-container">
          <h2 className="login-header">로그인</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Control
              type="text"
              placeholder="학번을 입력하세요"
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
            <div className="login-button-container">
              <Button variant="primary" type="submit" className="login-button">
                로그인
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
