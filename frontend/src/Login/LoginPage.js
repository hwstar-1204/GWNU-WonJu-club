import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, FormGroup } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom'; // Navigate 추가
import './LoginPage.css';

const LoginPage = () => {
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리하기 위한 상태 변수 추가

  // 실제 서비스에서는 사용자가 등록한 정보를 데이터베이스에서 가져오는 로직을 작성해야 합니다.
  const validateUser = (studentID, password) => {
    // 이 함수는 사용자가 등록한 정보와 입력한 정보를 비교하여 일치 여부를 반환합니다.
    // 실제로는 데이터베이스에서 사용자 정보를 조회하여 비교해야 합니다.
    // 여기에서는 간단한 예시를 보여주기 위해 하드코딩합니다.
    const registeredStudentID = '123456'; // 가입한 사용자의 아이디(학번)
    const registeredPassword = 'password'; // 가입한 사용자의 비밀번호

    return studentID === registeredStudentID && password === registeredPassword;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!studentID.trim() || !password.trim()) {
      setErrorMessage('아이디(학번)와 비밀번호를 입력하세요.');
      return;
    }

    if (validateUser(studentID, password)) {
      console.log('로그인 성공');
      setIsLoggedIn(true); // 로그인 상태를 true로 설정
    } else {
      setErrorMessage('아이디(학번)와 비밀번호가 일치하지 않습니다.');
    }
  };

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
                <FormGroup>
                  <Form.Check
                    type="checkbox"
                    label="아이디 저장"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                </FormGroup>
                <Button variant="primary" type="submit" className="login-button">
                  로그인
                </Button>
                <div className="signup-link-container">
                  <Link to="/signup" className="signup-button">회원가입</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      {/* 로그인 상태에 따라 리다이렉션 처리 */}
      {isLoggedIn && <Navigate to="/main-later" />}
    </div>
  );
};

export default LoginPage;
