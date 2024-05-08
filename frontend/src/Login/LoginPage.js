// LoginPage.js

import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col, FormGroup } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedInState] = useState(false); 

  const validateUser = (studentID, password) => {
    const registeredStudentID = "123456";
    const registeredPassword = "password";

    return studentID === registeredStudentID && password === registeredPassword;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!studentID.trim() || !password.trim()) {
      setErrorMessage("아이디(학번)와 비밀번호를 입력하세요.");
      return;
    }

    if (validateUser(studentID, password)) {
      console.log("로그인 성공");
      setIsLoggedInState(true);
      setIsLoggedIn(true);
    } else {
      setErrorMessage("아이디(학번)와 비밀번호가 일치하지 않습니다.");
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
                <FormGroup className="d-flex justify-content-between align-items-center">
                  <div>
                    <Form.Check
                      type="checkbox"
                      label="아이디 저장"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  </div>
                  <div>
                    <Link to="/login/reset-password" className="reset-password-link">비밀번호를 잊으셨나요?</Link>
                  </div>
                </FormGroup>
                <Button
                  variant="primary"
                  type="submit"
                  className="login-button"
                >
                  로그인
                </Button>
                <div className="signup-link-container">
                  <Link to="/signup" className="signup-button">
                    회원가입
                  </Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      {isLoggedIn && <Navigate to="/" />}
    </div>
  );
};

export default LoginPage;
